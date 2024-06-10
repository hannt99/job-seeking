'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RiLockPasswordFill, RiLogoutBoxLine, RiArrowDropDownFill } from 'react-icons/ri';
import { TbWorldUpload } from 'react-icons/tb';
import axios from 'axios';
import Link from 'next/link';
import CheckRole from '../pageComponents/auththentications/checkRole';
import { success, error } from '@/utils/toastMessage';
import Auth from '@/utils/auth';

const Header = () => {
    const [registerOpen, setRegisterOpen] = useState(false);
    const [currUser, setCurrUser] = useState({});

    const router = useRouter();
    const isAuth = Auth(typeof window !== 'undefined' && localStorage.getItem('accessToken'));

    const handleLogout = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            withCredentials: true,
        });
        if (res?.data?.code === 200) {
            localStorage.clear();
            router.push('/signin');
            return success(res?.data?.message);
        } else {
            return error('Đã xảy ra lỗi');
        }
    };

    useEffect(() => {
        if (isAuth?.status === false) return;
        const fetchUser = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/get-current-user`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                return setCurrUser(res?.data?.currentUser);
            } else {
                return error(res?.data?.message);
            }
        };
        fetchUser();
    }, [isAuth]);

    useEffect(() => {
        registerOpen && (document.body.style.overflow = 'hidden');
        !registerOpen && (document.body.style.overflow = 'unset');
    }, [registerOpen]);

    return (
        <>
            <div className="flex items-center justify-between w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] min-h-[60px]">
                <div className="text-[2rem] text-[var(--primary-color)] font-semibold">TimViecNhanh</div>
                {isAuth?.status === false && (
                    <div className="flex items-center gap-3">
                        <Link
                            href="/signin"
                            className="block text-[var(--primary-color)] text-[1.4rem] bg-[var(--secondary-color)] px-7 py-3 rounded-full hover:text-white hover:bg-[var(--primary-color)] transition-all"
                        >
                            Đăng nhập
                        </Link>
                        <div
                            onClick={() => setRegisterOpen(true)}
                            className="text-white text-[1.4rem] bg-[var(--primary-color)] px-7 py-3 rounded-full cursor-pointer hover:bg-[var(--primary-hover-color)] transition-all"
                        >
                            Đăng ký
                        </div>
                    </div>
                )}
                {isAuth?.status === true && (
                    <div className="flex items-center gap-10">
                        {isAuth?.role === 0 && (
                            <Link
                                href="/employer/dashboard"
                                className="hidden md:block font-semibold text-[1.4rem] hover:underline"
                            >
                                Đăng tuyển ngay
                            </Link>
                        )}
                        <div className="group relative flex items-center mr-4 cursor-pointer">
                            <div className="w-[40px] h-[40px] border border-black rounded-full">
                                <img
                                    className="w-full h-full object-cover rounded-full"
                                    src={currUser?.avatar}
                                    alt="user avatar"
                                />
                            </div>
                            <div className="text-[2.4rem]">
                                <RiArrowDropDownFill />
                            </div>
                            <div className="group-hover:block hidden absolute top-[100%] right-0 w-[300px] rounded-lg transition-all cursor-default">
                                <ul className="bg-white shadow-md border border-[#cccccc]/30 rounded-lg pb-3">
                                    <li className="px-6 py-4 rounded-lg">
                                        <Link
                                            href="/account/setting-user-information"
                                            className="block px-5 border border-[#cccccc]/30 shadow-md rounded-lg"
                                        >
                                            <div className="flex items-center gap-3 w-full py-3">
                                                <div className="w-[36px] h-[36px]">
                                                    <img
                                                        src={currUser?.avatar}
                                                        alt="user avatar"
                                                        className="w-full h-full border border-black object-cover rounded-full"
                                                    />
                                                </div>
                                                <span className="text-[1.3rem] font-semibold max-w-[156px] truncate">
                                                    {currUser?.fullName}
                                                </span>
                                            </div>
                                            <div className="border-t text-[1.3rem] font-semibold py-3">
                                                Xem thông tin cá nhân
                                            </div>
                                        </Link>
                                    </li>
                                    {isAuth?.role === 0 && (
                                        <li className="block md:hidden">
                                            <Link
                                                href="/employer/dashboard"
                                                className="flex items-center gap-3 px-6 py-4 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] rounded-lg mx-3 cursor-pointer"
                                            >
                                                <div className="flex w-[30px] h-[30px] bg-[#cccccc]/50 rounded-full">
                                                    <TbWorldUpload className="m-auto" />
                                                </div>
                                                <span className="whitespace-nowrap">Đăng tuyển ngay</span>
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <Link
                                            href="/account/change-password"
                                            className="flex items-center gap-3 px-6 py-4 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] rounded-lg mx-3 cursor-pointer"
                                        >
                                            <div className="flex w-[30px] h-[30px] bg-[#cccccc]/50 rounded-full">
                                                <RiLockPasswordFill className="m-auto" />
                                            </div>
                                            <span className="whitespace-nowrap">Đối mật khẩu</span>
                                        </Link>
                                    </li>
                                    <li
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 px-6 py-4 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] rounded-lg mx-3 cursor-pointer"
                                    >
                                        <div className="flex w-[30px] h-[30px] bg-[#cccccc]/50 rounded-full">
                                            <RiLogoutBoxLine className="m-auto" />
                                        </div>
                                        <span className="whitespace-nowrap">Đăng xuất</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {registerOpen && <CheckRole setRegisterOpen={setRegisterOpen} />}
        </>
    );
};

export default Header;
