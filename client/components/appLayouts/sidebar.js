'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoCreateOutline } from 'react-icons/io5';
import { AiOutlineHome } from 'react-icons/ai';
import { CiBoxList } from 'react-icons/ci';
import { IoPeopleSharp } from 'react-icons/io5';
import { MdOutlineRecommend, MdOutlineDelete } from 'react-icons/md';

const Sidebar = () => {
    const pathName = usePathname();

    return (
        <div className="flex flex-col w-full h-full shadow-md shadow-current select-none">
            <div className="flex items-center justify-center w-full h-[60px] border-r border-[#f4f5f7]">
                {/* <img src={'/logo_header.png'} alt="logo" className="w-full h-[60px] object-contain" /> */}
                <h1 className="text-center text-[2rem] font-semibold text-[var(--primary-color)]">TimViecNhanh</h1>
            </div>
            <div className="flex-1 shadow-md">
                <ul className="flex flex-col gap-4 p-5 text-[1.4rem] font-medium text-[#888888]">
                    <li>
                        <Link
                            href={'/employer/dashboard'}
                            className={
                                pathName === '/employer/dashboard'
                                    ? 'flex items-center gap-5 bg-[var(--second-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                    : 'flex items-center gap-5 px-5 py-5 rounded-lg hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] transition-all duration-500'
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
                                    ? 'flex items-center gap-5 bg-[var(--second-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                    : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] transition-all duration-500'
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
                                    ? 'flex items-center gap-5 bg-[var(--second-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                    : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                            }
                        >
                            <span className="text-[2.4rem]">
                                <CiBoxList />
                            </span>
                            <span>Quản lý việc làm</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/employer/all-applicants'}
                            className={
                                pathName === '/employer/all-applicants'
                                    ? 'flex items-center gap-5 bg-[var(--second-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                    : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                            }
                        >
                            <span className="text-[2.4rem]">
                                <IoPeopleSharp />
                            </span>
                            <span>Tất cả ứng viên</span>
                        </Link>
                    </li>
                    <li className="pointer-events-none opacity-45">
                        <Link
                            href={'/employer/recommendation'}
                            className={
                                pathName === '/employer/recommendation'
                                    ? 'flex items-center gap-5 bg-[var(--second-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                    : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                            }
                        >
                            <span className="text-[2.4rem]">
                                <MdOutlineRecommend />
                            </span>
                            <span>Gợi ý ứng viên</span>
                        </Link>
                    </li>
                    <li className="pointer-events-none opacity-45">
                        <Link
                            href={'/employer/recommendation'}
                            className={
                                pathName === '/employer/recommendation'
                                    ? 'flex items-center gap-5 bg-[var(--second-color)] text-[var(--primary-color)] rounded-lg px-5 py-5 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                                    : 'flex items-center gap-5 rounded-lg px-5 py-5 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] transition-all duration-500'
                            }
                        >
                            <span className="text-[2.4rem]">
                                <MdOutlineDelete />
                            </span>
                            <span>Xóa tài khoản vĩnh viễn</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
