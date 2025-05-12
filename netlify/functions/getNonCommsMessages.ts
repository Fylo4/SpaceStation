import { Handler, HandlerEvent } from "@netlify/functions"
import { Client } from "pg";


const handler: Handler = async(event: HandlerEvent, context: unknown) => {

    const client = new Client(process.env["DB_STRING"]);
    await client.connect();

    const category = event.queryStringParameters?.["Category"];

      const query = `SELECT * FROM Comment WHERE Category != 'Main' ORDER BY CreatedTime DESC LIMIT (1000)`;

    // TRY
    try {
      const results = await client.query(query);
  
      var ret = {
          Messages: results.rows
      };
      return {
          statusCode: 200,
          body: JSON.stringify(ret)
      };
    }
    // CATCH
    catch (err) {
      return {
          statusCode: 400,
          body: "An error occurred while getting messages: "+JSON.stringify(err)
      };
    } 
    // FINALLY
    finally {
      client.end();
    }
}

export { handler }