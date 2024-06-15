import { IoBookmark } from 'react-icons/io5';
import Link from 'next/link';

const ApplyJobCard = (props) => {
    return (
        <div className="relative flex flex-col justify-between w-full h-fit bg-white border px-7 py-5 md:px-12 md:py-10 rounded-lg custom-shadow-v1 hover:ring-2 hover:ring-[var(--primary-color)]">
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
                        <p className="text-[1.5rem] mt-3">Thời gian ứng tuyển: {'12/01/2024'}</p>
                        <Link
                            href="#"
                            className="block text-[1.4rem] font-medium mt-3 hover:text-[var(--primary-color)]"
                        >
                            CV đã ứng tuyển
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-center justify-between border-t mt-5 py-5">
                            <span>
                                Trạng thái: <span className="font-medium text-green-500">{'Hồ sơ chưa phù hợp'}</span>
                            </span>
                            <span>Vào lúc: {'12/01/2024'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <IoBookmark className="absolute top-5 right-5 text-[2.4rem]" />
            <div className="flex justify-end"></div>
        </div>
    );
};

export default ApplyJobCard;
