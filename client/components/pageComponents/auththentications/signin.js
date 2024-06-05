'use client';

import { useState } from 'react';
import Link from 'next/link';

const Signin = () => {
    const [registerOpen, setRegisterOpen] = useState(false);

    return (
        <>
            <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] z-50">
                <div className="bg-white w-full h-fit px-9 py-8 rounded-lg">
                    <div className="font-bold text-center tracking-widest text-[2.4rem] text-[var(--primary-color)]">
                        TimViecNhanh
                    </div>
                    <h1 className="font-semibold text-[2rem] my-7">Đăng nhập</h1>
                    <div className="space-y-4">
                        <label className="font-semibold text-[1.5rem]">
                            Địa chỉ Email<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg"
                        />
                    </div>
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Mật khẩu<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg"
                        />
                    </div>
                    <Link
                        href="/forgot-password"
                        className="block w-full text-[1.5rem] font-medium text-[#aaaaaa] text-right my-5 hover:text-[var(--primary-color)] transition-all"
                    >
                        Quên mật khẩu?
                    </Link>
                    <button className="w-full bg-[var(--primary-color)] text-white font-medium py-3 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all">
                        Đăng nhập
                    </button>
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
                    className="flex fixed top-0 left-0 bottom-0 right-0 bg-black/30 z-[999]"
                >
                    <div onClick={(e) => e.stopPropagation()} className="w-[800px] bg-white border m-auto rounded-3xl">
                        <div className="text-center pt-20 pb-8">
                            <p className="text-[2rem] font-semibold">Chào bạn,</p>
                            <p className="text-[#aaaaaa] text-[1.5rem]">
                                Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé!
                            </p>
                        </div>
                        <div className="border-t pt-9 pb-20 px-16 rounded-3xl">
                            <p className="text-center text-[1.7rem] font-medium px-40">
                                Để tối ưu tốt nhất cho trải nghiệm của bạn với TimViecNhanh, vui lòng lựa chọn nhóm phù
                                hợp nhất với bạn.
                            </p>
                            <div className="grid grid-cols-2 mt-5">
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
                    </div>
                </div>
            )}
        </>
    );
};

export default Signin;
