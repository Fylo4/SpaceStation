import { Handler, HandlerEvent } from "@netlify/functions"
import { Errors, initializeFunctionVariables } from "./_FunctionUtils";


const handler: Handler = async(event: HandlerEvent, context: unknown) => {

  let userId, client, roles;
  try {
    ({userId, roles, client} = await initializeFunctionVariables(event));
  } catch (err) {
    return {
        statusCode: 400,
        body: "An unknown error occurred while getting albums"
    };
  }
  const count = event.queryStringParameters?.['count'];

  // if (!userId?.length) return Errors.MissingAuthorization;
  // if (!(roles ?? []).includes('dev')) return Errors.ActionRequiresPermissions;

    try {
        // const results = await client.query(
        //   `SELECT TOP (10)
        //     id,
        //     data
        //   FROM image
        //   ORDER BY randOrder DESC`
        // );
    
        // var ret = {Albums: results.rows};

        return {
            statusCode: 200,
            body: count
        };
      } catch (err) {
        console.log(err)
        return {
            statusCode: 400,
            body: `An error occurred while getting music albums: ${JSON.stringify(err)}`
        };
      } finally {
        client.end();
      }
}

export { handler }