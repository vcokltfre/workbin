const TOKEN_REGEX = /([a-zA-Z0-9_-]{23,28})\.([a-zA-Z0-9_-]{6,7})\.([a-zA-Z0-9_-]{27})/g;

async function createResponse(data: string): Promise<Response> {
  return new Response(data, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

async function getPaste(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);

  const key = searchParams.get("key");

  if (!key) {
    return new Response(null, {
      status: 400,
    });
  }

  const data = await WORKBIN.get(`paste.${key}`);

  if (data === null) {
    return new Response(null, {
      status: 404,
    });
  }

  return createResponse(data);
}

async function createPaste(request: Request): Promise<Response> {
  const data = (await request.text()).replace(TOKEN_REGEX, "[TOKEN REMOVED BY WORKBIN]");

  const key = `${Date.now()}${Math.round(Math.random() * 1000)}`;

  await WORKBIN.put(`paste.${key}`, data);

  return new Response(JSON.stringify({ key }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);

  switch (pathname) {
    case "/api/item":
      return getPaste(request);
    case "/api/new":
      return createPaste(request);
  }

  return fetch(request);
}
