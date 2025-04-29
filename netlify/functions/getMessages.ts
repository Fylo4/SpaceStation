import { Handler, HandlerEvent } from "@netlify/functions"
import { Client } from "pg";


const handler: Handler = async(event: HandlerEvent, context: unknown) => {

    const client = new Client(process.env["DB_STRING"]);
    await client.connect();

    const category = event.queryStringParameters?.["Category"];

    try {
        const results = await client.query(
          `SELECT * FROM Comment WHERE Category = $1 ORDER BY CreatedTime DESC LIMIT (1000)`, [category]
        );
    
        var ret = {
            Messages: results.rows
        };
        return {
            statusCode: 200,
            body: JSON.stringify(ret)
        };
      } catch (err) {
        return {
            statusCode: 400,
            body: "An error occurred while getting messages: "+JSON.stringify(err)
        };
      } finally {
        client.end();
      }


}

export { handler }