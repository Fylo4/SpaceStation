import { HandlerEvent } from "@netlify/functions"
import { Errors, initializeFunctionVariables } from "./_FunctionUtils";

exports.handler = async (event: HandlerEvent, context: unknown) => {

  let userId, client, roles;
  try {
    ({userId, roles, client} = await initializeFunctionVariables(event));
  } catch (err) {
    return {
        statusCode: 400,
        body: "An unknown error occurred while posting articles"
    };
  }

  if (!userId?.length) return Errors.MissingAuthorization;
  if (!(roles ?? []).includes('dev')) return Errors.ActionRequiresPermissions;

  const id = event.queryStringParameters?.['id'];
  if (id == null) {
    return {
      status: 400,
      body: 'Unable to delete article: ID not found'
    }
  }

  // TRY
  try {
      const results = await client.query(`
        DELETE FROM Article
        WHERE id = $1
      `, [id]);
  
      return {
          statusCode: 200,
          body: JSON.stringify("Article deleted successfully")
      };
    }
    // CATCH
    catch (err) {
      return {
          statusCode: 400,
          body: "An error occurred while deleting article: "+err
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