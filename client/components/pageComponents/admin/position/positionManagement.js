'use client';

import { useState, useEffect } from 'react';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import axios from 'axios';
import { success, error } from '@/utils/toastMessage';
import Pagination from '@/components/common/pagination';

const PositionManagement = () => {
    const [position, setPosition] = useState('');
    const [positions, setPositions] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [reRender, setReRender] = useState(false);
    const [positionId, setPositionId] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmit = async () => {
        if (!position) return;
        let res;
        if (!positionId) {
            res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/position/create`,
                { position },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                },
            );
        } else {
            res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/position/update/${positionId}`,
                { position },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                },
            );
        }
        if (res?.data?.code === 200) {
            setPosition('');
            setReRender(!reRender);
            setPositionId('');
            setIsEdit(false);
            return success(res?.data?.message);
        } else {
            return error(res?.data?.message);
        }
    };

    const handleEdit = async (id) => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/position/get/${id}`);
        if (res?.data?.code === 200) {
            setIsEdit(true);
            setPositionId(id);
            return setPosition(res?.data?.position?.position);
        } else {
            return;
        }
    };

    const handleDelete = async (id) => {
        const confirmMsg = `Bạn có chắc muốn xóa vĩnh viễn vị trí này không?`;
        if (!window.confirm(confirmMsg)) return;
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/position/delete/${id}`, {
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
        const fetchPosition = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/position/get-all?page=${page}&limit=10`);
            if (res?.data?.code === 200) {
                setPages(res?.data?.totalPages);
                return setPositions(res?.data?.positions);
            } else {
                return;
            }
        };
        fetchPosition();
    }, [page, reRender]);

    return (
        <div className="p-10">
            <h1 className="text-[2.8rem] font-semibold">Quản lý vị trí tuyển dụng</h1>

            <div className="flex items-center gap-5 mt-10">
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Nhập tên vị trí tuyển dụng"
                    className="flex-1 block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg"
                />
                <button
                    onClick={handleSubmit}
                    className="text-white font-medium px-5 py-3 bg-[var(--primary-color)] rounded-lg"
                >
                    {!isEdit || !position ? 'Thêm' : 'Cập nhật'}
                </button>
                {!isEdit ||
                    (position && (
                        <button
                            onClick={() => {
                                setPosition(''), setPositionId(''), setIsEdit(false);
                            }}
                            className="text-white font-medium px-5 py-3 bg-[#cccccc] rounded-lg"
                        >
                            Hủy
                        </button>
                    ))}
            </div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
                <table class="w-full text-[1.6rem] text-left rtl:text-right text-gray-500">
                    <thead class="text-[1.5rem] text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Vị trí tuyển dụng
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Ngày tạo
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Xóa</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions?.map((p, index) => {
                            return (
                                <tr key={index} class="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {p?.position}
                                    </th>
                                    <td class="px-6 py-4">{new Date(p?.createdAt)?.toLocaleString()}</td>
                                    <td class="px-6 py-4 text-right">
                                        <div className="flex items-center gap-5">
                                            <button
                                                onClick={() => handleEdit(p?._id)}
                                                class="font-medium text-[2.4rem] text-green-600 hover:underline"
                                            >
                                                <MdOutlineEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p?._id)}
                                                class="font-medium text-[2.4rem] text-red-600 hover:underline"
                                            >
                                                <MdDeleteOutline />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex justify-center">
                    <Pagination page={page} pages={pages} changePage={setPage} />
                </div>
            </div>
        </div>
    );
};

export default PositionManagement;
