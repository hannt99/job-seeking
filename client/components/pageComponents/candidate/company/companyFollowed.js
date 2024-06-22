'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import RightSide from '../job/rightSide';
import CompanyCard from '@/components/common/companyCard';
import Pagination from '@/components/common/pagination';

const CompanyFollowed = () => {
    const [allFollowedCompanies, setAllFollowedCompanies] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [reRender, setReRender] = useState(false);

    useEffect(() => {
        const fetchFollowedCompany = async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/company/get-all-followed-company?page=${page}&limit=10`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                },
            );
            if (res?.data?.code === 200) {
                setPages(res?.data?.totalPages);
                return setAllFollowedCompanies(res?.data?.companies);
            } else {
                return;
            }
        };
        fetchFollowedCompany();
    }, [page, reRender]);

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
                                    Công ty đã theo dõi
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
                            <b>{allFollowedCompanies?.length}</b> công ty đã theo dõi
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-5">
                        {allFollowedCompanies?.length === 0 ? (
                            <p className="text-center">Chưa theo dõi công ty nào</p>
                        ) : (
                            allFollowedCompanies?.map((ac, index) => {
                                return (
                                    <CompanyCard
                                        key={index}
                                        id={ac?._id}
                                        companyAvatar={ac?.avatar}
                                        companyName={ac?.companyName}
                                        companyAddress={ac?.companyAddress?.jsonObject?.name}
                                        isFollowBtn={true}
                                        setReRender={() => setReRender(!reRender)}
                                    />
                                );
                            })
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Pagination page={page} pages={pages} changePage={setPage} />
                    </div>
                </div>
                <div className="col-span-2 space-y-10">
                    <RightSide />
                </div>
            </div>
        </>
    );
};

export default CompanyFollowed;
