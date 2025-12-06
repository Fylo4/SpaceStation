import { Handler, HandlerEvent } from "@netlify/functions"
import { initializeFunctionVariables } from "./_FunctionUtils";


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

    try {
      const where = roles.includes('dev') ? '' : "WHERE hidden != B'1'";
        const results = await client.query(
          `SELECT
            id,
            title,
            image,
            description,
            genre,
            artist,
            year,
            tags,
            lettergrade,
            rankOrder,
            hidden
          FROM musicalbum ${where}
          ORDER BY randOrder DESC`
        );
    
        var ret = {Albums: results.rows};

        return {
            statusCode: 200,
            body: JSON.stringify(ret)
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