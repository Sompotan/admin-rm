import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isProtectedRoute =
        pathname === '/'
        || pathname.startsWith('/pasien')
        || pathname.startsWith('/verifikasi')
        || pathname.startsWith('/dokter')
        || pathname.startsWith('/kunjungan')
        || pathname.startsWith('/antrian')
        || pathname.startsWith('/obat')
        || pathname.startsWith('/verifikasi')

    const isAuthRoute = pathname === '/sign-in';

    // Belum login dan akses halaman private
    if (!token && isProtectedRoute) {
        console.log('[Middleware] Belum login, redirect ke /sign-in');
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Sudah login dan akses /sign-in
    if (token && isAuthRoute) {
        console.log('[Middleware] Sudah login, redirect ke /');
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/sign-in', '/pasien/:path*', '/verifikasi/:path*', '/dokter/:path*', '/kunjungan/:path*', '/antrian/:path*', '/obat/:path*', '/verifikasi/:path*'],
};
