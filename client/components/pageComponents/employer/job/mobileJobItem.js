import { FaRegEye } from 'react-icons/fa6';
import { GoPencil } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Link from 'next/link';

const MobileJobItem = (props) => {
    const refactorLocation = (location) => {
        if (location?.length > 1) {
            return `${location?.length} địa điểm`;
        } else {
            return location[0].label;
        }
    };

    return (
        <div className="flex items-start gap-5 w-full border p-5">
            <div className="w-[67px] h-[67px] rounded-lg">
                <img src={props.companyAvatar} alt="job card" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex-1">
                <Link href="#" className="font-semibold truncate-1 leading-none">
                    {props.jobTitle}
                </Link>
                <p className="text-[1.3rem] leading-none text-green-600 mt-2">{props.jobStatus}</p>
                <p className="flex gap-3 flex-wrap text-[1.3rem] font-medium mt-5">
                    <span className="bg-[#e2e2e2] px-3 py-1 rounded-md">{props.jobSalaryRange}</span>
                    <span className="bg-[#e2e2e2] px-3 py-1 rounded-md">
                        {refactorLocation(props.jobWorkingLocation)}
                    </span>
                </p>
                <div className="flex items-center justify-end gap-3 mt-5">
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
                        className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg cursor-pointer"
                    >
                        <RiDeleteBin6Line />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileJobItem;
