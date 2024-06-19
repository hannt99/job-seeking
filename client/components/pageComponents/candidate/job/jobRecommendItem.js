'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import RecommendJobCard from '@/components/common/recommendJobCard';

const JobRecommendItem = () => {
    const [recommendJobs, setRecommendJob] = useState([]);

    useEffect(() => {
        const fetchRecommendJob = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job/get-recommend-job`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                setRecommendJob(res?.data?.recommendJobs);
            } else {
                return;
            }
        };
        fetchRecommendJob();
    }, []);

    return (
        <>
            {recommendJobs?.length === 0 ? (
                <p className="text-center">Không có việc làm phù hợp</p>
            ) : (
                recommendJobs?.map((rj, index) => {
                    return (
                        <RecommendJobCard
                            key={index}
                            id={rj?._id}
                            jobTitle={rj?.jobTitle}
                            jobStatus={rj?.jobStatus}
                            jobSalaryRange={rj?.jobSalaryRange}
                            jobWorkingLocation={rj?.jobWorkingLocation}
                            updatedAt={rj?.updatedAt}
                            companyId={rj?.companyId?._id}
                            companyName={rj?.companyId?.companyName}
                            companyAvatar={rj?.companyId?.avatar}
                        />
                    );
                })
            )}
        </>
    );
};

export default JobRecommendItem;
