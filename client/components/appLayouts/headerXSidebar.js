'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { RiLogoutBoxLine, RiArrowDropDownFill } from 'react-icons/ri';
import axios from 'axios';
import { success, error } from '@/utils/toastMessage';
import { UserAvatarContext } from './defaultLayout';

const HeaderXSidebar = () => {
    const [currUser, setCurrUser] = useState({});

    const router = useRouter();
    const { isChangeUserAvatar } = useContext(UserAvatarContext);

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

    return (
        <>
            <div className="flex items-center justify-between border w-full min-h-[60px] bg-white">
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
                    <div className="absolute top-[100%] right-0 w-[70px] h-5"></div>
                    <div className="group-hover:block hidden absolute top-[100%] right-0 w-[200px] rounded-lg mt-5 transition-all cursor-default z-[999]">
                        <div
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-6 py-4 bg-white border rounded-lg cursor-pointer shadow-lg"
                        >
                            <div className="flex w-[30px] h-[30px] bg-[#cccccc]/50 rounded-full">
                                <RiLogoutBoxLine className="m-auto" />
                            </div>
                            <span className="whitespace-nowrap">Đăng xuất</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderXSidebar;
