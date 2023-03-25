import type {
  Handler,
  APIGatewayProxyResultV2,
  APIGatewayProxyEventV2WithRequestContext,
  APIGatewayEventRequestContextV2
} from 'aws-lambda'

export const handler: Handler = async (
  event: APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2>
): Promise<APIGatewayProxyResultV2> => {
  return { statusCode: 200, body: event.body }
}
