import { Handler, HandlerEvent } from "@netlify/functions"
import { Client } from "pg";

const handler: Handler = async(event: HandlerEvent, context: unknown) => {

  return {
    statusCode: 400,
    body: "You do not have access to update articles"
  };

    const client = new Client(process.env["DB_STRING"]);
    await client.connect();

    const body = JSON.parse(event.body ?? '{}') as Record<string, string>;
    const id = body['id'];
    const slug = limitSize(body['slug'], 100);
    const title = limitSize(body['title'], 100);
    const content = body['articlecontent'];
    const tags = limitSize(body['tags'], 200);
    // const created = new Date(); // Don't modify 'created'
    const edited = new Date();
    const epistemicStatus = limitSize(body['epistemicstatus'], 200);
    const completionStatus = limitSize(body['completionstatus'], 100);
    const hidden = getBit(body['hidden']) ? 1 : 0;

    console.log(body)
    
    // if (Number.isNaN(id) || id < 0) {
    //   return {
    //       statusCode: 400,
    //       body: "ID is not a valid value"
    //   };
    // }
    if (!slug.trim().length) {
      return {
          statusCode: 400,
          body: "The slug cannot be empty"
      };
    }
    if (!title.trim().length) {
      return {
          statusCode: 400,
          body: "The title cannot be empty"
      };
    }
    if (!content.trim().length) {
      return {
          statusCode: 400,
          body: "The content cannot be empty"
      };
    }

    // TRY
    try {
      console.log(id);
        const results = await client.query(`
          UPDATE Article SET 
            slug = $1,
            title = $2,
            articlecontent = $3,
            tags = $4,
            edited = $5,
            epistemicstatus = $6,
            completionstatus = $7,
            hidden = $8
          WHERE id = $9
        `, [slug, title, content, tags, edited, epistemicStatus, completionStatus, hidden, id]);
    
        console.log(results);

        return {
            statusCode: 200,
            body: JSON.stringify("Article edited successfully")
        };
      }
      // CATCH
      catch (err) {
        return {
            statusCode: 400,
            body: "An error occurred while editing article: "+err
        };
      }
      // FINALLY
      finally {
        client.end();
      }
}

const limitSize = (input: string | null | undefined, maxLength: number) => {
  if (input == null) return '';
  if (input.length <= maxLength) return input;
  return input.substring(0, maxLength);
}

const getBit = (input: unknown): boolean => {
  if (input == null) return false;
  if (typeof input == 'boolean') return input;
  if (typeof input == 'number') return !!input;
  if (typeof input == 'string') return input.toLowerCase() == 'true';

  return true;
}

export { handler }