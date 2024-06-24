'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { passwordValidator } from '@/utils/formValidation';
import { success, error } from '@/utils/toastMessage';
import Loading from '@/components/common/loading';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState({});
    const [isPasswordErr, setIsPasswordErr] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState({});
    const [isConfirmPasswordErr, setIsConfirmPasswordErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const isPasswordValid = passwordValidator(password, password, setIsPasswordErr, setPasswordErrMsg);
        const isConfirmPasswordValid = passwordValidator(
            confirmPassword,
            password,
            setIsConfirmPasswordErr,
            setConfirmPasswordErrMsg,
        );
        if (!isPasswordValid || !isConfirmPasswordValid) return;
        setIsLoading(true);
        const data = {
            token: localStorage.getItem('resetToken'),
            password,
        };
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, data);
        if (res?.data?.code === 200) {
            localStorage.removeItem('resetToken');
            setPassword('');
            setConfirmPassword('');
            setIsLoading(false);
            return success(res?.data?.message);
        } else {
            setIsLoading(false);
            return error(res?.data?.message);
        }
    };

    return (
        <div className="relative flex items-center justify-center w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] z-50 px-5 md:px-0">
            <div className="bg-white w-full md:w-[400px] h-fit px-9 py-8 rounded-lg custom-shadow-v1">
                <div className="font-bold text-center tracking-widest text-[2.4rem] text-[var(--primary-color)]">
                    TimViecNhanh
                </div>
                <h1 className="font-semibold text-[2rem] my-7">Đặt lại mật khẩu</h1>
                <form>
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Mật khẩu mới<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => passwordValidator(password, password, setIsPasswordErr, setPasswordErrMsg)}
                            placeholder="Mật khẩu mới"
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isPasswordErr ? 'border-red-600' : ''
                            }`}
                        />
                        <p className="text-red-600 text-[1.3rem]">{passwordErrMsg.newPassword}</p>
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
                    <button
                        onClick={handleResetPassword}
                        className="flex items-center justify-center gap-3 w-full bg-[var(--primary-color)] text-white font-medium py-3 mt-7 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all"
                    >
                        {isLoading && <Loading />}
                        <span>Đặt lại</span>
                    </button>
                </form>
                <Link
                    href="/signin"
                    className="block text-right text-[#aaaaaa] font-medium mt-7 hover:underline transition-all"
                >
                    Quay lại đăng nhập
                </Link>
                <div className="text-center text-[1.5rem] text-[#aaaaaa] font-medium mt-12">
                    © 2024 TimViecNhanh. Designed by Han.
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
