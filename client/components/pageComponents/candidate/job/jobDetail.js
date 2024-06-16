'use client';

import { AiOutlineDollar } from 'react-icons/ai';
import { LuClock4 } from 'react-icons/lu';
import { IoLocationOutline, IoBookmarkOutline } from 'react-icons/io5';
import { BiSolidCategory } from 'react-icons/bi';
import { BsSuitcaseLg } from 'react-icons/bs';
import { CgTimelapse } from 'react-icons/cg';
import { FaRegCalendarTimes } from 'react-icons/fa';
import { FaMap, FaLocationDot, FaEnvelope, FaPhone, FaPeopleGroup } from 'react-icons/fa6';
import JobCard from '@/components/common/jobCard';
import Link from 'next/link';

const JobDetail = () => {
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
                                    href="/job/search-job"
                                    className="ml-2 inline-flex items-center text-[1.5rem] font-normal text-[var(--primary-color)]"
                                >
                                    Tìm việc làm
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
                                    Thực tập sinh IT
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] py-14">
                <div className="flex items-center gap-7">
                    <div className="w-[100px] h-[100px] border border-black">
                        <img src="" alt="company avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-5">
                        <h1 className="text-[2.6rem] font-semibold">Thuc tap sinh IT</h1>
                        <ul className="flex items-center gap-7 text-[1.4rem] text-[#808080]">
                            <li className="flex items-center gap-2">
                                <BsSuitcaseLg className="text-[2rem]" />
                                <span>Kinh doanh / Ban hang</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <IoLocationOutline className="text-[2rem]" />
                                <span>Thanh pho Ho Chi Minh</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <LuClock4 className="text-[2rem]" />
                                <span>11 giom truoc</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <AiOutlineDollar className="text-[2rem]" />
                                <span>5 - 10 trieu</span>
                            </li>
                        </ul>
                        <ul className="flex items-center gap-3 text-[1.3rem] font-medium text-[#808080]">
                            <li className="bg-[#d5e3f6] text-blue-700 px-7 py-1 rounded-full uppercase">Full time</li>
                            <li className="bg-[#d9ede3] text-[var(--primary-color)] px-7 py-1 rounded-full uppercase">
                                Dang tuyen
                            </li>
                        </ul>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="flex justify-center w-full h-full bg-white py-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-x-10 px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px]">
                    <div className="col-span-2 order-2 md:order-1">
                        <div className="text-[1.5rem]">
                            As a Product Designer, you will work within a Product Delivery Team fused with UX,
                            engineering, product and data talent. You will help the team design beautiful interfaces
                            that solve business challenges for our clients. We work with a number of Tier 1 banks on
                            building web-based applications for AML, KYC and Sanctions List management workflows. This
                            role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.
                            As a Product Designer, you will work within a Product Delivery Team fused with UX,
                            engineering, product and data talent. You will help the team design beautiful interfaces
                            that solve business challenges for our clients. We work with a number of Tier 1 banks on
                            building web-based applications for AML, KYC and Sanctions List management workflows. This
                            role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.
                            As a Product Designer, you will work within a Product Delivery Team fused with UX,
                            engineering, product and data talent. You will help the team design beautiful interfaces
                            that solve business challenges for our clients. We work with a number of Tier 1 banks on
                            building web-based applications for AML, KYC and Sanctions List management workflows. This
                            role is ideal if you are looking to segue your career into the FinTech or Big Data arenas.
                        </div>
                        <div className="space-y-5 mt-14">
                            <h2 className="text-[2.4rem] font-semibold">Việc làm liên quan</h2>
                            <div className="space-y-5">
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
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 order-1 md:order-2 space-y-10">
                        <div className="flex items-stretch gap-4">
                            <button className="flex-1 text-white font-medium bg-[var(--primary-color)] py-4 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all">
                                Ứng tuyển
                            </button>
                            <button className="text-[2.4rem] text-[var(--primary-color)] bg-[var(--secondary-color)] p-4 rounded-lg hover:bg-[var(--primary-color)] hover:text-white transition-all">
                                <IoBookmarkOutline />
                            </button>
                        </div>
                        <div className="bg-[#f4f6fb] p-10 space-y-20 rounded-lg">
                            <div className="space-y-10">
                                <h2 className="font-medium text-[1.8rem]">Thông tin chung</h2>
                                <div className="flex items-start gap-7">
                                    <LuClock4 className="text-[2.6rem] text-[var(--primary-color)]" />
                                    <p>
                                        <span className="block font-medium">Đã đăng</span>
                                        <span className="block text-[1.5rem]">1 gio truoc</span>
                                    </p>
                                </div>
                                <div className="flex items-start gap-7">
                                    <FaRegCalendarTimes className="text-[2.6rem] text-[var(--primary-color)]" />
                                    <p>
                                        <span className="block font-medium">Hết hạn</span>
                                        <span className="block text-[1.5rem]">12/07/2024</span>
                                    </p>
                                </div>
                                <div className="flex items-start gap-7">
                                    <IoLocationOutline className="text-[2.6rem] text-[var(--primary-color)]" />
                                    <p>
                                        <span className="block font-medium">Địa điểm</span>
                                        <span className="block text-[1.5rem]">Thành phố Hồ Chí Minh</span>
                                    </p>
                                </div>
                                <div className="flex items-start gap-7">
                                    <BsSuitcaseLg className="text-[2.6rem] text-[var(--primary-color)]" />
                                    <p>
                                        <span className="block font-medium">Ngành nghề</span>
                                        <span className="block text-[1.5rem]">Kinh doanh / Bán hàng</span>
                                    </p>
                                </div>
                                <div className="flex items-start gap-7">
                                    <BiSolidCategory className="text-[2.6rem] text-[var(--primary-color)]" />
                                    <p>
                                        <span className="block font-medium">Hình thức</span>
                                        <span className="block text-[1.5rem]">Full time</span>
                                    </p>
                                </div>
                                <div className="flex items-start gap-7">
                                    <CgTimelapse className="text-[2.6rem] text-[var(--primary-color)]" />
                                    <p>
                                        <span className="block font-medium">Kinh nghiệm</span>
                                        <span className="block text-[1.5rem]">2 năm</span>
                                    </p>
                                </div>
                                <div className="flex items-start gap-7">
                                    <AiOutlineDollar className="text-[2.6rem] text-[var(--primary-color)]" />
                                    <p>
                                        <span className="block font-medium">Mức lương</span>
                                        <span className="block text-[1.5rem]">10 - 15 trieu</span>
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-10">
                                <h2 className="font-medium text-[1.8rem]">Vị trí</h2>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.41842091794!2d106.36554998959083!3d10.755292877461148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1718459748065!5m2!1sen!2s"
                                    className="w-full h-[300px] md:h-[500px] lg:h-[240px] xl:h-[300px]"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                            <div className="space-y-10">
                                <h2 className="font-medium text-[1.8rem]">Kỹ năng</h2>
                                <ul className="flex items-center flex-wrap gap-3 text-[1.4rem]">
                                    <li className="bg-white px-3 py-1 rounded-md shadow-md">HTML/CSS</li>
                                    <li className="bg-white px-3 py-1 rounded-md shadow-md">Javascript</li>
                                    <li className="bg-white px-3 py-1 rounded-md shadow-md">React</li>
                                    <li className="bg-white px-3 py-1 rounded-md shadow-md">HTML/CSS</li>
                                    <li className="bg-white px-3 py-1 rounded-md shadow-md">Javascript</li>
                                    <li className="bg-white px-3 py-1 rounded-md shadow-md">React</li>
                                    <li className="bg-white px-3 py-1 rounded-md shadow-md">HTML/CSS</li>
                                    <li className="bg-white px-3 py-1 rounded-md shadow-md">Javascript</li>
                                    <li className="bg-white px-3 py-1 rounded-md shadow-md">React</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-[#f4f6fb] p-10 space-y-14 rounded-lg">
                            <div className="space-y-3">
                                <div className="flex justify-center">
                                    <div className="w-[120px] h-[120px] border border-black">
                                        <img src="" alt="company avatar" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <h2 className="text-center text-[1.8rem] font-medium">Công ty TNHH ABCDE</h2>
                                <a
                                    href="https://www.google.com"
                                    className="block text-center text-blue-600 underline font-medium"
                                >
                                    Website công ty
                                </a>
                            </div>
                            <hr></hr>
                            <div className="space-y-10">
                                <p>
                                    <span className="flex items-center gap-3 text-[#808080]">
                                        <FaLocationDot />
                                        <span>Địa chỉ:</span>
                                    </span>
                                    <span className="block font-medium text-[1.7rem]">
                                        Quận 5, Thành phố Hồ Chí Minh
                                    </span>
                                </p>
                                <p>
                                    <span className="flex items-center gap-3 text-[#808080]">
                                        <FaPeopleGroup />
                                        <span>Quy mô:</span>
                                    </span>
                                    <span className="block font-medium text-[1.7rem]">1-99 nhân viên</span>
                                </p>
                                <p>
                                    <span className="flex items-center gap-3 text-[#808080]">
                                        <FaEnvelope />
                                        <span>Email:</span>
                                    </span>
                                    <span className="block font-medium text-[1.7rem]">name@example.com</span>
                                </p>
                                <p>
                                    <span className="flex items-center gap-3 text-[#808080]">
                                        <FaPhone />
                                        <span>Số điện thoại:</span>
                                    </span>
                                    <span className="block font-medium text-[1.7rem]">0123456789</span>
                                </p>
                                <p>
                                    <span className="flex items-center gap-3 text-[#808080]">
                                        <BiSolidCategory />
                                        <span>Ngành:</span>
                                    </span>
                                    <span className="block font-medium text-[1.7rem]">Kinh doanh / Bán hàng</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobDetail;
