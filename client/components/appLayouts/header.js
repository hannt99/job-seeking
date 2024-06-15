'use client';

import { useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { RiLockPasswordFill, RiLogoutBoxLine, RiArrowDropDownFill, RiShieldUserFill } from 'react-icons/ri';
import { TbWorldUpload } from 'react-icons/tb';
import { FaBars, FaXmark, FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { IoSearchOutline, IoHeartOutline } from 'react-icons/io5';
import { BsSuitcaseLg, BsFire } from 'react-icons/bs';
import axios from 'axios';
import Link from 'next/link';
import CheckRoleRegister from '../common/checkRoleRegister';
import { success, error } from '@/utils/toastMessage';
import { UserAvatarContext } from './defaultLayout';
import Auth from '@/utils/auth';

const Header = () => {
    const [registerOpen, setRegisterOpen] = useState(false);
    const [currUser, setCurrUser] = useState({});
    const [navOpen, setNavOpen] = useState(false);
    const [navJobOpen, setNavJobOpen] = useState(false);
    const [navUserOpen, setNavUserOpen] = useState(false);

    const { isChangeUserAvatar } = useContext(UserAvatarContext);
    const router = useRouter();
    const pathname = usePathname();
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
        navOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset');
    }, [navOpen]);

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
    }, [isChangeUserAvatar]);

    useEffect(() => {
        registerOpen && (document.body.style.overflow = 'hidden');
        !registerOpen && (document.body.style.overflow = 'unset');
    }, [registerOpen]);

    return (
        <>
            <div className="flex items-center justify-between px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] h-[60px]">
                <div className="flex items-center gap-20 h-full">
                    <div className="text-[2rem] text-[var(--primary-color)] font-semibold">TimViecNhanh</div>
                    <ul className="hidden lg:flex items-center font-semibold text-[1.5rem] tracking-wide h-full">
                        <li className="group relative h-full">
                            <div
                                className={`flex items-center px-4 h-full cursor-pointer hover:text-[var(--primary-color)] transition-all ${
                                    pathname?.includes('/job') ? 'text-[var(--primary-color)]' : ''
                                }`}
                            >
                                Việc làm
                            </div>
                            <ul className="hidden group-hover:block absolute top-[calc(100%-8px)] left-0 w-[400px] bg-white text-[1.5rem] border-t-4 border-[var(--primary-hover-color)] arrow-top p-6 custom-shadow-v1 space-y-3 rounded-lg z-[999]">
                                <li
                                    className={`hover:text-[var(--primary-color)] ${
                                        pathname?.includes('/search-job') ? 'text-[var(--primary-color)]' : ''
                                    }`}
                                >
                                    <Link
                                        href="/job/search-job"
                                        className="flex items-center gap-5 p-5 bg-[var(--secondary-color)] rounded-lg"
                                    >
                                        <IoSearchOutline className="text-[2rem] text-[var(--primary-color)]" />
                                        <span>Tìm việc làm</span>
                                    </Link>
                                </li>
                                <li>
                                    <hr></hr>
                                </li>
                                <li
                                    className={`hover:text-[var(--primary-color)] ${
                                        pathname?.includes('/applied-job') ? 'text-[var(--primary-color)]' : ''
                                    }`}
                                >
                                    <Link
                                        href="/job/applied-job"
                                        className="flex items-center gap-5 p-5 bg-[var(--secondary-color)] rounded-lg"
                                    >
                                        <BsSuitcaseLg className="text-[2rem] text-[var(--primary-color)]" />
                                        <span>Việc làm đã ứng tuyển</span>
                                        <BsFire className="text-[2rem] text-orange-600" />
                                    </Link>
                                </li>
                                <li
                                    className={`hover:text-[var(--primary-color)] ${
                                        pathname?.includes('/saved-job') ? 'text-[var(--primary-color)]' : ''
                                    }`}
                                >
                                    <Link
                                        href="/job/saved-job"
                                        className="flex items-center gap-5 p-5 bg-[var(--secondary-color)] rounded-lg"
                                    >
                                        <IoHeartOutline className="text-[2rem] text-[var(--primary-color)]" />
                                        <span>Việc làm đã lưu</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="h-full">
                            <Link
                                href="#"
                                className="flex items-center px-4 h-full hover:text-[var(--primary-color)] transition-all"
                            >
                                Công ty
                            </Link>
                        </li>
                        <li className="h-full">
                            <Link
                                href="#"
                                className="flex items-center px-4 h-full hover:text-[var(--primary-color)] transition-all"
                            >
                                Công cụ
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-3">
                    {isAuth?.status === false && (
                        <div className="hidden md:flex items-center gap-3">
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
                        <div className="hidden lg:flex items-center gap-10">
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
                                <div className="group-hover:block hidden absolute top-[100%] right-0 w-[300px] rounded-lg transition-all cursor-default z-[999]">
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
                    <div
                        onClick={() => setNavOpen(true)}
                        className="block lg:hidden text-[2.6rem] p-3 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-full"
                    >
                        <FaBars />
                    </div>
                </div>
            </div>

            {/* Mobile nav */}
            <div
                onClick={() => setNavOpen(false)}
                className={!navOpen ? 'invisible' : 'fixed top-0 left-0 bottom-0 right-0 bg-black/45 z-[999]'}
            >
                <ul
                    onClick={(e) => e.stopPropagation()}
                    className={
                        navOpen
                            ? 'absolute top-0 left-0 h-screen w-[80%] md:w-[65%] bg-white uppercase font-semibold text-[#808080] tracking-wider text-[1.4rem] pt-10 shadow-md opacity-100 transition-all duration-700 overflow-auto z-[999]'
                            : 'absolute top-0 left-[-100%] h-screen w-[80%] md:w-[65%] bg-white uppercase font-semibold text-[#808080] tracking-wider text-[1.4rem] pt-10 shadow-md transition-all duration-700 opacity-0 overflow-auto z-[999]'
                    }
                >
                    <li className="block lg:hidden">
                        {isAuth?.status === false && (
                            <div className="flex items-center justify-center gap-3 mb-5">
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
                            <div
                                onClick={() => setNavUserOpen(!navUserOpen)}
                                className="flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-3 pl-10 py-7">
                                    <div className="w-[40px] h-[40px] border border-black rounded-full">
                                        <img
                                            className="w-full h-full object-cover rounded-full"
                                            src={currUser?.avatar}
                                            alt="user avatar"
                                        />
                                    </div>
                                    <p>
                                        <span className="block text-[var(--primary-color)]">{currUser?.fullName}</span>
                                        <span className="block lowercase font-medium text-[#808080] text-[1.4rem]">
                                            {currUser?.email}
                                        </span>
                                    </p>
                                </div>
                                <div className="text-[2rem] px-10 cursor-pointer">
                                    {!navUserOpen ? <FaAngleDown /> : <FaAngleUp />}
                                </div>
                            </div>
                        )}
                        <ul className={navUserOpen ? 'block' : 'hidden'}>
                            <li>
                                <Link
                                    href="/account/setting-user-information"
                                    className="flex items-center gap-3 px-6 py-4 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] rounded-lg mx-3 cursor-pointer"
                                >
                                    <div className="flex w-[30px] h-[30px] bg-[#cccccc]/50 rounded-full">
                                        <RiShieldUserFill className="m-auto" />
                                    </div>
                                    <span className="whitespace-nowrap">Xem thông tin cá nhân</span>
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
                    </li>
                    <li>
                        <div
                            onClick={() => setNavJobOpen(!navJobOpen)}
                            className={`flex items-center justify-between hover:text-[var(--primary-color)] border-t border-[#cccccc]/[0.3] ${
                                pathname?.includes('/job') ? 'text-[var(--primary-color)]' : ''
                            }`}
                        >
                            <div className="flex-1 pl-10 py-7 transition-all cursor-pointer">Việc làm</div>
                            <div className="text-[2rem] px-10 cursor-pointer">
                                {!navJobOpen ? <FaAngleDown /> : <FaAngleUp />}
                            </div>
                        </div>
                        <ul className={navJobOpen ? 'block' : 'hidden'}>
                            <li
                                className={`p-3 hover:text-[var(--primary-color)] ${
                                    pathname?.includes('/search-job') ? 'text-[var(--primary-color)]' : ''
                                }`}
                            >
                                <Link
                                    href="/job/search-job"
                                    className="flex items-center gap-5 p-5 bg-[var(--secondary-color)] rounded-lg"
                                >
                                    <IoSearchOutline className="text-[2rem] text-[var(--primary-color)]" />
                                    <span>Tìm việc làm</span>
                                </Link>
                            </li>
                            <li>
                                <hr></hr>
                            </li>
                            <li
                                className={`p-3 hover:text-[var(--primary-color)] ${
                                    pathname?.includes('/applied-job') ? 'text-[var(--primary-color)]' : ''
                                }`}
                            >
                                <Link
                                    href="/job/applied-job"
                                    className="flex items-center gap-5 p-5 bg-[var(--secondary-color)] rounded-lg"
                                >
                                    <BsSuitcaseLg className="text-[2rem] text-[var(--primary-color)]" />
                                    <span>Việc làm đã ứng tuyển</span>
                                    <BsFire className="text-[2rem] text-orange-600" />
                                </Link>
                            </li>
                            <li
                                className={`p-3 hover:text-[var(--primary-color)] ${
                                    pathname?.includes('/saved-job') ? 'text-[var(--primary-color)]' : ''
                                }`}
                            >
                                <Link
                                    href="/job/saved-job"
                                    className="flex items-center gap-5 p-5 bg-[var(--secondary-color)] rounded-lg"
                                >
                                    <IoHeartOutline className="text-[2rem] text-[var(--primary-color)]" />
                                    <span>Việc làm đã lưu</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link
                            href="/gioi-thieu"
                            className="block px-10 py-7 hover:text-[var(--primary-color)] border-t border-[#cccccc]/[0.3] transition-all"
                        >
                            Công ty
                        </Link>
                    </li>
                </ul>
                <div className="absolute top-0 right-0 text-[#cccccc] text-[3rem] p-5 cursor-pointer">
                    <FaXmark />
                </div>
            </div>
            {/* End */}
            {registerOpen && <CheckRoleRegister setRegisterOpen={setRegisterOpen} />}
        </>
    );
};

export default Header;
