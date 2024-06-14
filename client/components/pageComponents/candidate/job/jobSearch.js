'use client';

import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import Link from 'next/link';

const JobSearch = () => {
    const [jobKeyword, setJobKeyword] = useState('');

    return (
        <div className="w-full">
            <div className="text-center space-y-3 py-16">
                <h1 className="text-[2.4rem] font-semibold tracking-wider">TÌM VIỆC LÀM</h1>
                <div className="flex items-center justify-center text-[1.4rem]">
                    <Link href="/" className="font-medium hover:text-[var(--primary-color)]">
                        Trang chủ
                    </Link>
                    <svg
                        className="flex-shrink-0 size-7 text-gray-400 mx-1"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path d="M6 13L10 3" stroke="currentColor" strokeLinecap="round"></path>
                    </svg>
                    <span>Việc làm</span>
                </div>
            </div>
            <div className="flex justify-center w-full bg-white">
                <div className="grid grid-cols-5 gap-8 px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] py-20">
                    <div className="col-span-2 bg-[#f4f6fb] rounded-lg p-10">
                        <div className="space-y-4">
                            <label className="font-semibold text-[1.5rem]">Tìm kiếm bằng từ khóa</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={jobKeyword}
                                    onChange={(e) => setJobKeyword(e.target.value)}
                                    placeholder="Tên việc làm hoặc công ty"
                                    className="block w-full text-[1.5rem] outline-none border pl-20 pr-8 py-5 rounded-lg"
                                />
                                <IoSearchOutline className="absolute top-[50%] translate-y-[-50%] left-[18px] text-[2.2rem]" />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3">List</div>
                </div>
            </div>
        </div>
    );
};

export default JobSearch;
