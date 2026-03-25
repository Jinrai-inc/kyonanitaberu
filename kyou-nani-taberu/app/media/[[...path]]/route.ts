import { NextRequest } from "next/server";

const WP_IP = process.env.WORDPRESS_IP || "160.251.71.83";
const WP_HOST = process.env.WORDPRESS_HOST || "media.kyou-nani-taberu.app";

export async function GET(request: NextRequest) {
  return proxy(request);
}

export async function POST(request: NextRequest) {
  return proxy(request);
}

async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  // /media/foo → /foo, /media → /
  const wpPath = url.pathname.replace(/^\/media/, "") || "/";
  const destination = `http://${WP_IP}${wpPath}${url.search}`;

  const headers = new Headers(request.headers);
  headers.set("Host", WP_HOST);
  headers.delete("connection");

  const res = await fetch(destination, {
    method: request.method,
    headers,
    body: request.method !== "GET" ? await request.blob() : undefined,
    redirect: "manual",
  });

  const responseHeaders = new Headers(res.headers);
  responseHeaders.delete("transfer-encoding");

  return new Response(res.body, {
    status: res.status,
    headers: responseHeaders,
  });
}
