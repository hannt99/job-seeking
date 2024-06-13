'use client';

import Link from 'next/link';
import { CiLocationOn } from 'react-icons/ci';

const CompanyCard = () => {
    return (
        <div className="flex flex-col items-center bg-white custom-shadow-v1 w-full h-fit rounded-lg px-10 py-7">
            <div className="w-[120px] h-[120px] border border-black rounded-full">
                <img src="" alt="" className="w-full h-full object-cover rounded-full" />
            </div>
            <h2 className="text-[1.8rem] font-semibold mt-5">VietcomBank</h2>
            <p className="flex items-center gap-2 mt-3">
                <CiLocationOn className="text-[2rem]" />{' '}
                <span className="text-[1.4rem] text-[#808080]">Thanh pho Ho Chi Minh</span>
            </p>
            <Link
                href="#"
                className="block w-full text-center font-medium text-[var(--primary-color)] bg-[var(--secondary-color)] py-5 mt-12 rounded-full"
            >
                15 vi tri dang tuyen
            </Link>
        </div>
    );
};

export default CompanyCard;
