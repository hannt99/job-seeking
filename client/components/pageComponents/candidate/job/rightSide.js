'use client';

import Link from 'next/link';
import JobRecommendItem from './jobRecommendItem';

const RightSide = () => {
    return (
        <>
            <div className="bg-white p-7 rounded-lg custom-shadow-v1">
                <h2 className="text-[2.4rem] font-semibold">Gợi ý việc làm</h2>
                <div className="py-5 space-y-8">
                    <JobRecommendItem />
                </div>
                <Link
                    href="/job/recommend-job"
                    className="block text-center text-[1.5rem] font-medium underline text-blue-700"
                >
                    Xem tất cả &#8594;
                </Link>
            </div>
            <Link
                href="https://www.freepik.com/premium-vector/job-vacancy-we-are-hiring-recruitment-banner-poster-square-social-media-post-template-employees_26003696.htm"
                className="block w-full h-auto rounded-lg custom-shadow-v1"
            >
                <img
                    src="https://img.freepik.com/premium-vector/job-vacancy-we-are-hiring-recruitment-banner-poster-square-social-media-post-template-employees_521317-604.jpg"
                    alt="banner-ads"
                    className="w-full h-full rounded-lg"
                />
            </Link>
        </>
    );
};

export default RightSide;
