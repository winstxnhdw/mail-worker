type Handler = (request: Request, environment: Record<string, string>) => Promise<Response>;

export const cors =
  (handler: Handler): Handler =>
  async (request, environment) => {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204 });

    const response = await handler(request, environment);
    response.headers.set('Access-Control-Allow-Origin', environment['ACCESS_CONTROL_ALLOW_ORIGIN'] || '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');

    return response;
  };
