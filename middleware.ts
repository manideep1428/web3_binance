// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  const response = NextResponse.next();
  return response;
}



export const config = {
  matcher: '/:path*',
};
