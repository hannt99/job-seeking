'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineDollar } from 'react-icons/ai';
import { IoLocationOutline, IoBookmarkOutline, IoBookmark } from 'react-icons/io5';
import { MdUpdate } from 'react-icons/md';
import Link from 'next/link';
import { formatVNTimeAgo } from '@/utils/formatDateTime';
import setSlug from '@/utils/slugify';
import { success } from '@/utils/toastMessage';

const RecommendJobCard = (props) => {
    const [isSave, setIsSave] = useState(false);
    const [reRender, setRerender] = useState('');

    const handleSaveJob = async (id) => {
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/job/save-job`,
            { jobId: id },
            { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } },
        );
        if (res?.data?.code === 200) {
            setRerender(!reRender);
            return success(res?.data?.message);
        } else {
            return;
        }
    };

    const handleUnSaveJob = async (id) => {
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/job/unsave-job`,
            { jobId: id },
            { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } },
        );
        if (res?.data?.code === 200) {
            setRerender(!reRender);
            return success(res?.data?.message);
        } else {
            return;
        }
    };

    const refactorLocation = (location) => {
        if (location?.length > 1) {
            return `${location?.length} địa điểm`;
        } else {
            return location[0]?.label;
        }
    };

    useEffect(() => {
        const isSave = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job/get-save-job`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            const result = !!res?.data?.totalJobs?.find((item) => item?.jobId?._id === props.id);
            setIsSave(result);
        };
        isSave();
    }, [reRender]);

    return (
        <div className="relative w-full h-fit bg-white border px-7 py-5 rounded-lg custom-shadow-v1 hover:ring-2 hover:ring-[var(--primary-color)]">
            <div className="flex items-start gap-5">
                <div className="w-[70px] h-[70px] border border-black rounded-lg">
                    <img src={props.companyAvatar} alt="job card" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="pr-3 flex-1">
                    <Link
                        href={`/job/${setSlug(props.jobTitle)}?requestId=${props.id}`}
                        className="text-[1.8rem] font-semibold truncate-1 leading-8 hover:text-[var(--primary-color)]"
                    >
                        {props.jobTitle}
                    </Link>
                    <Link
                        href={`/company/${setSlug(props.companyName)}?requestId=${props.companyId}`}
                        className="text-[1.5rem] truncate-1 mt-2"
                    >
                        {props.companyName}
                    </Link>
                </div>
            </div>
            <div className="flex gap-3 flex-wrap text-[1.3rem] font-medium mt-5 text-[#808080]">
                <p className="flex items-center gap-1 rounded-md">
                    <AiOutlineDollar className="text-[1.8rem]" />
                    <span>{props.jobSalaryRange}</span>
                </p>
                <p className="flex items-center gap-1 rounded-md">
                    <IoLocationOutline className="text-[1.8rem]" />
                    <span>{refactorLocation(props.jobWorkingLocation)}</span>
                </p>
                <p className="flex items-center gap-1 rounded-md">
                    <MdUpdate className="text-[1.8rem]" />
                    <span>{formatVNTimeAgo(props.updatedAt)}</span>
                </p>
            </div>
            {isSave ? (
                <IoBookmark
                    onClick={() => handleUnSaveJob(props.id)}
                    className="absolute top-5 right-5 text-[2.4rem] cursor-pointer"
                />
            ) : (
                <IoBookmarkOutline
                    onClick={() => handleSaveJob(props.id)}
                    className="absolute top-5 right-5 text-[2.4rem] cursor-pointer"
                />
            )}
        </div>
    );
};

export default RecommendJobCard;
