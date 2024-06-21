'use client';

import { FaRegEye } from 'react-icons/fa6';
import { GoPencil } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineDollar } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
import { formatVNDate } from '@/utils/formatDateTime';

const DesktopJobItem = (props) => {
    const refactorLocation = (location) => {
        if (location?.length > 1) {
            return `${location?.length} địa điểm`;
        } else {
            return location[0].label;
        }
    };

    return (
        <div className="grid grid-cols-7 gap-16 px-10 py-7 border-b">
            <div className="col-span-3 flex items-start gap-5">
                <div className="w-[50px] h-[50px] rounded-lg">
                    <img src={props.companyAvatar} alt="avatar" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                    <h2 className="block w-full text-[1.8rem] font-semibold truncate-2">{props.jobTitle}</h2>
                    <p className="flex items-center flex-wrap gap-7 text-[1.4rem] text-[#808080] mt-5">
                        <span className="flex items-center gap-3">
                            <AiOutlineDollar className="text-[1.8rem]" />
                            <span className="flex-1">{props.jobSalaryRange}</span>
                        </span>
                        <span className="flex items-center gap-3">
                            <IoLocationOutline className="text-[1.8rem]" />
                            <span className="flex-1">{refactorLocation(props.jobWorkingLocation)}</span>
                        </span>
                    </p>
                </div>
            </div>
            <div className="col-span-1 flex">
                <Link href="#" className="text-[1.5rem] underline text-blue-600 my-auto">
                    <span>{props.jobApplicants?.length}</span> ứng cử
                </Link>
            </div>
            <div className="col-span-1 flex">
                <span className="text-[1.4rem] text-[#808080] my-auto">{formatVNDate(props.jobDeadline)}</span>
            </div>
            <div className="col-span-1 flex">
                <span
                    className={`text-[1.3rem] ${
                        props.jobStatus === 'Đang tuyển' ? 'text-green-600' : 'text-red-600'
                    } my-auto`}
                >
                    {props.jobStatus}
                </span>
            </div>
            <div className="col-span-1 flex items-center gap-3">
                {/* <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                    <FaRegEye />
                </div> */}
                <Link
                    href={`/employer/edit-job?requestId=${props.jobId}`}
                    className="block bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg"
                >
                    <GoPencil />
                </Link>
                <div
                    onClick={props.handleDeleteJob}
                    className="bg-red-200 text-red-600 text-[1.8rem] p-3 rounded-lg cursor-pointer"
                >
                    <RiDeleteBin6Line />
                </div>
            </div>
        </div>
    );
};

export default DesktopJobItem;
