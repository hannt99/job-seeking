'use client';

import Link from 'next/link';
import { FaMap, FaLocationDot, FaEnvelope, FaPhone, FaPeopleGroup } from 'react-icons/fa6';
import { BiSolidCategory } from 'react-icons/bi';
import JobCard from '@/components/common/jobCard';

const CompanyDetail = () => {
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
                                    Công ty VNG
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
                        <p className="text-[1.5rem] text-[#808080] p-7 space-y-5">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Mauris vitae ultricies leo integer
                                malesuada nunc vel risus commodo. Vulputate odio ut enim blandit. Nibh ipsum consequat
                                nisl vel pretium lectus quam.
                            </p>
                            <p>
                                Nulla at volutpat diam ut. Lobortis feugiat vivamus at augue eget arcu. Urna condimentum
                                mattis pellentesque id nibh tortor id aliquet. Dignissim cras tincidunt lobortis
                                feugiat. Est sit amet facilisis magna etiam tempor. Eu augue ut lectus arcu bibendum at
                                varius vel pharetra. Vel facilisis volutpat est velit egestas dui id. Ut pharetra sit
                                amet aliquam. Elit at imperdiet dui accumsan sit amet nulla facilisi morbi. Tellus in
                                metus vulputate eu scelerisque felis imperdiet proin. Magna fringilla urna porttitor
                                rhoncus. Et odio pellentesque diam volutpat. Congue eu consequat ac felis donec et odio
                                pellentesque diam. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu.
                            </p>
                        </p>
                    </div>
                    <div className="space-y-5 bg-white rounded-lg custom-shadow-v1">
                        <h2 className="p-7 py-3 text-white text-[2rem] font-semibold bg-gradient-to-r from-[var(--primary-hover-color)] to-green-300 rounded-t-lg">
                            Việc làm đang tuyển
                        </h2>
                        <div className="space-y-5 p-7">
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
                <div className="col-span-1 space-y-10">
                    <div className="px-7 py-10 custom-shadow-v1 bg-white space-y-10 rounded-lg">
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
                                <span className="block font-medium text-[1.7rem]">Quận 5, Thành phố Hồ Chí Minh</span>
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
