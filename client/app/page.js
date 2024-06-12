'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSearchOutline } from 'react-icons/io5';
import { CiLocationOn } from 'react-icons/ci';
import CompanyCard from '@/components/common/companyCard';

export default function Home() {
    const [jobPosition, setJobPosition] = useState('');
    const [allProvinces, setAllProvinces] = useState([]);
    const [province, setProvince] = useState('');

    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
            setAllProvinces(res?.data?.data);
        };
        fetchProvinces();
    }, []);

    return (
        <>
            <div className="relative bg-[#f8ede8] h-screen w-full grid grid-cols-3">
                <div></div>
                <div className="w-auto h-full col-span-2 animate-fadeInFromR overflow-hidden">
                    <img
                        src="../assets/images/home-bg.webp"
                        alt="home bg"
                        className="w-full h-full object-contain translate-x-24"
                    />
                </div>
                <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
                    <div className="w-[360px] md:w-[690px] lg:w-[960px] xl:w-[1120px]">
                        <div className="w-[55%] animate-fadeInFromB">
                            <h1 className="text-[4.5rem] font-semibold tracking-wide">
                                Join us & Explore Thousands of Jobs
                            </h1>
                            <p className="text-[1.4rem] text-[#808080] mt-2">
                                Find Jobs, Employment & Career Opportunities
                            </p>
                            <div className="grid grid-cols-5 bg-white border p-5 mt-16 rounded-lg">
                                <div className="relative border-r col-span-2">
                                    <input
                                        type="text"
                                        value={jobPosition}
                                        onChange={(e) => setJobPosition(e.target.value)}
                                        placeholder="Vị trí tuyển dụng"
                                        className={`block w-full outline-none text-[1.5rem] pl-5 pr-16 py-5 rounded-lg`}
                                    />
                                    <IoSearchOutline className="absolute top-[50%] translate-y-[-50%] right-0 text-[2rem] mr-5" />
                                </div>
                                <div className="relative border-l col-span-2">
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
            <div className="w-[360px] md:w-[690px] lg:w-[960px] xl:w-[1120px] py-20">
                <h2 className="flex items-center gap-6 w-full">
                    <span className="block flex-1 h-[2px] bg-[#f71616] opacity-30"></span>
                    <span className="text-[2rem] md:text-[2.4rem] tracking-wider font-semibold">
                        CÁC CÔNG TY HÀNG ĐẦU
                    </span>
                    <span className="block flex-1 h-[2px] bg-[#f71616] opacity-30"></span>
                </h2>
                <div className="grid grid-cols-3 h-[1000px]">
                    <CompanyCard />
                    <CompanyCard />
                    <CompanyCard />
                </div>
            </div>
        </>
    );
}
