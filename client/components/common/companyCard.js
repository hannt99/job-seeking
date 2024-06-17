'use client';

import Link from 'next/link';
import { CiLocationOn } from 'react-icons/ci';
import setSlug from '@/utils/slugify';

const CompanyCard = (props) => {
    return (
        <div className="flex flex-col items-center justify-between bg-white custom-shadow-v1 w-full h-full rounded-lg px-10 py-7">
            <div className="flex flex-col items-center">
                <div className="w-[120px] h-[120px] rounded-full">
                    <img
                        src={props.companyAvatar}
                        alt="company avatar"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <Link
                    href={`/company/${setSlug(props.companyName)}?requestId=${props.id}`}
                    className="text-[1.8rem] text-center font-semibold mt-5 hover:text-[var(--primary-color)] transition-all"
                >
                    {props.companyName}
                </Link>
                <p className="flex items-center gap-2 mt-3">
                    <CiLocationOn className="text-[2rem]" />{' '}
                    <span className="text-[1.4rem] text-[#808080]">{props.companyAddress}</span>
                </p>
            </div>
            <div className="block w-full text-center font-medium text-[var(--primary-color)] bg-[var(--secondary-color)] py-5 mt-12 rounded-full">
                {props.allOpenJobs} vị trí đang tuyển
            </div>
        </div>
    );
};

export default CompanyCard;
