'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaPhone, FaFeatherPointed, FaCheck, FaRegCircleXmark } from 'react-icons/fa6';
import { success } from '@/utils/toastMessage';

const AllApplicants = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [jobId, setJobId] = useState('336fb003882f472185c091b9');
    const [allApplicants, setAllApplicants] = useState([]);
    const [openCoverLetter, setOpenCoverLetter] = useState(false);
    const [reRender, setReRender] = useState(false);

    const handleDecideApply = async (status, userId) => {
        const data = {
            status,
            userId,
        };
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/job/decide-applicant/${jobId}`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        if (res?.data?.code === 200) {
            setReRender(!reRender);
            return success(res?.data?.message);
        } else {
            return;
        }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/job/get-all-by-employer?page=1&limit=999999`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                },
            );
            if (res?.data?.code === 200) {
                setAllJobs(res?.data?.jobs);
                return;
            } else {
                return;
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        const fetchApplicant = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job/get-applicants-by-job?jobId=${jobId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                setAllApplicants(res?.data?.applicants);
                return;
            } else {
                return;
            }
        };
        fetchApplicant();
    }, [jobId, reRender]);

    return (
        <div className="p-10">
            <h1 className="text-[2.4rem] font-semibold">Tất cả ứng viên &#128276;</h1>
            <div className="bg-white custom-shadow-v1 px-9 py-12 mt-10">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="flex-1 pl-4 border-l-4 border-red-600 font-medium">
                        Danh sách ứng viên theo việc làm
                    </h2>
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
                    {jobId === '336fb003882f472185c091b9' ? (
                        <p className="text-center col-span-2 text-red-600 font-medium">
                            Lưu ý: Lọc dữ liệu theo từng việc làm
                        </p>
                    ) : allApplicants?.length === 0 || allApplicants === undefined ? (
                        <p className="text-center col-span-2">Không tìm thấy ứng viên</p>
                    ) : (
                        allApplicants?.map((ar, index) => {
                            return (
                                <div key={index}>
                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-5 border-b p-5">
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
                                            <div className="flex items-center gap-8 mt-5">
                                                <a
                                                    href={ar?.cvPath}
                                                    target="_blank"
                                                    rel="noreferrer noopener"
                                                    className="block underline text-blue-700"
                                                >
                                                    CV ứng viên
                                                </a>
                                                <div
                                                    onClick={() => setOpenCoverLetter(!openCoverLetter)}
                                                    className="font-medium hover:underline cursor-pointer"
                                                >
                                                    Thư giới thiệu
                                                </div>
                                            </div>
                                            {ar?.status === 'Đã ứng tuyển' ? (
                                                <div className="flex items-center gap-5 mt-5">
                                                    <div
                                                        onClick={() => handleDecideApply('Phù hợp', ar?.userId?._id)}
                                                        className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg cursor-pointer"
                                                    >
                                                        <FaCheck />
                                                    </div>
                                                    <div
                                                        onClick={() =>
                                                            handleDecideApply('Chưa phù hợp', ar?.userId?._id)
                                                        }
                                                        className="bg-red-200 text-red-600 text-[1.8rem] p-3 rounded-lg cursor-pointer"
                                                    >
                                                        <FaRegCircleXmark />
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-[#808080] space-x-2 mt-5">
                                                    <span>Trạng thái:</span>
                                                    <span
                                                        className={`${
                                                            ar?.status === 'Phù hợp' ? 'text-green-600' : 'text-red-600'
                                                        } font-medium`}
                                                    >
                                                        {ar?.status}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {openCoverLetter && (
                                        <div className="mt-5">
                                            <h3 className="flex items-center gap-3">
                                                <FaFeatherPointed className="text-[2rem] text-[var(--primary-color)]" />
                                                <span className="font-semibold">Thư giới thiệu</span>
                                            </h3>
                                            <p className="text-[1.5rem] text-[#808080] whitespace-pre-wrap border-2 border-dashed mt-3 p-3 rounded-lg">
                                                {ar?.coverLetter}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllApplicants;
