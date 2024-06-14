'use client';

import { useState, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { CiLocationOn } from 'react-icons/ci';
import { BsSuitcaseLg } from 'react-icons/bs';
import Link from 'next/link';
import axios from 'axios';
import JobCard from '@/components/common/jobCard';

const careers = [
    { value: '', label: 'Tất cả ngành nghề' },
    { value: 'Kinh doanh/Bán hàng', label: 'Kinh doanh/Bán hàng' },
    { value: 'Biên/Phiên dịch', label: 'Biên / Phiên dịch' },
    { value: 'Bảo hiểm', label: 'Bảo hiểm' },
];

const JobSearch = () => {
    const [jobKeyword, setJobKeyword] = useState('');
    const [jobWorkingLocation, setJobWorkingLocation] = useState('');
    const [jobCareer, setJobCareer] = useState('');
    const [jobType, setJobType] = useState('');
    const [jobExp, setJobExp] = useState('');
    const [jobSalaryRange, setJobSalaryRange] = useState('');
    const [sort, setSort] = useState('');
    const [allJobWorkingLocation, setAllJobWorkingLocation] = useState([]);

    const jobTypes = ['Freelancer', 'Part time', 'Full time', 'Thời vụ'];
    const exps = ['Chưa có kinh nghiệm', 'Dưới 1 năm', '1 năm', '2 năm', '3 năm', '4 năm', '5 năm', 'Trên 5 năm'];

    const salaryRanges = [
        'Dưới 10 triệu',
        '15 - 20 triệu',
        '20 - 25 triệu',
        '25 - 30 triệu',
        '30 - 50 triệu',
        'Trên 50 triệu',
        'Thỏa thuận',
    ];

    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
            setAllJobWorkingLocation(res?.data?.data);
        };
        fetchProvinces();
    }, []);

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
                <div className="grid grid-cols-3 gap-8 px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] py-20">
                    <div className="col-span-1 space-y-8">
                        <div className="bg-[#f4f6fb] rounded-3xl p-10 space-y-10">
                            <div className="space-y-4">
                                <label className="font-semibold text-[1.8rem]">Từ khóa</label>
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
                            <div className="space-y-4">
                                <label className="font-semibold text-[1.8rem]">Địa điểm làm việc</label>
                                <div className="relative">
                                    <select
                                        value={jobWorkingLocation}
                                        onChange={(e) => setJobWorkingLocation(e.target.value)}
                                        className="block w-full text-[1.5rem] outline-none border pl-20 pr-8 py-5 bg-white rounded-lg"
                                    >
                                        <option value="">Tất cả tỉnh/thành phố</option>
                                        {allJobWorkingLocation?.map((p, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={JSON.stringify({ id: p?.id, name: p?.full_name })}
                                                >
                                                    {p?.full_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <CiLocationOn className="absolute top-[50%] translate-y-[-50%] left-[18px] text-[2.2rem]" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="font-semibold text-[1.8rem]">Ngành nghề</label>
                                <div className="relative">
                                    <select
                                        value={jobCareer}
                                        onChange={(e) => setJobCareer(e.target.value)}
                                        className="block w-full text-[1.5rem] outline-none border pl-20 pr-8 py-5 bg-white rounded-lg"
                                    >
                                        {careers?.map((c, index) => {
                                            return (
                                                <option key={index} value={c?.value}>
                                                    {c?.label}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <BsSuitcaseLg className="absolute top-[50%] translate-y-[-50%] left-[18px] text-[2.2rem]" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="font-semibold text-[1.8rem]">Hình thức</label>
                                {jobTypes?.map((jt, index) => {
                                    return (
                                        <div key={index} className="flex item gap-3">
                                            <input
                                                type="radio"
                                                checked={jobType === jt}
                                                onChange={() => setJobType(jt)}
                                            />
                                            <label
                                                className={`text-[1.5rem] ${
                                                    jobType === jt ? 'text-black' : 'text-[#808080]'
                                                }`}
                                            >
                                                {jt}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="space-y-4">
                                <label className="font-semibold text-[1.8rem]">Kinh nghiệm</label>
                                {exps?.map((ex, index) => {
                                    return (
                                        <div key={index} className="flex item gap-3">
                                            <input
                                                type="radio"
                                                checked={jobExp === ex}
                                                onChange={() => setJobExp(ex)}
                                            />
                                            <label
                                                className={`text-[1.5rem] ${
                                                    jobExp === ex ? 'text-black' : 'text-[#808080]'
                                                }`}
                                            >
                                                {ex}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="space-y-4">
                                <label className="font-semibold text-[1.8rem]">Mức lương</label>
                                {salaryRanges?.map((sr, index) => {
                                    return (
                                        <div key={index} className="flex item gap-3">
                                            <input
                                                type="radio"
                                                checked={jobSalaryRange === sr}
                                                onChange={() => setJobSalaryRange(sr)}
                                            />
                                            <label
                                                className={`text-[1.5rem] ${
                                                    jobSalaryRange === sr ? 'text-black' : 'text-[#808080]'
                                                }`}
                                            >
                                                {sr}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="block w-full font-medium text-center bg-[var(--primary-color)] text-white py-3 rounded-lg hover:bg-[var(--primary-hover-color)]">
                                    Áp dụng
                                </button>
                                <button className="block w-full font-medium text-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700">
                                    Xóa bộ lọc
                                </button>
                            </div>
                        </div>
                        <div className="hidden xl:grid grid-cols-3 bg-[#f4f6fb] rounded-3xl">
                            <div className="col-span-2 p-10 space-y-7">
                                <h2 className="text-[1.8rem] font-semibold">Bạn là nhà tuyển dụng?</h2>
                                <p className="text-[1.4rem] text-[#808080]">
                                    Bạn đang muốn tìm kiếm nhân sự giỏi cho công ty? Hãy đăng ký ngay!
                                </p>
                                <Link
                                    href="#"
                                    className="block font-medium text-center bg-[var(--primary-color)] text-white w-fit px-16 py-5 rounded-lg hover:bg-[var(--primary-hover-color)]"
                                >
                                    Đăng ký ngay
                                </Link>
                            </div>
                            <div className="w-full h-full bg-ads"></div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="flex justify-end mb-14">
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="block w-1/6 bg-[#f4f6fb] text-[1.4rem] text-[#808080] outline-none border px-8 py-5 rounded-lg"
                            >
                                <option value="">Mặc định</option>
                                <option value="newest">Mới nhất</option>
                                <option value="oldest">Cũ nhất</option>
                            </select>
                        </div>
                        <div className="space-y-8">
                            <JobCard
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
                            <JobCard
                                jobTitle="Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT"
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
                            <JobCard
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
                            <JobCard
                                jobTitle="Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT"
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
                            <JobCard
                                jobTitle="Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT"
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
                            <JobCard
                                jobTitle="Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT"
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
                            <JobCard
                                jobTitle="Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT"
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
                            <JobCard
                                jobTitle="Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT"
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
                            <JobCard
                                jobTitle="Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT"
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
                            <JobCard
                                jobTitle="Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT"
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
                </div>
            </div>
        </div>
    );
};

export default JobSearch;
