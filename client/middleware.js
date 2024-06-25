import { NextResponse } from 'next/server';
import Auth from './utils/auth';

const protectedRoutes = [
    '/admin/dashboard',
    '/admin/position-manage',
    '/admin/category-manage',
    '/admin/skill-manage',
    '/admin/user-manage',
    '/admin/account/setting',
    '/employer/dashboard',
    '/employer/all-applicants',
    '/employer/create-job',
    '/employer/edit-job',
    '/employer/manage-jobs',
    '/employer/account/setting',
    '/employer/recommendation',
    '/company/followed-company',
    '/account/change-password',
    '/account/cv-manage',
    '/account/setting-user-information',
    '/job/applied-job',
    '/job/recommend-job',
    '/job/saved-job',
];
const authRoutes = ['/signin', '/register/employer', '/register/candidate', '/forgot-password', '/reset-password'];

export default function middleware(request) {
    const isAuth = Auth(request.cookies.get('accessToken')?.value);
    if (!isAuth?.status && protectedRoutes.includes(request.nextUrl.pathname)) {
        const absUrl = new URL('/', request.nextUrl.origin);
        return NextResponse.redirect(absUrl.toString());
    }
    if (isAuth?.status && authRoutes.includes(request.nextUrl.pathname)) {
        const absUrl = new URL('/', request.nextUrl.origin);
        return NextResponse.redirect(absUrl.toString());
    }
    if (isAuth?.status && isAuth?.role === 1) {
        if (request.nextUrl.pathname?.includes('/employer') || request.nextUrl.pathname?.includes('/admin')) {
            const absUrl = new URL('/', request.nextUrl.origin);
            return NextResponse.redirect(absUrl.toString());
        }
    }
    if (isAuth?.status && isAuth?.role === 0) {
        if (request.nextUrl.pathname?.includes('/admin')) {
            const absUrl = new URL('/', request.nextUrl.origin);
            return NextResponse.redirect(absUrl.toString());
        }
    }
    if (isAuth?.status && isAuth?.role === 2) {
        if (
            request.nextUrl.pathname?.includes('/employer') ||
            request.nextUrl.pathname?.includes('/company') ||
            request.nextUrl.pathname?.includes('/account') ||
            request.nextUrl.pathname?.includes('/job') ||
            request.nextUrl.pathname === '/'
        ) {
            const absUrl = new URL('/admin/position-manage', request.nextUrl.origin);
            return NextResponse.redirect(absUrl.toString());
        }
    }
}
