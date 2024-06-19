'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FaShare } from 'react-icons/fa6';
import RightSide from './rightSide';
import DragAndDropFile from '@/components/common/dragAndDropFile';
import { error, success } from '@/utils/toastMessage';
import { FacebookShareButton, FacebookIcon } from 'next-share';

const CvManage = () => {
    const [cvs, setCvs] = useState([]);
    const [reRender, setReRender] = useState(false);

    const handleDeleteCV = async (filename) => {
        const confirmMsg = `Bạn có chắc muốn xóa vĩnh viễn CV này không?`;
        if (!window.confirm(confirmMsg)) return;
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/resume/delete-cv`,
            { filename },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            },
        );
        if (res?.data?.code === 200) {
            setReRender(!reRender);
            return success(res?.data?.message);
        } else {
            return error(res?.data?.message);
        }
    };

    useEffect(() => {
        const fetchCV = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/resume/get-all-cv`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                return setCvs(res?.data?.cvs);
            } else {
                return;
            }
        };
        fetchCV();
    }, [reRender]);

    return (
        <>
            <div className="w-full flex justify-center px-5 md:px-0">
                <nav
                    className="flex bg-[var(--secondary-color)] px-7 py-5 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] rounded-lg custom-shadow-v1 mt-5"
                    aria-label="Breadcrumb"
                >
                    <ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link
                                href="/"
                                className="inline-flex items-center text-[1.5rem] font-normal text-[var(--primary-color)]"
                            >
                                <svg
                                    className="w-5 h-5 mr-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Trang chủ
                            </Link>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg
                                    className="w-3 h-3 text-gray-400 mx-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                                <span className="ml-1 text-[1.5rem] font-normal text-[#808080] md:ml-2">Quản CV</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] py-10">
                <div className="lg:col-span-4 space-y-10">
                    <div className="h-fit custom-shadow-v1 rounded-lg">
                        <DragAndDropFile setReRender={() => setReRender(!reRender)} />
                    </div>
                    <div className="h-fit bg-white custom-shadow-v1 rounded-lg p-9 space-y-8">
                        <h1 className="text-[2.2rem] font-semibold">CV đã tải lên</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                            {cvs?.length === 0 ? (
                                <p className="col-span-2 text-center">Chưa đăng tải CV</p>
                            ) : (
                                cvs?.map((cv, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="relative bg-default-cv w-full h-[280px] xl:h-[330px] rounded-lg"
                                        >
                                            <div className="flex flex-col justify-between absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-black/5 to-black/75 p-7">
                                                <div className="self-end flex items-center gap-2 bg-white text-[1.3rem] text-black font-medium px-5 py-1 rounded-full">
                                                    <span className="text-[1.8rem]">&#9733;</span>
                                                    <span>Đặt làm CV chính</span>
                                                </div>
                                                <div className="text-white space-y-10">
                                                    <a
                                                        href={cv?.path}
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                        className="w-full text-[2.2rem] font-bold break-all truncate-2"
                                                    >
                                                        {cv?.name?.slice(8)}
                                                    </a>
                                                    <div className="flex items-center justify-between">
                                                        <FacebookShareButton url={cv?.path} className="aaa">
                                                            <FacebookIcon size={32} round />
                                                        </FacebookShareButton>
                                                        <MdOutlineDeleteOutline
                                                            onClick={() => handleDeleteCV(cv?.name)}
                                                            className="text-[2.4rem] cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 w-full h-fit rounded-lg">
                    <RightSide />
                </div>
            </div>
        </>
    );
};

export default CvManage;
