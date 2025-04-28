// src/middleware.ts
import { NextResponse } from 'next/server';
import { supabase } from '../lib/supabase';

export async function middleware(request: any) {
  const { data } = await supabase.auth.getSession();

  // Jika tidak ada sesi dan pengguna mencoba mengakses halaman selain /login atau /register
  if (!data.session && !['/login', '/register'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika sudah login dan mencoba mengakses /login atau /register
  if (data.session && ['/login', '/register'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url)); // Arahkan ke halaman utama
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/example', '/donationform', '/DonationList', '/kami', '/profile'],
};