import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
  
    const { data: { user } } = await supabase.auth.getUser();
    if (!user && req.nextUrl.pathname.startsWith('/host')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    return res;
}

export const config = {
    matcher: ['/host/:path*'],
  };