import { AiOutlineDollar } from 'react-icons/ai';
import { IoLocationOutline, IoBookmarkOutline } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';
import Link from 'next/link';
import { formatVNTimeAgo } from '@/utils/formatDateTime';

const RecommendJobCard = (props) => {
    const refactorLocation = (location) => {
        if (location?.length > 1) {
            return `${location?.length} địa điểm`;
        } else {
            return location[0]?.label;
        }
    };

    return (
        <div className="relative w-full h-fit bg-white border px-7 py-5 rounded-lg custom-shadow-v1 hover:ring-2 hover:ring-[var(--primary-color)]">
            <div className="flex items-start gap-5">
                <div className="w-[70px] h-[70px] border border-black rounded-lg">
                    <img src={props.companyAvatar} alt="job card" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="pr-3 flex-1">
                    <Link
                        href="#"
                        className="text-[1.8rem] font-semibold truncate-1 leading-8 hover:text-[var(--primary-color)]"
                    >
                        {props.jobTitle}
                    </Link>
                    <Link href="#" className="text-[1.5rem] truncate-1 mt-2">
                        {props.company}
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
            </div>
            <IoBookmarkOutline className="absolute top-5 right-5 text-[2.4rem]" />
        </div>
    );
};

export default RecommendJobCard;
