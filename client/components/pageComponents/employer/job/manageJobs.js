'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '@/components/common/pagination';
import useDebounce from '@/hooks/useDebounce';
import { success, error } from '@/utils/toastMessage';
import DesktopJobItem from './desktopJobItem';
import MobileJobItem from './mobileJobItem';

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
                `${process.env.NEXT_PUBLIC_API_URL}/job/get-all-by-employer?page=${page}&limit=6&search=${debouncedValue}`,
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
                <div className="hidden xl:block">
                    <div className="grid grid-cols-7 gap-16 font-medium text-[var(--primary-color)] bg-[var(--secondary-color)] px-10 py-7">
                        <h3 className="col-span-3">Tên công việc</h3>
                        <h3 className="col-span-1">Đơn ứng cử</h3>
                        <h3 className="col-span-1">Ngày hết hạn</h3>
                        <h3 className="col-span-1">Trạng thái</h3>
                        <h3 className="col-span-1">Thao tác</h3>
                    </div>
                    {allJobs?.length === 0 ? (
                        <p className="text-center mt-5">Chưa tạo việc làm</p>
                    ) : (
                        allJobs?.map((ajs, index) => {
                            return (
                                <DesktopJobItem
                                    key={index}
                                    companyAvatar={ajs?.companyId?.avatar}
                                    jobTitle={ajs?.jobTitle}
                                    jobSalaryRange={ajs?.jobSalaryRange}
                                    jobWorkingLocation={ajs?.jobWorkingLocation}
                                    jobApplicants={ajs?.jobApplicants}
                                    jobDeadline={ajs?.jobDeadline}
                                    jobStatus={ajs?.jobStatus}
                                    jobId={ajs?._id}
                                    handleDeleteJob={() => handleDeleteJob(ajs?._id)}
                                />
                            );
                        })
                    )}
                </div>
                <div className="block xl:hidden">
                    <div className="grid grid-cols-1 gap-5">
                        {allJobs?.length === 0 ? (
                            <p className="text-center mt-5">Chưa tạo việc làm</p>
                        ) : (
                            allJobs?.map((ajs, index) => {
                                return (
                                    <MobileJobItem
                                        key={index}
                                        companyAvatar={ajs?.companyId?.avatar}
                                        jobTitle={ajs?.jobTitle}
                                        jobSalaryRange={ajs?.jobSalaryRange}
                                        jobWorkingLocation={ajs?.jobWorkingLocation}
                                        jobStatus={ajs?.jobStatus}
                                        jobId={ajs?._id}
                                        handleDeleteJob={() => handleDeleteJob(ajs?._id)}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
                <div className="mt-10">
                    <Pagination page={page} pages={pages} changePage={setPage} />
                </div>
            </div>
        </div>
    );
};

export default ManageJobs;
