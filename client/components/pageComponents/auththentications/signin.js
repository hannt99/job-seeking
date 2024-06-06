'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FaXmark } from 'react-icons/fa6';
import { emailValidator, passwordValidator } from '@/utils/formValidation';
import { success, error } from '@/utils/toastMessage';

const Signin = () => {
    const [registerOpen, setRegisterOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState({});
    const [isEmailErr, setIsEmailErr] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState({});
    const [isPasswordErr, setIsPasswordErr] = useState(false);

    const handleSignin = async (e) => {
        e.preventDefault();
        const isEmailValid = emailValidator(email, setIsEmailErr, setEmailErrMsg);
        const isPasswordValid = passwordValidator(password, password, setIsPasswordErr, setPasswordErrMsg);

        if (!isEmailValid || !isPasswordValid) return;
        const data = {
            email,
            password,
        };
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, data);
        if (res?.data?.code === 200) {
            setEmail('');
            setPassword('');
            return success(res?.data?.message);
        } else {
            return error(res?.data?.message);
        }
    };

    useEffect(() => {
        registerOpen && (document.body.style.overflow = 'hidden');
        !registerOpen && (document.body.style.overflow = 'unset');
    }, [registerOpen]);

    return (
        <>
            <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] z-50">
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
                            className="w-full bg-[var(--primary-color)] text-white font-medium py-3 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all"
                        >
                            Đăng nhập
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
            {registerOpen && (
                <div
                    onClick={() => setRegisterOpen(false)}
                    className="flex fixed top-0 left-0 bottom-0 right-0 py-5 bg-black/30 overflow-auto z-[999]"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-[calc(100%-48px)] md:w-[700px] lg:w-[800px] bg-white border m-auto rounded-3xl"
                    >
                        <div className="text-center pt-20 pb-8">
                            <p className="text-[2rem] font-semibold">Chào bạn,</p>
                            <p className="text-[#aaaaaa] text-[1.5rem] px-10 md:px-0">
                                Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé! &#128276;
                            </p>
                        </div>
                        <div className="border-t pt-9 pb-20 px-16 rounded-3xl">
                            <p className="text-center text-[1.7rem] font-medium px-8 md:px-40">
                                Để tối ưu tốt nhất cho trải nghiệm của bạn với TimViecNhanh, vui lòng lựa chọn nhóm phù
                                hợp nhất với bạn.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-y-10">
                                <div className="flex flex-col items-center w-full h-full">
                                    <div className="w-[320px] h-auto">
                                        <img
                                            src="../assets/images/employer.png"
                                            alt="employer"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <Link
                                        href="/register/employer"
                                        className="block bg-[var(--primary-color)] texy-[1.3rem] text-white px-10 py-3 rounded-full hover:bg-[var(--primary-hover-color)] transition-all"
                                    >
                                        Tôi là nhà tuyển dụng
                                    </Link>
                                </div>
                                <div className="flex flex-col items-center w-full h-full">
                                    <div className="w-[320px] h-auto">
                                        <img
                                            src="../assets/images/candidate.png"
                                            alt="candidate"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <Link
                                        href="/register/candidate"
                                        className="block bg-[var(--primary-color)] texy-[1.3rem] text-white px-10 py-3 rounded-full hover:bg-[var(--primary-hover-color)] transition-all"
                                    >
                                        Tôi là ứng cử viên
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => setRegisterOpen(false)}
                            className="block md:hidden absolute top-0 right-0 text-[2.4rem] p-5 cursor-pointer"
                        >
                            <FaXmark />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Signin;
