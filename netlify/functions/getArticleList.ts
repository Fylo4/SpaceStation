import { Handler, HandlerEvent } from "@netlify/functions"
import { Client } from "pg";


const handler: Handler = async(event: HandlerEvent, context: unknown) => {

    const client = new Client(process.env["DB_STRING"]);
    await client.connect();

    try {
        const results = await client.query(
          `SELECT
            id,
            slug,
            title,
            tags,
            created,
            edited,
            epistemicstatus,
            completionstatus
          FROM Article
          WHERE hidden != B'1'
          ORDER BY edited DESC`
        );
    
        var ret = {Articles: results.rows};

        return {
            statusCode: 200,
            body: JSON.stringify(ret)
        };
      } catch (err) {
        console.log(err)
        return {
            statusCode: 400,
            body: `An error occurred while getting articles: ${JSON.stringify(err)}`
        };
      } finally {
        client.end();
      }


}

export { handler }