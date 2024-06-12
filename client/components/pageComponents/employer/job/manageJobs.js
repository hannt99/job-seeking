'use client';

import { FaRegEye } from 'react-icons/fa6';
import { GoPencil } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineDollar } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';

const ManageJobs = () => {
    return (
        <div className="p-10">
            <h1 className="text-[2.4rem] font-semibold">Quản lý công việc</h1>
            <div className="bg-white custom-shadow-v1 px-9 py-12 mt-10">
                <h2 className="pl-4 border-l-4 border-red-600 font-medium mb-10">Danh sách công việc</h2>
                <div className="grid grid-cols-7 gap-16 font-medium text-[var(--primary-color)] bg-[var(--secondary-color)] px-10 py-7">
                    <h3 className="col-span-2">Tên công việc</h3>
                    <h3 className="col-span-1">Đơn ứng cử</h3>
                    <h3 className="col-span-1">Ngày hết hạn</h3>
                    <h3 className="col-span-1">Trạng thái</h3>
                    <h3 className="col-span-2">Thao tác</h3>
                </div>
                <div className="grid grid-cols-7 gap-16 px-10 py-7 border-b">
                    <div className="col-span-2 flex items-start gap-5">
                        <div className="w-[45px] h-[45px] rounded-lg border border-black">
                            <img src="" alt="avatar" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div>
                            <Link href="#" className="block w-full text-[1.8rem] font-semibold truncate-2">
                                Thực tập sinh IT support Thực tập sinh IT support Thực tập sinh IT support
                            </Link>
                            <p className="text-[1.4rem] text-[#808080] mt-5">
                                <span className="flex items-center gap-3">
                                    <AiOutlineDollar className="text-[1.8rem]" />
                                    <span>Thỏa thuận</span>
                                </span>
                                <span className="flex items-center gap-3">
                                    <IoLocationOutline className="text-[1.8rem]" />
                                    <span>Thành phố Hồ Chí Minh</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 flex">
                        <Link href="#" className="text-[1.5rem] underline text-blue-600 my-auto">
                            3+ ứng cử
                        </Link>
                    </div>
                    <div className="col-span-1 flex">
                        <span className="text-[1.4rem] text-[#808080] my-auto">09-09-2024</span>
                    </div>
                    <div className="col-span-1 flex">
                        <span className="text-[1.3rem] text-green-600 my-auto">Đang tuyển</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-3">
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <FaRegEye />
                        </div>
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <GoPencil />
                        </div>
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <RiDeleteBin6Line />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-16 px-10 py-7 border-b">
                    <div className="col-span-2 flex items-start gap-5">
                        <div className="w-[45px] h-[45px] rounded-lg border border-black">
                            <img src="" alt="avatar" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div>
                            <Link href="#" className="block w-full text-[1.8rem] font-semibold truncate-2">
                                Thực tập sinh IT support Thực tập sinh IT support Thực tập sinh IT support
                            </Link>
                            <p className="text-[1.4rem] text-[#808080] mt-5">
                                <span className="flex items-center gap-3">
                                    <AiOutlineDollar className="text-[1.8rem]" />
                                    <span>Thỏa thuận</span>
                                </span>
                                <span className="flex items-center gap-3">
                                    <IoLocationOutline className="text-[1.8rem]" />
                                    <span>Thành phố Hồ Chí Minh</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 flex">
                        <Link href="#" className="text-[1.5rem] underline text-blue-600 my-auto">
                            3+ ứng cử
                        </Link>
                    </div>
                    <div className="col-span-1 flex">
                        <span className="text-[1.4rem] text-[#808080] my-auto">09-09-2024</span>
                    </div>
                    <div className="col-span-1 flex">
                        <span className="text-[1.3rem] text-green-600 my-auto">Đang tuyển</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-3">
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <FaRegEye />
                        </div>
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <GoPencil />
                        </div>
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <RiDeleteBin6Line />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-16 px-10 py-7 border-b">
                    <div className="col-span-2 flex items-start gap-5">
                        <div className="w-[45px] h-[45px] rounded-lg border border-black">
                            <img src="" alt="avatar" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div>
                            <Link href="#" className="block w-full text-[1.8rem] font-semibold truncate-2">
                                Thực tập sinh IT support Thực tập sinh IT support Thực tập sinh IT support
                            </Link>
                            <p className="text-[1.4rem] text-[#808080] mt-5">
                                <span className="flex items-center gap-3">
                                    <AiOutlineDollar className="text-[1.8rem]" />
                                    <span>Thỏa thuận</span>
                                </span>
                                <span className="flex items-center gap-3">
                                    <IoLocationOutline className="text-[1.8rem]" />
                                    <span>Thành phố Hồ Chí Minh</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 flex">
                        <Link href="#" className="text-[1.5rem] underline text-blue-600 my-auto">
                            3+ ứng cử
                        </Link>
                    </div>
                    <div className="col-span-1 flex">
                        <span className="text-[1.4rem] text-[#808080] my-auto">09-09-2024</span>
                    </div>
                    <div className="col-span-1 flex">
                        <span className="text-[1.3rem] text-green-600 my-auto">Đang tuyển</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-3">
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <FaRegEye />
                        </div>
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <GoPencil />
                        </div>
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <RiDeleteBin6Line />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-16 px-10 py-7 border-b">
                    <div className="col-span-2 flex items-start gap-5">
                        <div className="w-[45px] h-[45px] rounded-lg border border-black">
                            <img src="" alt="avatar" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div>
                            <Link href="#" className="block w-full text-[1.8rem] font-semibold truncate-2">
                                Thực tập sinh IT support Thực tập sinh IT support Thực tập sinh IT support
                            </Link>
                            <p className="text-[1.4rem] text-[#808080] mt-5">
                                <span className="flex items-center gap-3">
                                    <AiOutlineDollar className="text-[1.8rem]" />
                                    <span>Thỏa thuận</span>
                                </span>
                                <span className="flex items-center gap-3">
                                    <IoLocationOutline className="text-[1.8rem]" />
                                    <span>Thành phố Hồ Chí Minh</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 flex">
                        <Link href="#" className="text-[1.5rem] underline text-blue-600 my-auto">
                            3+ ứng cử
                        </Link>
                    </div>
                    <div className="col-span-1 flex">
                        <span className="text-[1.4rem] text-[#808080] my-auto">09-09-2024</span>
                    </div>
                    <div className="col-span-1 flex">
                        <span className="text-[1.3rem] text-green-600 my-auto">Đang tuyển</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-3">
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <FaRegEye />
                        </div>
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <GoPencil />
                        </div>
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <RiDeleteBin6Line />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-16 px-10 py-7 border-b">
                    <div className="col-span-2 flex items-start gap-5">
                        <div className="w-[45px] h-[45px] rounded-lg border border-black">
                            <img src="" alt="avatar" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div>
                            <Link href="#" className="block w-full text-[1.8rem] font-semibold truncate-2">
                                Thực tập sinh IT support Thực tập sinh IT support Thực tập sinh IT support
                            </Link>
                            <p className="text-[1.4rem] text-[#808080] mt-5">
                                <span className="flex items-center gap-3">
                                    <AiOutlineDollar className="text-[1.8rem]" />
                                    <span>Thỏa thuận</span>
                                </span>
                                <span className="flex items-center gap-3">
                                    <IoLocationOutline className="text-[1.8rem]" />
                                    <span>Thành phố Hồ Chí Minh</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 flex">
                        <Link href="#" className="text-[1.5rem] underline text-blue-600 my-auto">
                            3+ ứng cử
                        </Link>
                    </div>
                    <div className="col-span-1 flex">
                        <span className="text-[1.4rem] text-[#808080] my-auto">09-09-2024</span>
                    </div>
                    <div className="col-span-1 flex">
                        <span className="text-[1.3rem] text-green-600 my-auto">Đang tuyển</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-3">
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <FaRegEye />
                        </div>
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <GoPencil />
                        </div>
                        <div className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg">
                            <RiDeleteBin6Line />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageJobs;
