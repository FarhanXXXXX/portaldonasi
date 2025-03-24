// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '../lib/supabase';

export async function middleware(request: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession();

  // Jika pengguna mencoba mengakses halaman home tanpa login
  if (!session && request.nextUrl.pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika pengguna sudah login tetapi mencoba mengakses halaman login/register
  if (session && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

// Tentukan rute yang akan dilindungi oleh middleware
export const config = {
  matcher: ['/home', '/login', '/register'], // Proteksi rute-rute ini
};