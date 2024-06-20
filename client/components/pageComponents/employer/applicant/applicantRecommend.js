'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhone } from 'react-icons/fa6';

const ApplicantRecommend = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [jobId, setJobId] = useState('336fb003882f472185c091b9');
    const [allRecommendCV, setAllRecommendCV] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job/get-active-job-by-employer`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                setAllJobs(res?.data?.activeJobs);
                return;
            } else {
                return;
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        // if (!jobId) return;
        const fetchCVs = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/resume/recommend-cv?jobId=${jobId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                setAllRecommendCV(res?.data?.resumes);
                return;
            } else {
                return;
            }
        };
        fetchCVs();
    }, [jobId]);

    return (
        <div className="p-10">
            <h1 className="text-[2.4rem] font-semibold">Gợi ý ứng viên &#128276;</h1>
            <div className="bg-white custom-shadow-v1 px-9 py-12 mt-10">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="flex-1 pl-4 border-l-4 border-red-600 font-medium">Danh sách gợi ý</h2>
                    <select
                        value={jobId}
                        onChange={(e) => setJobId(e.target.value)}
                        className="block w-[160px] bg-[#f1f1f1] text-[1.4rem] text-[#808080] outline-none border pl-8 pr-16 py-5 rounded-lg truncate"
                    >
                        <option value="336fb003882f472185c091b9">Lọc theo tên</option>
                        {allJobs?.map((aj, index) => {
                            return (
                                <option key={index} value={aj?._id}>
                                    {aj?.jobTitle}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
                    {allRecommendCV?.length === 0 ? (
                        <p className="text-center col-span-2">Không tìm thấy gợi ý</p>
                    ) : (
                        allRecommendCV?.map((ar, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col md:flex-row items-center md:items-start gap-5 border-b p-5"
                                >
                                    <div className="w-[100px] h-[100px] md:w-[70px] md:h-[70px] border border-black rounded-full">
                                        <img
                                            src={ar?.userId?.avatar}
                                            alt="user avatar"
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-[2rem] font-medium">{ar?.userId?.fullName}</h2>
                                        <div className="block md:flex flex-wrap items-center gap-5">
                                            <p className="flex items-center justify-center gap-2 text-[#808080]">
                                                <FaEnvelope />
                                                <span>{ar?.userId?.email}</span>
                                            </p>
                                            <p className="flex items-center justify-center gap-2 text-[#808080]">
                                                <FaPhone />
                                                <span>{ar?.userId?.phone}</span>
                                            </p>
                                        </div>
                                        <a
                                            href={ar?.cv?.find((item) => item?.isMain === true)?.path}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="block mt-5 underline text-blue-700"
                                        >
                                            CV ứng viên
                                        </a>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicantRecommend;
