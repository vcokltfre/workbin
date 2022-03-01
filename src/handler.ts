const TOKEN_REGEX = /([a-zA-Z0-9_-]{23,28})\.([a-zA-Z0-9_-]{6,7})\.([a-zA-Z0-9_-]{27})/g;

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

  let responseData;

  try {
    responseData = JSON.parse(data);
  } catch (e) {
    responseData = {};
  }

  // Account for old format data
  if (!responseData.content) {
    responseData = {
      content: data,
      language: "python",
    };
  }

  return new Response(JSON.stringify(responseData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function createPaste(request: Request): Promise<Response> {
  let requestData: {
    content: string;
    language: string;
  };

  try {
    requestData = await request.json();
  } catch (e) {
    const data = await request.text();

    requestData = {
      content: data,
      language: "python",
    };
    /* return new Response(null, {
      status: 422,
    }); */ // This will be re-added after a week
  }

  if (!requestData.content) {
    return new Response(null, {
      status: 422,
    });
  }

  const { content, language } = requestData;
  const key = `${Date.now()}${Math.round(Math.random() * 1000)}`;

  await WORKBIN.put(
    `paste.${key}`,
    JSON.stringify({
      content: content.replace(TOKEN_REGEX, "[TOKEN REMOVED BY WORKBIN]"),
      language: language || "python",
    }),
  );

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
