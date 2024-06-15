'use client';

import { useState } from 'react';
import Link from 'next/link';
import ApplyJobCard from './applyJobCard';
import RightSide from './rightSide';

const JobApply = () => {
    const [filter, setFilter] = useState('');

    return (
        <>
            <div className="w-full flex justify-center px-5 md:px-0">
                <nav
                    className="flex bg-[var(--secondary-color)] px-7 py-5 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] rounded-lg custom-shadow-v1 mt-5"
                    aria-label="Breadcrumb"
                >
                    <ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link
                                href="/"
                                className="inline-flex items-center text-[1.5rem] font-normal text-[var(--primary-color)]"
                            >
                                <svg
                                    className="w-5 h-5 mr-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Trang chủ
                            </Link>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg
                                    className="w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <span className="ml-1 text-[1.5rem] font-normal text-[#808080] md:ml-2">
                                    Việc làm đã ứng tuyển
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-10 lg:gap-x-10 px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] py-14">
                <div className="col-span-4 bg-white p-7 rounded-lg custom-shadow-v1 h-fit">
                    <div className="flex items-center justify-between">
                        <h2>
                            <b>300</b> việc làm đã ứng tuyển
                        </h2>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="block w-[120px] bg-[#f1f1f1] text-[1.4rem] text-[#808080] outline-none border px-8 py-5 rounded-lg"
                        >
                            <option value="">Trạng thái</option>
                            <option value="newest">Đã ứng tuyển</option>
                            <option value="oldest">NTD đã xem hồ sơ</option>
                            <option value="oldest">Hồ sơ phù hợp</option>
                            <option value="oldest">Hồ sơ chưa phù hợp</option>
                        </select>
                    </div>
                    <div className="py-5 space-y-8">
                        <ApplyJobCard
                            jobTitle="Thuc tap sinh IT"
                            jobStatus="Dang  tuyen"
                            jobSalaryRange="Thoa thuan"
                            jobWorkingLocation={[
                                { label: 'Thanh pho Ha Noi' },
                                { label: 'Thanh pho Ha Noi' },
                                { label: 'Thanh pho Ha Noi' },
                            ]}
                            updatedAt="2024-06-12T13:04:50.539+00:00"
                            company="Ngan hang quan doi Vietcombank Ngan hang quan doi Vietcombank Ngan hang quan doi Vietcombank Ngan hang quan doi Vietcombank"
                        />
                        <ApplyJobCard
                            jobTitle="Thuc tap sinh ITThuc tap sinh ITThuc tap sinh ITThuc tap sinh ITThuc tap sinh ITThuc tap sinh ITThuc tap sinh ITThuc tap sinh ITThuc tap sinh IT"
                            jobStatus="Dang  tuyen"
                            jobSalaryRange="Thoa thuan"
                            jobWorkingLocation={[
                                { label: 'Thanh pho Ha Noi' },
                                { label: 'Thanh pho Ha Noi' },
                                { label: 'Thanh pho Ha Noi' },
                            ]}
                            updatedAt="2024-06-12T13:04:50.539+00:00"
                            company="Ngan hang quan doi Vietcombank Ngan hang quan doi Vietcombank Ngan hang quan doi Vietcombank Ngan hang quan doi Vietcombank"
                        />
                    </div>
                </div>
                <div className="col-span-2 space-y-10">
                    <RightSide />
                </div>
            </div>
        </>
    );
};

export default JobApply;
