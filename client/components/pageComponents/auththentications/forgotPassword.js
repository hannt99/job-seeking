'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { emailValidator } from '@/utils/formValidation';
import { success, error } from '@/utils/toastMessage';
import Loading from '@/components/common/loading';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState({});
    const [isEmailErr, setIsEmailErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMail = async (e) => {
        e.preventDefault();
        const isEmailValid = emailValidator(email, setIsEmailErr, setEmailErrMsg);

        if (!isEmailValid) return;
        setIsLoading(true);
        const data = {
            email,
        };
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, data);
        if (res?.data?.code === 200) {
            localStorage.setItem('resetToken', res?.data?.resetToken);
            setEmail('');
            setIsLoading(false);
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
                <h1 className="font-semibold text-[2rem] my-7">Quên mật khẩu</h1>
                <p className="text-[#aaaaaa] mb-7">
                    Hãy điền địa chỉ email của bạn tại đây. Bạn sẽ nhận được liên kết để tạo mật khẩu mới qua email.
                </p>
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
                    <button
                        onClick={handleSendMail}
                        className="flex items-center justify-center gap-3 w-full bg-[var(--primary-color)] text-white font-medium py-3 mt-7 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all"
                    >
                        {isLoading && <Loading />}
                        <span>Gửi</span>
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

export default ForgotPassword;
