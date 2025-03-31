type Handler = (request: Request, environment: Record<string, string>) => Promise<Response>

export const cors =
  (handler: Handler): Handler =>
  async (request, environment) => {
    const response = await handler(request, environment)
    response.headers.set('Access-Control-Allow-Origin', environment['ACCESS_CONTROL_ALLOW_ORIGIN'] || '*')
    response.headers.set('Access-Control-Allow-Methods', environment['ACCESS_CONTROL_ALLOW_METHODS'] || '*')
    response.headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type')

    return response
  }
