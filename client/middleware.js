import { NextResponse } from 'next/server';
import Auth from './utils/auth';

const employerRoutes = [
    '/employer/dashboard',
    '/employer/all-applicants',
    '/employer/create-job',
    '/employer/manage-jobs',
    '/employer/account/setting',
];
const authRoutes = ['/signin', '/register/employer', '/register/candidate', '/forgot-password', '/reset-password'];

export default function middleware(request) {
    const isAuth = Auth(request.cookies.get('accessToken')?.value);
    if (!isAuth?.status && employerRoutes.includes(request.nextUrl.pathname)) {
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
