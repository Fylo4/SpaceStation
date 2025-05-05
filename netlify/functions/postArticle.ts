import { Handler, HandlerEvent } from "@netlify/functions"
import { Client } from "pg";

    // slug: string;
    // title: string;
    // articleContent: string;
    // tags?: string;
    // created?: Date;
    // edited?: Date;
    // epistemicStatus?: string;
    // completionStatus?: string;
    // hidden?: boolean;

const handler: Handler = async(event: HandlerEvent, context: unknown) => {

  return {
    statusCode: 400,
    body: "You do not have access to post articles"
  };

    const client = new Client(process.env["DB_STRING"]);
    await client.connect();

    const body = JSON.parse(event.body ?? '{}') as Record<string, string>;
    const slug = limitSize(body['slug'], 100) ?? '';
    const title = limitSize(body['title'], 100) ?? '';
    const content = body['articlecontent'] ?? '';
    const tags = limitSize(body['tags'], 200) ?? '';
    const created = new Date();
    const edited = new Date(); // Set edited date to today
    const epistemicStatus = limitSize(body['epistemicstatus'], 200) ?? '';
    const completionStatus = limitSize(body['completionstatus'], 100) ?? '';
    const hidden = getBit(body['hidden']) ? 1 : 0;
    
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
        const results = await client.query(`
          INSERT INTO Article (slug, title, articlecontent, tags, created, edited, epistemicstatus, completionstatus, hidden)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [slug, title, content, tags, created, edited, epistemicStatus, completionStatus, hidden]);
    
        return {
            statusCode: 200,
            body: JSON.stringify("Article added successfully")
        };
      }
      // CATCH
      catch (err) {
        return {
            statusCode: 400,
            body: "An error occurred while posting article: "+err
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