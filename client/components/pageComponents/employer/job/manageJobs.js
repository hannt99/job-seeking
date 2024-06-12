'use client';

import { useState, useEffect } from 'react';
import { FaRegEye } from 'react-icons/fa6';
import { GoPencil } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineDollar } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
import axios from 'axios';
import { formatVNDate } from '@/utils/formatDateTime';
import Pagination from '@/components/common/pagination';
import useDebounce from '@/hooks/useDebounce';
import { success, error } from '@/utils/toastMessage';

const ManageJobs = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [reRender, setReRender] = useState(false);

    const debouncedValue = useDebounce(searchValue, 300);

    const handleDeleteJob = async (id) => {
        const confirmMsg = `Bạn có chắc muốn xóa vĩnh viễn công việc này không?`;
        if (!window.confirm(confirmMsg)) return;
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/job/delete/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        if (res?.data?.code === 200) {
            setReRender(!reRender);
            return success(res?.data?.message);
        } else {
            return error(res?.data?.message);
        }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/job/get-all-by-employer?page=${page}&limit=5&search=${debouncedValue}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                },
            );
            if (res?.data?.code === 200) {
                setAllJobs(res?.data?.jobs);
                setPages(res?.data?.totalPages);
                return;
            } else {
                return;
            }
        };
        fetchJobs();
    }, [page, debouncedValue, reRender]);

    return (
        <div className="p-10">
            <h1 className="text-[2.4rem] font-semibold">Quản lý công việc</h1>
            <div className="bg-white custom-shadow-v1 px-9 py-12 mt-10">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="flex-1 pl-4 border-l-4 border-red-600 font-medium">Danh sách công việc</h2>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Tìm kiếm..."
                        className="flex-1 block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg"
                    />
                </div>
                <div className="grid grid-cols-7 gap-16 font-medium text-[var(--primary-color)] bg-[var(--secondary-color)] px-10 py-7">
                    <h3 className="col-span-2">Tên công việc</h3>
                    <h3 className="col-span-1">Đơn ứng cử</h3>
                    <h3 className="col-span-1">Ngày hết hạn</h3>
                    <h3 className="col-span-1">Trạng thái</h3>
                    <h3 className="col-span-2">Thao tác</h3>
                </div>
                {allJobs?.map((ajs, index) => {
                    return (
                        <div key={index} className="grid grid-cols-7 gap-16 px-10 py-7 border-b">
                            <div className="col-span-2 flex items-start gap-5">
                                <div className="w-[45px] h-[45px] rounded-lg border border-black">
                                    <img
                                        src={ajs?.companyAvatar}
                                        alt="avatar"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex-1">
                                    <Link href="#" className="block w-full text-[1.8rem] font-semibold truncate-2">
                                        {ajs?.jobTitle}
                                    </Link>
                                    <p className="text-[1.4rem] text-[#808080] mt-5 space-y-3">
                                        <span className="flex items-center gap-3">
                                            <AiOutlineDollar className="text-[1.8rem]" />
                                            <span className="flex-1">{ajs?.jobSalaryRange}</span>
                                        </span>
                                        <span className="flex items-center gap-3">
                                            <IoLocationOutline className="text-[1.8rem]" />
                                            <span className="flex-1">
                                                {ajs?.jobWorkingLocation?.map((item) => item.label).join(', ')}
                                            </span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-1 flex">
                                <Link href="#" className="text-[1.5rem] underline text-blue-600 my-auto">
                                    <span>{ajs?.jobApplicants?.length}</span> ứng cử
                                </Link>
                            </div>
                            <div className="col-span-1 flex">
                                <span className="text-[1.4rem] text-[#808080] my-auto">
                                    {formatVNDate(ajs?.jobDeadline)}
                                </span>
                            </div>
                            <div className="col-span-1 flex">
                                <span className="text-[1.3rem] text-green-600 my-auto">{ajs?.jobStatus}</span>
                            </div>
                            <div className="col-span-2 flex items-center gap-3">
                                <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                                    <FaRegEye />
                                </div>
                                <Link
                                    href={`/employer/edit-job?requestId=${ajs?._id}`}
                                    className="block bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg"
                                >
                                    <GoPencil />
                                </Link>
                                <div
                                    onClick={() => handleDeleteJob(ajs?._id)}
                                    className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg cursor-pointer"
                                >
                                    <RiDeleteBin6Line />
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div className="mt-10">
                    <Pagination page={page} pages={pages} changePage={setPage} />
                </div>
            </div>
        </div>
    );
};

export default ManageJobs;
