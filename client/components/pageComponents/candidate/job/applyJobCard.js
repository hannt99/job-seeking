import { IoBookmark } from 'react-icons/io5';
import Link from 'next/link';
import setSlug from '@/utils/slugify';
import { formatVNDateTime } from '@/utils/formatDateTime';

const ApplyJobCard = (props) => {
    const setStatusColor = (status) => {
        if (status === 'Đã ứng tuyển') {
            return 'text-black';
        } else if (status === 'Phù hợp') {
            return 'text-green-600';
        } else {
            return 'text-red-600';
        }
    };

    return (
        <div className="relative flex flex-col justify-between w-full h-fit bg-white border px-7 py-5 md:px-12 md:py-10 rounded-lg custom-shadow-v1 hover:ring-2 hover:ring-[var(--primary-color)]">
            <div className="flex items-start gap-5">
                <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] border border-black rounded-lg">
                    <img src={props.companyAvatar} alt="job card" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex-1 h-full flex flex-col justify-between">
                    <div className="pr-3">
                        <Link
                            href={`/job/${setSlug(props.jobTitle)}?requestId=${props.id}`}
                            className="text-[1.8rem] font-semibold truncate-1 md:truncate-2 leading-8 hover:text-[var(--primary-color)]"
                        >
                            {props.jobTitle}
                        </Link>
                        <Link
                            href={`/company/${setSlug(props.companyName)}?requestId=${props.companyId}`}
                            className="text-[1.5rem] truncate-1 mt-2"
                        >
                            {props.companyName}
                        </Link>
                        <p className="text-[1.5rem] mt-3">Thời gian ứng tuyển: {formatVNDateTime(props.appliedTime)}</p>
                        <a
                            href={props.cvPath}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="block text-[1.4rem] font-medium mt-3 hover:text-[var(--primary-color)]"
                        >
                            CV đã ứng tuyển
                        </a>
                        <div className="border-t mt-5 py-5">
                            Trạng thái:{' '}
                            <span className={`font-medium ${setStatusColor(props.applyStatus)}`}>
                                {props.applyStatus}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyJobCard;
