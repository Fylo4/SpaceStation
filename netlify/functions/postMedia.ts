import { HandlerEvent } from "@netlify/functions"
import { initializeFunctionVariables } from "./_FunctionUtils";


exports.handler = async (event: HandlerEvent, context: unknown) => {

    let userId, client, roles;
    try {
      ({userId, roles, client} = await initializeFunctionVariables(event));
    } catch (err) {
      return {
          statusCode: 400,
          body: "An unknown error occurred while getting albums"
      };
    }
    

  // Endpoint handler stuff
  const body = JSON.parse(event.body ?? '{}') as Record<string, string>;
  const title = limitSize(body['title'], 100) ?? '';
  const image = body['image'] ?? '';
  const content = body['articlecontent'] ?? '';
  const tags = limitSize(body['tags'], 200) ?? '';
  const created = new Date();
  const edited = new Date(); // Set edited date to today
  const epistemicStatus = limitSize(body['epistemicstatus'], 200) ?? '';
  const completionStatus = limitSize(body['completionstatus'], 100) ?? '';
  const hidden = getBit(body['hidden']) ? 1 : 0;
  
  if (!title.trim().length) {
    return {
        statusCode: 400,
        body: "The title cannot be empty"
    };
  }

  // TRY
  try {
      const results = await client.query(`
        INSERT INTO Article (title, articlecontent, tags, created, edited, epistemicstatus, completionstatus, hidden)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [title, content, tags, created, edited, epistemicStatus, completionStatus, hidden]);
  
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
};


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