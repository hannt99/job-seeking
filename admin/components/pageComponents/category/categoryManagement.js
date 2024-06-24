'use client';

import { useState, useEffect } from 'react';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import axios from 'axios';
import { success, error } from '@/utils/toastMessage';
import Pagination from '@/components/common/pagination';

const CategoryManagement = () => {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [reRender, setReRender] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmit = async () => {
        let res;
        if (!categoryId) {
            res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/category/create`,
                { category },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                },
            );
        } else {
            res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/category/update/${categoryId}`,
                { category },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                },
            );
        }
        if (res?.data?.code === 200) {
            setCategory('');
            setReRender(!reRender);
            setCategoryId('');
            setIsEdit(false);
            return success(res?.data?.message);
        } else {
            return error(res?.data?.message);
        }
    };

    const handleEdit = async (id) => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/get/${id}`);
        if (res?.data?.code === 200) {
            setIsEdit(true);
            setCategoryId(id);
            return setCategory(res?.data?.category?.category);
        } else {
            return;
        }
    };

    const handleDelete = async (id) => {
        const confirmMsg = `Bạn có chắc muốn xóa vĩnh viễn ngành nghề này không?`;
        if (!window.confirm(confirmMsg)) return;
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/delete/${id}`, {
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
        const fetchCategory = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/get-all?page=${page}&limit=10`);
            if (res?.data?.code === 200) {
                setPages(res?.data?.totalPages);
                return setCategories(res?.data?.categories);
            } else {
                return;
            }
        };
        fetchCategory();
    }, [page, reRender]);

    return (
        <div className="p-10">
            <h1 className="text-[2.8rem] font-semibold">Quản lý ngành nghề</h1>

            <div className="flex items-center gap-5 mt-10">
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Nhập tên ngành nghề"
                    className="flex-1 block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg"
                />
                <button
                    onClick={handleSubmit}
                    className="text-white font-medium px-5 py-3 bg-[var(--primary-color)] rounded-lg"
                >
                    {!isEdit || !category ? 'Thêm' : 'Cập nhật'}
                </button>
                {!isEdit ||
                    (category && (
                        <button
                            onClick={() => {
                                setCategory(''), setCategoryId(''), setIsEdit(false);
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
                                Ngành nghề
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
                        {categories?.map((c, index) => {
                            return (
                                <tr key={index} class="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {c?.category}
                                    </th>
                                    <td class="px-6 py-4">{new Date(c?.createdAt)?.toLocaleString()}</td>
                                    <td class="px-6 py-4 text-right">
                                        <div className="flex items-center gap-5">
                                            <button
                                                onClick={() => handleEdit(c?._id)}
                                                class="font-medium text-[2.4rem] text-green-600 hover:underline"
                                            >
                                                <MdOutlineEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(c?._id)}
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

export default CategoryManagement;
