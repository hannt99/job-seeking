'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IoSearchOutline } from 'react-icons/io5';
import axios from 'axios';
import CompanyCard from '@/components/common/companyCard';
import useDebounce from '@/hooks/useDebounce';
import Pagination from '@/components/common/pagination';

const CompanyList = () => {
    const [searchValue, setSearchValue] = useState('');
    const [allCompanies, setAllCompanies] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const debouncedValue = useDebounce(searchValue, 300);

    useEffect(() => {
        const fetchCompany = async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/company/get-all?page=${page}&limit=12&search=${debouncedValue}`,
            );
            if (res?.data?.code === 200) {
                const res2 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job/get-all`);
                if (res2?.data?.code === 200) {
                    setAllJobs(res2?.data?.jobs);
                    setAllCompanies(res?.data?.companies);
                    setPages(res?.data?.totalPages);
                    return;
                }
            } else {
                return;
            }
        };
        fetchCompany();
    }, [page, debouncedValue]);

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
                                    Danh sách công ty
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] py-14 space-y-10">
                <div className="relative">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Nhập tên công ty"
                        className="block w-full text-[1.5rem] outline-[var(--primary-color)] border pl-20 pr-5 py-3 rounded-lg"
                    />
                    <IoSearchOutline className="absolute top-[50%] translate-y-[-50%] left-[18px] text-[2.2rem]" />
                </div>
                <h1 className="text-center text-[3rem] font-semibold">DANH SÁCH CÁC CÔNG TY</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
                    {allCompanies?.map((ac, index) => {
                        const jobs = allJobs
                            ?.filter((aj) => aj?.userId === ac?.userId)
                            ?.filter((aj) => aj?.jobStatus === 'Đang tuyển');
                        return (
                            <CompanyCard
                                key={index}
                                id={ac?._id}
                                companyAvatar={ac?.avatar}
                                companyName={ac?.companyName}
                                companyAddress={ac?.companyAddress?.jsonObject?.name}
                                allOpenJobs={jobs?.length}
                            />
                        );
                    })}
                </div>
                <div className="flex justify-center">
                    <Pagination page={page} pages={pages} changePage={setPage} />
                </div>
            </div>
        </>
    );
};

export default CompanyList;
