'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoDocumentTextOutline, IoBriefcaseOutline } from 'react-icons/io5';
import { BiCategory } from 'react-icons/bi';
import { FaRegBell, FaRegUser, FaXmark } from 'react-icons/fa6';
import { formatVNTimeAgo } from '@/utils/formatDateTime';
import PieChart from './pieChart';
import LineChart from './lineChart';

const Dashboard = () => {
    const [reRender, setReRender] = useState(false);
    const [filterYear, setFilterYear] = useState(2024);
    const [users, setUsers] = useState({
        employers: 0,
        candidates: 0,
    });
    const [jobs, setJobs] = useState(0);
    const [categories, setCategories] = useState(0);
    const [notifications, setNotifications] = useState([]);

    const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

    const handleDelete = async (id) => {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notification/delete/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        if (res?.data?.code === 200) {
            return setReRender(!reRender);
        } else {
            return;
        }
    };

    useEffect(() => {
        const fetchDashboard = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/get-admin-dashboard`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                setUsers({
                    employers: res?.data?.employers,
                    candidates: res?.data?.candidates,
                });
                setJobs(res?.data?.jobs);
                setCategories(res?.data?.categories);
                setNotifications(res?.data?.notifications);
            } else {
                return;
            }
        };
        fetchDashboard();
    }, [reRender]);

    return (
        <div className="p-10">
            <h1 className="text-[2.4rem] font-semibold">Bảng tin!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-11 mt-10">
                <div className="flex items-center justify-between w-full bg-white rounded-lg custom-shadow-v1 p-10">
                    <div className="flex w-[70px] h-[70px] bg-blue-100 rounded-lg">
                        <FaRegUser className="text-blue-700 text-[4rem] m-auto" />
                    </div>
                    <div className="text-right">
                        <span className="block text-[2.8rem] text-blue-700 font-semibold">
                            {users?.employers + users?.candidates}
                        </span>
                        <span className="block text-[1.4rem]">Người dùng</span>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full bg-white rounded-lg custom-shadow-v1 p-10">
                    <div className="flex w-[70px] h-[70px] bg-red-100 rounded-lg">
                        <IoDocumentTextOutline className="text-red-700 text-[4rem] m-auto" />
                    </div>
                    <div className="text-right">
                        <span className="block text-[2.8rem] text-red-700 font-semibold">{jobs}</span>
                        <span className="block text-[1.4rem]">Việc làm</span>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full bg-white rounded-lg custom-shadow-v1 p-10">
                    <div className="flex w-[70px] h-[70px] bg-orange-100 rounded-lg">
                        <BiCategory className="text-orange-400 text-[4rem] m-auto" />
                    </div>
                    <div className="text-right">
                        <span className="block text-[2.8rem] text-orange-400 font-semibold">{categories}</span>
                        <span className="block text-[1.4rem]">Ngành nghề</span>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full bg-white rounded-lg custom-shadow-v1 p-10">
                    <div className="flex w-[70px] h-[70px] bg-green-100 rounded-lg">
                        <FaRegBell className="text-green-700 text-[4rem] m-auto" />
                    </div>
                    <div className="text-right">
                        <span className="block text-[2.8rem] text-green-700 font-semibold">
                            {notifications?.length}
                        </span>
                        <span className="block text-[1.4rem]">Thông báo</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mt-10">
                <div className="xl:col-span-2 h-fit space-y-10">
                    <div className="bg-white p-10 rounded-lg custom-shadow-v1 space-y-3">
                        <div className="flex justify-end">
                            <select
                                value={filterYear}
                                onChange={(e) => setFilterYear(e.target.value)}
                                className="block w-[100px] bg-[#f1f1f1] text-[1.4rem] text-[#808080] outline-none border px-8 py-5 rounded-lg"
                            >
                                {years?.map((y, index) => {
                                    return (
                                        <option key={index} value={y}>
                                            {y}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <LineChart year={filterYear} />
                    </div>
                    <div className="bg-white p-10 rounded-lg custom-shadow-v1">
                        <PieChart employers={users?.employers} candidates={users?.candidates} />
                    </div>
                </div>
                <div className="xl:col-span-1 min-h-fit max-h-[430px] bg-white p-10 rounded-lg custom-shadow-v1">
                    <h2 className="font-semibold text-[1.8rem]">Thông báo</h2>
                    <ul className="w-full h-full mt-10 space-y-5 overflow-y-auto no-scrollbar">
                        {notifications?.length === 0 ? (
                            <p className="text-center">Không có thông báo</p>
                        ) : (
                            notifications?.map((n, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="group/item-list relative flex items-center gap-5 w-full py-3"
                                    >
                                        <div className="flex w-[35px] h-[35px] bg-blue-100 rounded-full">
                                            <IoBriefcaseOutline className="text-blue-700 text-[1.8rem] m-auto" />
                                        </div>
                                        <div className="flex-1 w-full space-y-1">
                                            <p title={n?.notification} className="truncate-1">
                                                {n?.notification}
                                            </p>
                                            <p className="text-[1.3rem] text-[#808080]">
                                                {formatVNTimeAgo(n?.createdAt)}
                                            </p>
                                        </div>
                                        <div
                                            onClick={() => handleDelete(n?._id)}
                                            className="hidden absolute top-[50%] translate-y-[-50%] right-0 w-[30px] h-[30px] bg-white text-[1.8rem] leading-none rounded-full custom-shadow-v2 group-hover/item-list:flex cursor-pointer"
                                        >
                                            <FaXmark className="m-auto" />
                                        </div>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
