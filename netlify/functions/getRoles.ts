import { HandlerEvent } from "@netlify/functions"
import { Errors, getRolesOrAddUser, GetUserUID } from "./_FunctionUtils";
import { Client } from "pg";


exports.handler = async (event: HandlerEvent, context: unknown) => {

  let userId, client, roles;
  try {
    userId = await GetUserUID(event);
  
    client = new Client(process.env["DB_STRING"]);
    await client.connect();
  
    if (userId != null) {
      roles = await getRolesOrAddUser(userId, client);
    }
  } catch (err) {
    return {
        statusCode: 400,
        body: "An unknown error occurred while posting articles"
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(roles ?? [])
  }
};
