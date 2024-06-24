'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoCreateOutline, IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineHome } from 'react-icons/ai';
import { CiBoxList } from 'react-icons/ci';
import { IoPeopleOutline } from 'react-icons/io5';
import { MdOutlineRecommend } from 'react-icons/md';

const Sidebar = () => {
    const pathName = usePathname();

    return (
        <div className="flex flex-col w-full h-full custom-shadow-v1 select-none">
            <div className="flex items-center justify-center w-full h-[60px] border-r border-[#f4f5f7]">
                {/* <img src={'/logo_header.png'} alt="logo" className="w-full h-[60px] object-contain" /> */}
                <h1 className="text-center text-[2rem] font-semibold text-[var(--primary-color)]">TimViecNhanh</h1>
            </div>
            <div className="flex-1">
                <ul className="flex flex-col gap-4 p-5 text-[1.4rem] font-medium text-[#888888]">
                    <li>
                        <Link
                            href={'/admin/dashboard'}
                            className={
                                pathName === '/admin/dashboard'
                                    ? 'flex items-center gap-5 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                    : 'flex items-center gap-5 px-5 py-5 rounded-lg hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                            }
                        >
                            <span className="text-[2.4rem]">
                                <AiOutlineHome />
                            </span>
                            <span>Bảng tin</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/admin/position-manage'}
                            className={
                                pathName === '/admin/position-manage'
                                    ? 'flex items-center gap-5 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                    : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                            }
                        >
                            <span className="text-[2.4rem]">
                                <IoCreateOutline />
                            </span>
                            <span>Quản lý vị trí tuyển dụng</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/admin/category-manage'}
                            className={
                                pathName === '/admin/category-manage'
                                    ? 'flex items-center gap-5 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                    : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                            }
                        >
                            <span className="text-[2.4rem]">
                                <CiBoxList />
                            </span>
                            <span>Quản lý ngành nghề</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/admin/skill-manage'}
                            className={
                                pathName === '/admin/skill-manage'
                                    ? 'flex items-center gap-5 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                    : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                            }
                        >
                            <span className="text-[2.4rem]">
                                <IoPeopleOutline />
                            </span>
                            <span>Quản lý kỹ năng</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/admin/user-manage'}
                            className={
                                pathName === '/admin/user-manage'
                                    ? 'flex items-center gap-5 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                    : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                            }
                        >
                            <span className="text-[2.4rem]">
                                <MdOutlineRecommend />
                            </span>
                            <span>Quản lý người dùng</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/admin/account/setting'}
                            className={
                                pathName === '/admin/account/setting'
                                    ? 'flex items-center gap-5 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                    : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                            }
                        >
                            <span className="text-[2.4rem]">
                                <IoSettingsOutline />
                            </span>
                            <span>Cài đặt tài khoản</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
