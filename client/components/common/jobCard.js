import { AiOutlineDollar } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';
import { CiBookmark } from 'react-icons/ci';
import Link from 'next/link';
import { formatVNTimeAgo } from '@/utils/formatDateTime';

const JobCard = (props) => {
    const refactorLocation = (location) => {
        if (location?.length > 1) {
            return `${location?.length} địa điểm`;
        } else {
            return location[0]?.label;
        }
    };

    return (
        <div className="relative flex items-start gap-5 w-full bg-white border px-12 py-10 rounded-lg custom-shadow-v1">
            <div className="w-[67px] h-[67px] border border-black rounded-lg">
                <img src={props.companyAvatar} alt="job card" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex-1">
                <Link href="#" className="text-[1.7rem] font-semibold truncate-1 leading-none">
                    {props.jobTitle}
                </Link>
                <p className="text-[1.3rem] leading-none truncate-1 mt-2">{props.company}</p>
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
                        <LuClock4 className="text-[1.8rem]" />
                        <span>{formatVNTimeAgo(props.updatedAt)}</span>
                    </p>
                </div>
            </div>
            <CiBookmark className="absolute top-5 right-5 text-[2.4rem]" />
        </div>
    );
};

export default JobCard;
