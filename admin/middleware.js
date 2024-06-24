import { NextResponse } from 'next/server';
import Auth from './utils/auth';

const protectedRoutes = [
    '/admin/dashboard',
    '/admin/position-manage',
    '/admin/category-manage',
    '/admin/skill-manage',
    '/admin/user-manage',
    '/admin/account/setting',
];
const authRoutes = ['/signin', '/forgot-password', '/reset-password'];

export default function middleware(request) {
    const isAuth = Auth(request.cookies.get('accessToken')?.value);
    if (!isAuth?.status && protectedRoutes.includes(request.nextUrl.pathname)) {
        const absUrl = new URL('/signin', request.nextUrl.origin);
        return NextResponse.redirect(absUrl.toString());
    }
    if (isAuth?.status && authRoutes.includes(request.nextUrl.pathname)) {
        const absUrl = new URL('/admin/dashboard', request.nextUrl.origin);
        return NextResponse.redirect(absUrl.toString());
    }
    if (request.nextUrl.pathname === '/') {
        const absUrl = new URL('/signin', request.nextUrl.origin);
        return NextResponse.redirect(absUrl.toString());
    }
}
