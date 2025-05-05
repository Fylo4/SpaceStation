import { Handler, HandlerEvent } from "@netlify/functions"
import { Client } from "pg";


const handler: Handler = async(event: HandlerEvent, context: unknown) => {

    const client = new Client(process.env["DB_STRING"]);
    await client.connect();

    const slug = event.queryStringParameters?.["Slug"];

    try {
        const results = await client.query(
          `SELECT * FROM Article WHERE Slug = $1 LIMIT (1)`, [slug]
        );
    
        var ret = results.rows[0];
        if (ret == null) {
            return {
                statusCode: 400,
                body: `Article with slug '${slug}' not found`
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(ret)
        };
      } catch (err) {
        return {
            statusCode: 400,
            body: `An error occurred while getting article ${slug}: ${JSON.stringify(err)}`
        };
      } finally {
        client.end();
      }


}

export { handler }