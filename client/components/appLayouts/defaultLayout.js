'use client';

import { useState, useEffect, createContext } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/appLayouts/header';
import HeaderXSidebar from './headerXSidebar';
import Footer from '@/components/appLayouts/footer';
import Sidebar from './sidebar';
import { FaBars } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

export const UserAvatarContext = createContext();

const DefaultLayout = ({ main }) => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isChangeUserAvatar, setIsChangeUserAvatar] = useState(false);

    const pathname = usePathname();

    const toggle = () => {
        setToggleSidebar(!toggleSidebar);
    };

    const checkPathname = () => {
        if (pathname?.includes('/signin')) {
            return true;
        } else if (pathname?.includes('/register')) {
            return true;
        } else if (pathname?.includes('/forgot-password')) {
            return true;
        } else if (pathname?.includes('/reset-password')) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return <div className="h-screen"></div>;

    return (
        <UserAvatarContext.Provider value={{ isChangeUserAvatar, setIsChangeUserAvatar }}>
            {checkPathname() ? (
                <div className="relative flex w-full h-screen overflow-auto bg-multiply">
                    <div className="py-5 m-auto">{main}</div>
                    <div className="fixed top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-[#161c2d]/5 to-[#161c2d]/100"></div>
                </div>
            ) : pathname?.includes('/employer') ? (
                <>
                    <div
                        className={
                            toggleSidebar
                                ? 'fixed top-0 left-0 bottom-0 translate-x-0 lg:translate-x-0 w-full md:w-[260px] bg-white z-50 transition-all'
                                : 'fixed top-0 left-0 bottom-0 translate-x-[-100%] lg:translate-x-0 w-full md:w-[260px] bg-white z-50 transition-all'
                        }
                    >
                        <Sidebar />
                        <div
                            onClick={() => setToggleSidebar(false)}
                            className="absolute top-0 right-0 w-[42px] h-[42px] flex lg:hidden items-center justify-center text-[24px] cursor-pointer"
                        >
                            <FaXmark />
                        </div>
                    </div>
                    <div className="fixed top-0 left-0 lg:left-[260px] right-0 h-[60px] z-40 lg:z-50">
                        <HeaderXSidebar />
                        <div
                            onClick={toggle}
                            className="absolute top-[50%] translate-y-[-50%] left-[12px] w-[42px] h-[42px] flex lg:hidden items-center justify-center text-[18px] cursor-pointer"
                        >
                            <FaBars />
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 pl-0 lg:pl-[260px] pt-[60px] w-full h-full bg-[#f4f6fb]">
                        {main}
                    </div>
                </>
            ) : (
                <div className="flex flex-col h-screen">
                    <div className="flex justify-center">
                        <Header />
                    </div>
                    <div className="flex flex-col flex-1 items-center bg-[#f4f6fb]">{main}</div>
                    <div className="flex justify-center">
                        <Footer />
                    </div>
                </div>
            )}
        </UserAvatarContext.Provider>
    );
};

export default DefaultLayout;
