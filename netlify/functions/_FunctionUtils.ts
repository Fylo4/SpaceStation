import { HandlerEvent } from "@netlify/functions"

import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { DBUser } from "./_DBTypes";
import { Client } from "pg";

// Set up JWKS client
const client = jwksClient({
    jwksUri: "https://dev-crbw8cd1x7ah3xbx.us.auth0.com/.well-known/jwks.json",
});
  
// Get signing key
export function getKey(header: any, callback: any) {
client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
});
}

export function getAuthToken(event: HandlerEvent): string | null {
const header = event.headers['authorization'];
if (header == null) return null;
if (!header.startsWith('Bearer ')) return null;
return header.split(" ")[1]; // Everything after 'Bearer '
}

export const Errors = {
    MissingAuthorization: {
        statusCode: 401,
        body: "You must be logged in to access this (Login missing or invalid).",
    },
    ActionRequiresPermissions: {
        statusCode: 401,
        body: "You are not allowed to perform this action.",
    },
}

export async function GetUserUID(inputToken?: HandlerEvent | string | null | undefined): Promise<string | null> {
    if (inputToken == null) return null;
    const token: (string | null) = (typeof inputToken == 'string') ? inputToken : getAuthToken(inputToken);
    if (token == null) return null;

    return new Promise((resolve) => {
        jwt.verify(
        token,
        getKey,
        {
            audience: "https://dev-crbw8cd1x7ah3xbx.us.auth0.com/api/v2/",
            issuer: "https://dev-crbw8cd1x7ah3xbx.us.auth0.com/",
            algorithms: ["RS256"],
        },
        (err, decoded) => {
            if (err) {
                resolve(null);
            } else {
                if (decoded == null) resolve(null);
                // It should always be a JwtPayload and not a string since I'm using Auth0
                // I'm keeping the string return as a backup just in case though, you never know
                if (typeof decoded == 'string') resolve(decoded);
                resolve((decoded as jwt.JwtPayload).sub ?? null);
            }
        }
        );
    });
}

export async function getRolesOrAddUser(uid: string, client: Client): Promise<string[]> {
    const results = await client.query(`SELECT * FROM Users WHERE UserId = $1 LIMIT (1)`, [uid]);
    const user = results.rows[0] as (DBUser | null);

    // User exists in the table
    if (user != null) return (user.roles??'').split(',');

    // User not yet in table - Add it
    await client.query("INSERT INTO Users (userid, roles) VALUES ($1, '')", [uid]);
    return [];
}

export async function initializeFunctionVariables(event: HandlerEvent) {
    const userId = await GetUserUID(event);
  
    const client = new Client(process.env["DB_STRING"]);
    await client.connect();

    let roles: string[] = [];
    if (userId != null) {
        roles = await getRolesOrAddUser(userId, client);
    }

    return {userId, roles, client};
}