import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as middy from "middy";
import { cors } from "middy/middlewares";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          items: [],
          message:
            "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
          input: event,
        },
        null,
        2
      ),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
