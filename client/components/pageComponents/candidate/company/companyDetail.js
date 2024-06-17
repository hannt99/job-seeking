'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { FaMap, FaLocationDot, FaEnvelope, FaPhone, FaPeopleGroup } from 'react-icons/fa6';
import { BiSolidCategory } from 'react-icons/bi';
import JobCard from '@/components/common/jobCard';
import Pagination from '@/components/common/pagination';

const CompanyDetail = () => {
    const [company, setCompany] = useState({});
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchCompany = async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/company/get/${searchParams.get('requestId')}`,
            );
            if (res?.data?.code === 200) {
                const res2 = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/job/get-all?page=${page}&limit=5&userId=${res?.data?.company?.userId}`,
                );
                if (res2?.data?.code === 200) {
                    setJobs(res2?.data?.jobs);
                    setPages(res2?.data?.totalPages);
                    setCompany(res?.data?.company);
                    return;
                }
            } else {
                return;
            }
        };
        fetchCompany();
    }, [page]);

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
                                <Link
                                    href="/company/company-list"
                                    className="ml-2 inline-flex items-center text-[1.5rem] font-normal text-[var(--primary-color)]"
                                >
                                    Danh sách công ty
                                </Link>
                            </div>
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
                                    {company?.companyName}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-x-10 px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] py-14">
                <div className="col-span-2 space-y-8">
                    <div className="bg-white rounded-lg custom-shadow-v1">
                        <h1 className="p-7 py-3 text-white text-[2rem] font-semibold bg-gradient-to-r from-[var(--primary-hover-color)] to-green-300 rounded-t-lg">
                            Về chúng tôi
                        </h1>
                        <div
                            className="text-[1.5rem] text-[#808080] p-7"
                            dangerouslySetInnerHTML={{ __html: company?.introduction }}
                        ></div>
                    </div>
                    <div className="space-y-5 bg-white rounded-lg custom-shadow-v1">
                        <h2 className="p-7 py-3 text-white text-[2rem] font-semibold bg-gradient-to-r from-[var(--primary-hover-color)] to-green-300 rounded-t-lg">
                            Việc làm đang tuyển
                        </h2>
                        <div className="space-y-5 p-7">
                            {jobs?.map((j, index) => {
                                return (
                                    <JobCard
                                        key={index}
                                        id={j?._id}
                                        jobTitle={j?.jobTitle}
                                        jobSalaryRange={j?.jobSalaryRange}
                                        jobWorkingLocation={j?.jobWorkingLocation}
                                        updatedAt={j?.updatedAt}
                                        companyId={company?._id}
                                        companyName={company?.companyName}
                                        companyAvatar={company?.avatar}
                                    />
                                );
                            })}
                            <div className="flex justify-center">
                                <Pagination page={page} pages={pages} changePage={setPage} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 space-y-10">
                    <div className="px-7 py-10 custom-shadow-v1 bg-white space-y-10 rounded-lg">
                        <div className="space-y-3">
                            <div className="flex justify-center">
                                <div className="w-[120px] h-[120px]">
                                    <img
                                        src={company?.avatar}
                                        alt="company avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <h2 className="text-center text-[1.8rem] font-medium">{company?.companyName}</h2>
                            <a
                                href={company?.website}
                                className="block text-center text-blue-600 underline font-medium"
                            >
                                Website công ty
                            </a>
                            <div className="flex justify-center">
                                <button className="bg-[#dddddd] font-medium px-20 py-3 rounded-lg">Theo dõi</button>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="space-y-10">
                            <p>
                                <span className="flex items-center gap-3 text-[#808080]">
                                    <FaLocationDot />
                                    <span>Địa chỉ:</span>
                                </span>
                                <span className="block font-medium text-[1.7rem]">
                                    {company?.companyAddress?.district +
                                        ', ' +
                                        company?.companyAddress?.jsonObject?.name}
                                </span>
                            </p>
                            <p>
                                <span className="flex items-center gap-3 text-[#808080]">
                                    <FaPeopleGroup />
                                    <span>Quy mô:</span>
                                </span>
                                <span className="block font-medium text-[1.7rem]">{company?.companySize}</span>
                            </p>
                            <p>
                                <span className="flex items-center gap-3 text-[#808080]">
                                    <FaEnvelope />
                                    <span>Email:</span>
                                </span>
                                <span className="block font-medium text-[1.7rem]">{company?.companyEmail}</span>
                            </p>
                            <p>
                                <span className="flex items-center gap-3 text-[#808080]">
                                    <FaPhone />
                                    <span>Số điện thoại:</span>
                                </span>
                                <span className="block font-medium text-[1.7rem]">{company?.companyPhone}</span>
                            </p>
                            <p>
                                <span className="flex items-center gap-3 text-[#808080]">
                                    <BiSolidCategory />
                                    <span>Ngành:</span>
                                </span>
                                <span className="block font-medium text-[1.7rem]">{company?.companyCareer}</span>
                            </p>
                        </div>
                    </div>
                    <div className="px-7 py-10 custom-shadow-v1 bg-white space-y-7 rounded-lg">
                        <h3 className="flex items-center gap-3">
                            <FaMap className="text-[var(--primary-color)] text-[2rem]" />
                            <span className="font-medium">Xem bản đồ</span>
                        </h3>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.41842091794!2d106.36554998959083!3d10.755292877461148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1718459748065!5m2!1sen!2s"
                            className="w-full h-[300px] md:h-[500px] lg:h-[240px] xl:h-[300px]"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyDetail;
