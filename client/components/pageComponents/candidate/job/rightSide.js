'use client';

import Link from 'next/link';
import JobRecommend from './jobRecommend';

const RightSide = () => {
    return (
        <>
            <div className="bg-white p-7 rounded-lg custom-shadow-v1">
                <h2 className="text-[2.4rem] font-semibold">Gợi ý việc làm</h2>
                <div className="py-5 space-y-8">
                    <JobRecommend />
                </div>
            </div>
            <Link
                href="https://www.facebook.com/share/p/HMf35xXGgY4Yteja/"
                className="block w-full h-auto rounded-lg custom-shadow-v1"
            >
                <img
                    src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/309398328_8081183205288345_8819332517738392525_n.png?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEP6vbSBmy17ROGUt1MihtibPwd4rFFoSBs_B3isUWhIDEmp7Py6-voLN8Ak90eWDNu1SpwKNyxjSzc1F0Bt2u1&_nc_ohc=zYHPXIW-Yl4Q7kNvgH2snO6&_nc_ht=scontent.fsgn5-12.fna&oh=00_AYB24uD6kRlNyRLcexe_Qk7eTLDI2dvdZ9ZBu6ls5Mb8qg&oe=66733D66"
                    alt="banner-ads"
                    className="w-full h-full rounded-lg"
                />
            </Link>
        </>
    );
};

export default RightSide;
