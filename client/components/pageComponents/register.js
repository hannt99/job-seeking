'use client';

import { useSearchParams } from 'next/navigation';
import RegisterCandidate from './registerCandidate';
import RegisterEmployer from './registerEmployer';
import { useRouter } from 'next/navigation';

const Register = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    return <>{searchParams.get('role') === 'candidate' ? <RegisterCandidate /> : <RegisterEmployer />}</>;
};

export default Register;
