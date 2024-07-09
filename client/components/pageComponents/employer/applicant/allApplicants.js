'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicantCard from './applicantCard';

const AllApplicants = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [jobId, setJobId] = useState('336fb003882f472185c091b9');
    const [allApplicants, setAllApplicants] = useState([]);
    const [reRender, setReRender] = useState(false);

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
                                <ApplicantCard
                                    key={index}
                                    jobId={jobId}
                                    avatar={ar?.userId?.avatar}
                                    fullName={ar?.userId?.fullName}
                                    email={ar?.userId?.email}
                                    phone={ar?.userId?.phone}
                                    cvPath={ar?.cvPath}
                                    status={ar?.status}
                                    userId={ar?.userId?._id}
                                    coverLetter={ar?.coverLetter}
                                    setReRender={() => setReRender(!reRender)}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllApplicants;
