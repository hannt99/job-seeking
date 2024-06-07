'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { emailValidator, passwordValidator } from '@/utils/formValidation';
import { success, error } from '@/utils/toastMessage';
import Loading from '@/components/loading';
import CheckRole from './checkRole';

const Signin = () => {
    const [registerOpen, setRegisterOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState({});
    const [isEmailErr, setIsEmailErr] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState({});
    const [isPasswordErr, setIsPasswordErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignin = async (e) => {
        e.preventDefault();
        const isEmailValid = emailValidator(email, setIsEmailErr, setEmailErrMsg);
        const isPasswordValid = passwordValidator(password, password, setIsPasswordErr, setPasswordErrMsg);

        if (!isEmailValid || !isPasswordValid) return;
        const data = {
            email,
            password,
        };
        setIsLoading(true);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, data);
        if (res?.data?.code === 200) {
            setEmail('');
            setPassword('');
            setIsLoading(false);
            localStorage.setItem('accessToken', res?.data?.accessToken);
            return success(res?.data?.message);
        } else {
            setIsLoading(false);
            return error(res?.data?.message);
        }
    };

    useEffect(() => {
        registerOpen && (document.body.style.overflow = 'hidden');
        !registerOpen && (document.body.style.overflow = 'unset');
    }, [registerOpen]);

    return (
        <>
            <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] z-50 px-5 md:px-0">
                <div className="bg-white w-full h-fit px-9 py-8 rounded-lg">
                    <div className="font-bold text-center tracking-widest text-[2.4rem] text-[var(--primary-color)]">
                        TimViecNhanh
                    </div>
                    <h1 className="font-semibold text-[2rem] my-7">Đăng nhập</h1>
                    <form>
                        <div className="space-y-4">
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
                                onBlur={() =>
                                    passwordValidator(password, password, setIsPasswordErr, setPasswordErrMsg)
                                }
                                placeholder="Mật khẩu"
                                className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                    isPasswordErr ? 'border-red-600' : ''
                                }`}
                            />
                            <p className="text-red-600 text-[1.3rem]">{passwordErrMsg.password}</p>
                        </div>
                        <Link
                            href="/forgot-password"
                            className="block w-full text-[1.5rem] font-medium text-[#aaaaaa] text-right my-5 hover:text-[var(--primary-color)] transition-all"
                        >
                            Quên mật khẩu?
                        </Link>
                        <button
                            onClick={handleSignin}
                            className="flex items-center justify-center gap-3 w-full bg-[var(--primary-color)] text-white font-medium py-3 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all"
                        >
                            {isLoading && <Loading />}
                            <span>Đăng nhập</span>
                        </button>
                    </form>
                    <div className="space-x-5 text-center mt-7">
                        <span className="text-[#aaaaaa] text-[1.5rem]">Bạn chưa có tài khoản?</span>
                        <div
                            onClick={() => setRegisterOpen(true)}
                            className="inline text-black font-medium hover:text-[var(--primary-color)] transition-all cursor-pointer"
                        >
                            Đăng ký
                        </div>
                    </div>
                    <div className="text-center text-[1.5rem] text-[#aaaaaa] font-medium mt-12">
                        © 2024 TimViecNhanh. Designed by Han.
                    </div>
                </div>
            </div>
            {registerOpen && <CheckRole setRegisterOpen={setRegisterOpen} />}
        </>
    );
};

export default Signin;
