import { Handler, HandlerEvent } from "@netlify/functions"
import { Client } from "pg";


const handler: Handler = async(event: HandlerEvent, context: unknown) => {

    const client = new Client(process.env["DB_STRING"]);
    await client.connect();

    const body = JSON.parse(event.body ?? '{}') as Record<string, string>;
    const username = limitSize(body['Username'], 100);
    const website = limitSize(body['Website'], 100);
    const message = limitSize(body['Message'], 1000);
    const category = limitSize(body['Category'], 100);
    
    if (!message.trim().length) {
      return {
          statusCode: 400,
          body: "The message cannot be empty"
      };
    }
    if (!username.trim().length) {
      return {
          statusCode: 400,
          body: "The message cannot be empty"
      };
    }

    try {
        const results = await client.query(`
          INSERT INTO Comment (username, website, message, category, createdtime)
          VALUES ($1, $2, $3, $4, $5)
        `, [username, website, message, category, new Date()]);
    
        return {
            statusCode: 200,
            body: JSON.stringify("Comment added successfully")
        };
      } catch (err) {
        return {
            statusCode: 400,
            body: "An error occurred while getting messages"
        };
      } finally {
        client.end();
      }
}

const limitSize = (input: string, maxLength: number) => {
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength);
}

export { handler }