'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSearchOutline } from 'react-icons/io5';
import { CiLocationOn, CiViewList, CiDesktop } from 'react-icons/ci';
import { LiaPencilRulerSolid, LiaHandPointer } from 'react-icons/lia';
import { FaFileUpload } from 'react-icons/fa';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CompanyCard from '@/components/common/companyCard';
import JobCard from '@/components/common/jobCard';
import Link from 'next/link';

export default function Home() {
    const [jobPosition, setJobPosition] = useState('');
    const [allProvinces, setAllProvinces] = useState([]);
    const [province, setProvince] = useState('');

    useEffect(() => {
        Aos.init({ duration: 1200 });
    }, []);

    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
            setAllProvinces(res?.data?.data);
        };
        fetchProvinces();
    }, []);

    return (
        <>
            <div className="relative bg-[#f8ede8] h-screen lg:h-fit xl:h-screen w-full md:py-0 lg:py-36 xl:py-0 grid grid-cols-3">
                <div></div>
                <div className="hidden lg:block w-auto h-full col-span-2 animate-fadeInFromR overflow-hidden">
                    <img
                        src="../assets/images/home-bg.webp"
                        alt="home bg"
                        className="w-full h-full object-contain translate-x-24"
                    />
                </div>
                <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
                    <div className="px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px]">
                        <div className="w-full lg:w-[55%] animate-fadeInFromB">
                            <h1 className="text-[2.4rem] md:text-[4.5rem] font-semibold tracking-wide">
                                Join us & Explore Thousands of Jobs
                            </h1>
                            <p className="text-[1.4rem] text-[#808080] mt-2">
                                Find Jobs, Employment & Career Opportunities
                            </p>
                            <div className="grid grid-cols-1 gap-y-3 md:grid-cols-5 bg-white border p-5 mt-16 rounded-lg">
                                <div className="relative md:border-r col-span-2">
                                    <input
                                        type="text"
                                        value={jobPosition}
                                        onChange={(e) => setJobPosition(e.target.value)}
                                        placeholder="Vị trí tuyển dụng"
                                        className={`block w-full outline-none text-[1.5rem] pl-5 pr-16 py-5 rounded-lg`}
                                    />
                                    <IoSearchOutline className="absolute top-[50%] translate-y-[-50%] right-0 text-[2rem] mr-5" />
                                </div>
                                <div className="relative md:border-l col-span-2">
                                    <select
                                        value={province}
                                        onChange={(e) => setProvince(e.target.value)}
                                        className={`block w-full text-[1.5rem] bg-white outline-none px-5 py-5 rounded-lg`}
                                    >
                                        <option value="">-- Tỉnh/Thành phố --</option>
                                        {allProvinces?.map((p, index) => {
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
                                    <CiLocationOn className="absolute top-[50%] translate-y-[-50%] right-0 text-[2rem] mr-5 bg-white" />
                                </div>
                                <button className="bg-[var(--primary-color)] text-white py-5 rounded-lg">
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center bg-white">
                <div className="px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] py-20">
                    <h2 className="flex items-center gap-6 w-full">
                        <span className="block flex-1 h-[2px] bg-[#f71616] opacity-30"></span>
                        <span className="text-[2rem] md:text-[2.4rem] tracking-wider font-semibold">
                            CÁC CÔNG TY HÀNG ĐẦU
                        </span>
                        <span className="block flex-1 h-[2px] bg-[#f71616] opacity-30"></span>
                    </h2>
                    <div className="mt-10" data-aos="fade-up">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            navigation={true}
                            pagination={{
                                dynamicBullets: true,
                                clickable: true,
                            }}
                            rewind={true}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                            }}
                            modules={[Navigation, Pagination]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <CompanyCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CompanyCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CompanyCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CompanyCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <CompanyCard />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className="px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] py-20">
                <h2 className="flex items-center gap-6 w-full">
                    <span className="block flex-1 h-[2px] bg-[#f71616] opacity-30"></span>
                    <span className="text-[2rem] md:text-[2.4rem] tracking-wider font-semibold">VIỆC LÀM NỔI BẬT</span>
                    <span className="block flex-1 h-[2px] bg-[#f71616] opacity-30"></span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10" data-aos="fade-up">
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
                        jobWorkingLocation={[{ label: 'Thanh pho Ha Noi' }]}
                        updatedAt="2024-06-12T13:04:50.539+00:00"
                        company="Ngan hang quan doi Vietcombank"
                    />
                    <JobCard
                        jobTitle="Thuc tap sinh IT"
                        jobStatus="Dang  tuyen"
                        jobSalaryRange="Thoa thuan"
                        jobWorkingLocation={[{ label: 'Thanh pho Ha Noi' }]}
                        updatedAt="2024-06-12T13:04:50.539+00:00"
                        company="Ngan hang quan doi Vietcombank"
                    />
                    <JobCard
                        jobTitle="Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT Thuc tap sinh IT"
                        jobStatus="Dang  tuyen"
                        jobSalaryRange="Thoa thuan"
                        jobWorkingLocation={[{ label: 'Thanh pho Ha Noi' }]}
                        updatedAt="2024-06-12T13:04:50.539+00:00"
                        company="Ngan hang quan doi Vietcombank"
                    />
                    <JobCard
                        jobTitle="Thuc tap sinh IT"
                        jobStatus="Dang  tuyen"
                        jobSalaryRange="Thoa thuan"
                        jobWorkingLocation={[{ label: 'Thanh pho Ha Noi' }]}
                        updatedAt="2024-06-12T13:04:50.539+00:00"
                        company="Ngan hang quan doi Vietcombank"
                    />
                    <JobCard
                        jobTitle="Thuc tap sinh IT"
                        jobStatus="Dang  tuyen"
                        jobSalaryRange="Thoa thuan"
                        jobWorkingLocation={[{ label: 'Thanh pho Ha Noi' }]}
                        updatedAt="2024-06-12T13:04:50.539+00:00"
                        company="Ngan hang quan doi Vietcombank"
                    />
                </div>
            </div>
            <div className="flex justify-center w-full bg-white">
                <div className="px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] py-20">
                    <h2 className="flex items-center gap-6 w-full">
                        <span className="block flex-1 h-[2px] bg-[#f71616] opacity-30"></span>
                        <span className="text-[2rem] md:text-[2.4rem] tracking-wider font-semibold">
                            Cách chúng tôi hoạt động
                        </span>
                        <span className="block flex-1 h-[2px] bg-[#f71616] opacity-30"></span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10" data-aos="fade-up">
                        <div className="flex flex-col items-center gap-10 w-full">
                            <div className="flex w-[120px] h-[120px] text-[var(--primary-color)] custom-shadow-v2 rounded-full hover:bg-[var(--primary-color)] hover:text-white">
                                <LiaPencilRulerSolid className="m-auto text-[5rem]" />
                            </div>
                            <h2 className="font-semibold">Đăng ký tài khoản</h2>
                            <p className="text-[1.3rem] text-center text-[#808080]">
                                The latest design trends meet hand-crafted templates in Sassio Collection.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-10 w-full">
                            <div className="flex w-[120px] h-[120px] text-[var(--primary-color)] custom-shadow-v2 rounded-full hover:bg-[var(--primary-color)] hover:text-white">
                                <CiViewList className="m-auto text-[5rem]" />
                            </div>
                            <h2 className="font-semibold">Tạo hồ sơ việc làm</h2>
                            <p className="text-[1.3rem] text-center text-[#808080]">
                                The latest design trends meet hand-crafted templates in Sassio Collection.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-10 w-full">
                            <div className="flex w-[120px] h-[120px] text-[var(--primary-color)] custom-shadow-v2 rounded-full hover:bg-[var(--primary-color)] hover:text-white">
                                <CiDesktop className="m-auto text-[5rem]" />
                            </div>
                            <h2 className="font-semibold">Đăng tải CV của bạn</h2>
                            <p className="text-[1.3rem] text-center text-[#808080]">
                                The latest design trends meet hand-crafted templates in Sassio Collection.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-10 w-full">
                            <div className="flex w-[120px] h-[120px] text-[var(--primary-color)] custom-shadow-v2 rounded-full hover:bg-[var(--primary-color)] hover:text-white">
                                <LiaHandPointer className="m-auto text-[5rem]" />
                            </div>
                            <h2 className="font-semibold">Tìm cơ hội việc làm</h2>
                            <p className="text-[1.3rem] text-center text-[#808080]">
                                The latest design trends meet hand-crafted templates in Sassio Collection.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] py-20">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 w-full min-h-[460px] bg-home rounded-[3rem]">
                    <div className="space-y-10 flex flex-col justify-center p-20" data-aos="fade-right">
                        <div className="space-y-10">
                            <h2 className="text-[3.6rem] font-semibold text-white">
                                Muốn Tăng Cơ Hội Việc Làm Của Bạn, Hãy Upload CV Của Bạn Tại Đây
                            </h2>
                            <p className="text-white text-[1.4rem] font-medium">
                                Hãy tạo 1 CV thật ấn tượng để có thể thu hút các nhà tuyển dụng cũng như tăng cơ hội tìm
                                được việc làm chất lượng nhé!
                            </p>
                        </div>
                        <Link href="#" className="flex items-center gap-3 bg-white px-16 py-5 rounded-xl w-fit">
                            <FaFileUpload />
                            <span>Upload CV</span>
                        </Link>
                    </div>
                    <div className="overflow-hidden">
                        <div className="w-full h-auto pt-10" data-aos="fade-left">
                            <img src="../assets/images/home-img.webp" alt="home-img" className="w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
