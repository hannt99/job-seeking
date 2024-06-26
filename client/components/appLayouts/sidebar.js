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
            <div className="flex justify-center pt-3">
                <div className="w-[160px] h-auto">
                    <img src="../assets/images/logo.png" alt="logo" className="w-full h-full" />
                </div>
            </div>
            <div className="flex-1">
                {pathName?.includes('/employer') ? (
                    <ul className="flex flex-col gap-4 p-5 text-[1.4rem] font-medium text-[#888888]">
                        <li>
                            <Link
                                href={'/employer/dashboard'}
                                className={
                                    pathName === '/employer/dashboard'
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
                                href={'/employer/create-job'}
                                className={
                                    pathName === '/employer/create-job'
                                        ? 'flex items-center gap-5 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                        : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                }
                            >
                                <span className="text-[2.4rem]">
                                    <IoCreateOutline />
                                </span>
                                <span>Thêm việc làm mới</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/employer/manage-jobs'}
                                className={
                                    pathName === '/employer/manage-jobs'
                                        ? 'flex items-center gap-5 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                        : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                }
                            >
                                <span className="text-[2.4rem]">
                                    <CiBoxList />
                                </span>
                                <span>Quản lý công việc</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/employer/all-applicants'}
                                className={
                                    pathName === '/employer/all-applicants'
                                        ? 'flex items-center gap-5 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                        : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                }
                            >
                                <span className="text-[2.4rem]">
                                    <IoPeopleOutline />
                                </span>
                                <span>Tất cả ứng viên</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/employer/recommendation'}
                                className={
                                    pathName === '/employer/recommendation'
                                        ? 'flex items-center gap-5 bg-[var(--secondary-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                        : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--secondary-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                }
                            >
                                <span className="text-[2.4rem]">
                                    <MdOutlineRecommend />
                                </span>
                                <span>Gợi ý ứng viên</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/employer/account/setting'}
                                className={
                                    pathName === '/employer/account/setting'
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
                ) : (
                    <ul className="flex flex-col gap-4 p-5 text-[1.4rem] font-medium text-[#888888]">
                        {/* <li>
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
                        </li> */}
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
                                    <MdOutlineRecommend />
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
                                    <IoPeopleOutline />
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
                )}
            </div>
        </div>
    );
};

export default Sidebar;
