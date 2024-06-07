'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RiLockPasswordFill, RiLogoutBoxLine, RiArrowDropDownFill } from 'react-icons/ri';
import Link from 'next/link';
import axios from 'axios';
import { success, error } from '@/utils/toastMessage';
import ChangePassword from '../pageComponents/auththentications/changePassword';

const HeaderXSidebar = () => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currUser, setCurrUser] = useState({});

    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.push('/signin');
        return success('Đăng xuất thành công');
    };

    useEffect(() => {
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
    }, []);

    return (
        <>
            <div className="flex items-center justify-between border w-full min-h-[60px]">
                <div></div>
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
                                <Link href="#" className="block px-5 border border-[#cccccc]/30 shadow-md rounded-lg">
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
                            <li
                                onClick={() => setShowChangePassword(true)}
                                className="flex items-center gap-3 px-6 py-4 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] rounded-lg mx-3 cursor-pointer"
                            >
                                <div className="flex w-[30px] h-[30px] bg-[#cccccc]/50 rounded-full">
                                    <RiLockPasswordFill className="m-auto" />
                                </div>
                                <span className="whitespace-nowrap">Thay đối mật khẩu</span>
                            </li>
                            <li
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-6 py-4 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] rounded-lg mx-3 cursor-pointer"
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
            {showChangePassword && <ChangePassword setShowChangePassword={setShowChangePassword} />}
        </>
    );
};

export default HeaderXSidebar;
