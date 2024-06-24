'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteOutline } from 'react-icons/md';
import { success } from '@/utils/toastMessage';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [reRender, setReRender] = useState(false);

    const handleDelete = async (id) => {
        const confirmMsg = `Bạn có chắc muốn xóa vĩnh viễn công việc này không?`;
        if (!window.confirm(confirmMsg)) return;
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/delete/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        if (res?.data?.code === 200) {
            setReRender(!reRender);
            return success(res?.data?.message);
        } else {
            return;
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/get-all`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                return setUsers(res?.data?.users);
            } else {
                return;
            }
        };
        fetchUser();
    }, [reRender]);

    return (
        <div className="p-10">
            <h1 className="text-[2.8rem] font-semibold">Danh sách người dùng</h1>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
                <table class="w-full text-[1.6rem] text-left rtl:text-right text-gray-500">
                    <thead class="text-[1.5rem] text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Họ và tên
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Số điện thoại
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Vai trò
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Xóa</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((u, index) => {
                            return (
                                <tr key={index} class="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <div className="flex items-center gap-5">
                                            <div className="w-[40px] h-[40px] rounded-full">
                                                <img
                                                    src={u?.avatar}
                                                    alt="user_avatar"
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </div>
                                            <span>{u?.fullName}</span>
                                        </div>
                                    </th>
                                    <td class="px-6 py-4">{u?.email}</td>
                                    <td class="px-6 py-4">{u?.phone}</td>
                                    <td class="font-medium px-6 py-4">{u?.role === 0 ? 'Employer' : 'Candidate'}</td>
                                    <td class="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(u?._id)}
                                            class="font-medium text-[2.4rem] text-red-600 hover:underline"
                                        >
                                            <MdDeleteOutline />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
