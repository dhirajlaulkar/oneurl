import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

const getAllowedOrigins = (): string[] => {
  const origins = [
    "https://oneurl.live",
    "https://www.oneurl.live",
  ];
  
  if (process.env.NODE_ENV === "development") {
    origins.push("http://localhost:3000");
  }
  
  return origins;
};

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  const requestedHeaders = req.headers.get("access-control-request-headers");
  const requestedMethod = req.headers.get("access-control-request-method");
  
  const allowedOrigins = getAllowedOrigins();
  const isAllowedOrigin = origin && allowedOrigins.includes(origin);
  
  if (!isAllowedOrigin && origin) {
    return new NextResponse(null, { status: 403 });
  }

  const responseHeaders: Record<string, string> = {
    "Access-Control-Allow-Origin": origin || allowedOrigins[0],
    "Access-Control-Allow-Methods": requestedMethod || "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": requestedHeaders || "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
  };

  return new NextResponse(null, {
    status: 200,
    headers: responseHeaders,
  });
}

export const GET = handler.GET;
export const POST = handler.POST;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

