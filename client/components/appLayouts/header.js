'use client';

import { FaXmark } from 'react-icons/fa6';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = () => {
    const [registerOpen, setRegisterOpen] = useState(false);

    useEffect(() => {
        registerOpen && (document.body.style.overflow = 'hidden');
        !registerOpen && (document.body.style.overflow = 'unset');
    }, [registerOpen]);

    return (
        <>
            <div className="w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] min-h-[74px]">
                <div className="flex items-center gap-3">
                    <Link href="/signin" className="block border px-5 py-3">
                        Đăng nhập
                    </Link>
                    <div onClick={() => setRegisterOpen(true)} className="border px-5 py-3">
                        Đăng ký
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

export default Header;
