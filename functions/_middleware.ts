// Basic auth middleware for Cloudflare Pages
// Protects ALL routes on case.etrenzik.com

const CREDENTIALS = {
  username: "troy",
  password: "Etrenzik2025!",
};

function unauthorized(): Response {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Etrenzik Case Portal", charset="UTF-8"',
    },
  });
}

function parseBasicAuth(header: string): { username: string; password: string } | null {
  if (!header.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6));
    const sep = decoded.indexOf(":");
    if (sep === -1) return null;
    return { username: decoded.slice(0, sep), password: decoded.slice(sep + 1) };
  } catch {
    return null;
  }
}

export const onRequest: PagesFunction = async (context) => {
  const authHeader = context.request.headers.get("Authorization");
  if (!authHeader) return unauthorized();

  const creds = parseBasicAuth(authHeader);
  if (!creds) return unauthorized();

  if (creds.username !== CREDENTIALS.username || creds.password !== CREDENTIALS.password) {
    return unauthorized();
  }

  return context.next();
};
