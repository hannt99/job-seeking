import { jwtDecode } from 'jwt-decode';

const Auth = (token) => {
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        return { status: false };
    } else {
        return { status: true, role: decodedToken?.role };
    }
};

export default Auth;
