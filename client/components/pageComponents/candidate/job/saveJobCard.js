import { AiOutlineDollar } from 'react-icons/ai';
import { IoLocationOutline, IoBookmark } from 'react-icons/io5';
import { LuClock4 } from 'react-icons/lu';
import Link from 'next/link';
import { formatVNTimeAgo } from '@/utils/formatDateTime';

const SaveJobCard = (props) => {
    const refactorLocation = (location) => {
        if (location?.length > 1) {
            return `${location?.length} địa điểm`;
        } else {
            return location[0]?.label;
        }
    };

    return (
        <div className="relative flex flex-col justify-between w-full h-fit md:h-[240px] bg-white border px-7 py-5 md:px-12 md:py-10 rounded-lg custom-shadow-v1 hover:ring-2 hover:ring-[var(--primary-color)]">
            <div className="flex items-start gap-5">
                <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] border border-black rounded-lg">
                    <img src={props.companyAvatar} alt="job card" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex-1 h-full flex flex-col justify-between">
                    <div className="pr-3">
                        <Link
                            href="#"
                            className="text-[1.8rem] font-semibold truncate-1 md:truncate-2 leading-8 hover:text-[var(--primary-color)]"
                        >
                            {props.jobTitle}
                        </Link>
                        <Link href="#" className="text-[1.5rem] truncate-1 mt-2">
                            {props.company}
                        </Link>
                    </div>
                    <p className="text-[1.4rem] mt-3">Đã lưu: {props.saveTime}</p>
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
            </div>
            <IoBookmark className="absolute top-5 right-5 text-[2.4rem]" />
            <div className="flex justify-end">
                <Link
                    href="#"
                    className="block text-[1.4rem] text-white font-medium bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] px-7 py-2.5 rounded-lg mt-5 md:mt-0"
                >
                    Ứng tuyển
                </Link>
            </div>
        </div>
    );
};

export default SaveJobCard;
