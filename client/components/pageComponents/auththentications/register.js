'use client';

import { usePathname } from 'next/navigation';
import RegisterCandidate from './registerCandidate';
import RegisterEmployer from './registerEmployer';

const Register = () => {
    const pathname = usePathname();

    return <>{pathname?.includes('/register/employer') ? <RegisterEmployer /> : <RegisterCandidate />}</>;
};

export default Register;
