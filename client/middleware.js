import { NextResponse } from 'next/server';
import Auth from './utils/auth';

const protectedRoutes = [
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
        if (request.nextUrl.pathname?.includes('/employer')) {
            const absUrl = new URL('/', request.nextUrl.origin);
            return NextResponse.redirect(absUrl.toString());
        }
    }
}
