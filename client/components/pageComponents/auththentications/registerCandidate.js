'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { fullNameValidator, emailValidator, passwordValidator } from '@/utils/formValidation';
import { success, error } from '@/utils/toastMessage';
import Loading from '@/components/loading';

const RegisterCandidate = () => {
    const [fullName, setFullName] = useState('');
    const [fullNameErrMsg, setFullNameErrMsg] = useState({});
    const [isFullNameErr, setIsFullNameErr] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState({});
    const [isEmailErr, setIsEmailErr] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState({});
    const [isPasswordErr, setIsPasswordErr] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState({});
    const [isConfirmPasswordErr, setIsConfirmPasswordErr] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        const isFullNameValid = fullNameValidator(fullName, setIsFullNameErr, setFullNameErrMsg);
        const isEmailValid = emailValidator(email, setIsEmailErr, setEmailErrMsg);
        const isPasswordValid = passwordValidator(password, password, setIsPasswordErr, setPasswordErrMsg);
        const isConfirmPasswordValid = passwordValidator(
            confirmPassword,
            password,
            setIsConfirmPasswordErr,
            setConfirmPasswordErrMsg,
        );

        if (!isFullNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isChecked) return;
        setIsLoading(true);
        const data = {
            email,
            password,
            fullName,
            role: 1,
        };
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);
        if (res?.data?.code === 200) {
            setFullName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setIsLoading(false);
            router.push('/signin');
            return success(res?.data?.message);
        } else {
            setIsLoading(false);
            return error(res?.data?.message);
        }
    };

    return (
        <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] z-50 px-5 md:px-0">
            <div className="bg-white w-full h-fit px-9 py-8 rounded-lg">
                <div className="font-bold text-center tracking-widest text-[2.4rem] text-[var(--primary-color)]">
                    TimViecNhanh
                </div>
                <h1 className="font-semibold text-[2rem] my-7">Đăng ký</h1>
                <form>
                    <div className="space-y-4">
                        <label className="font-semibold text-[1.5rem]">
                            Họ và tên<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            onBlur={() => fullNameValidator(fullName, setIsFullNameErr, setFullNameErrMsg)}
                            placeholder="Han Nguyen"
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isFullNameErr ? 'border-red-600' : ''
                            }`}
                        />
                        <p className="text-red-600 text-[1.3rem]">{fullNameErrMsg.fullName}</p>
                    </div>
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Địa chỉ Email<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => emailValidator(email, setIsEmailErr, setEmailErrMsg)}
                            placeholder="name@example.com"
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isEmailErr ? 'border-red-600' : ''
                            }`}
                        />
                        <p className="text-red-600 text-[1.3rem]">{emailErrMsg.email}</p>
                    </div>
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Mật khẩu<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => passwordValidator(password, password, setIsPasswordErr, setPasswordErrMsg)}
                            placeholder="Mật khẩu"
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isPasswordErr ? 'border-red-600' : ''
                            }`}
                        />
                        <p className="text-red-600 text-[1.3rem]">{passwordErrMsg.password}</p>
                    </div>
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Xác nhận mật khẩu<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() =>
                                passwordValidator(
                                    confirmPassword,
                                    password,
                                    setIsConfirmPasswordErr,
                                    setConfirmPasswordErrMsg,
                                )
                            }
                            placeholder="Xác nhận mật khẩu"
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isConfirmPasswordErr ? 'border-red-600' : ''
                            }`}
                        />
                        <p className="text-red-600 text-[1.3rem]">{confirmPasswordErrMsg.confirmPassword}</p>
                    </div>
                    <div className="flex items-start space-x-3 my-9">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="accent-[var(--primary-color)] scale-125"
                        />
                        <label className="text-[1.5rem] leading-none">
                            Tôi đã đọc và đồng ý với{' '}
                            <Link href="#" className="text-[var(--primary-color)] font-medium">
                                Điều khoản dịch vụ
                            </Link>{' '}
                            và{' '}
                            <Link href="#" className="text-[var(--primary-color)] font-medium">
                                Chính sách bảo mật
                            </Link>{' '}
                            của TimViecNhanh
                        </label>
                    </div>
                    <button
                        onClick={handleRegister}
                        className={`flex items-center justify-center gap-3 w-full bg-[var(--primary-color)] text-white font-medium py-3 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all ${
                            !isChecked ? 'pointer-events-none opacity-40' : ''
                        }`}
                    >
                        {isLoading && <Loading />}
                        <span>Đăng ký</span>
                    </button>
                </form>
                <div className="space-x-5 text-center mt-7">
                    <span className="text-[#aaaaaa] text-[1.5rem]">Bạn đã có tài khoản?</span>
                    <Link
                        href="/signin"
                        className="text-black font-medium hover:text-[var(--primary-color)] transition-all"
                    >
                        Đăng nhập
                    </Link>
                </div>
                <div className="text-center text-[1.5rem] text-[#aaaaaa] font-medium mt-12">
                    © 2024 TimViecNhanh. Designed by Han.
                </div>
            </div>
        </div>
    );
};

export default RegisterCandidate;
