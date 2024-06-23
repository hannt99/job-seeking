'use client';

import { IoBriefcaseOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlineRecommend } from 'react-icons/md';
import { FaRegBell, FaXmark } from 'react-icons/fa6';
import Link from 'next/link';

const Dashboard = () => {
    return (
        <div className="p-10">
            <h1 className="text-[2.4rem] font-semibold">Bảng tin!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-11 mt-10">
                <div className="flex items-center justify-between w-full bg-white rounded-lg custom-shadow-v1 p-10">
                    <div className="flex w-[70px] h-[70px] bg-blue-100 rounded-lg">
                        <IoBriefcaseOutline className="text-blue-700 text-[4rem] m-auto" />
                    </div>
                    <div className="text-right">
                        <span className="block text-[2.8rem] font-semibold">100</span>
                        <span className="block text-[1.4rem]">Việc làm đã tạo</span>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full bg-white rounded-lg custom-shadow-v1 p-10">
                    <div className="flex w-[70px] h-[70px] bg-red-100 rounded-lg">
                        <IoDocumentTextOutline className="text-red-700 text-[4rem] m-auto" />
                    </div>
                    <div className="text-right">
                        <span className="block text-[2.8rem] font-semibold">100</span>
                        <span className="block text-[1.4rem]">Đơn ứng tuyển</span>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full bg-white rounded-lg custom-shadow-v1 p-10">
                    <div className="flex w-[70px] h-[70px] bg-orange-100 rounded-lg">
                        <MdOutlineRecommend className="text-orange-400 text-[4rem] m-auto" />
                    </div>
                    <div className="text-right">
                        <span className="block text-[2.8rem] font-semibold">100</span>
                        <span className="block text-[1.4rem]">Gợi ý ứng viên</span>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full bg-white rounded-lg custom-shadow-v1 p-10">
                    <div className="flex w-[70px] h-[70px] bg-green-100 rounded-lg">
                        <FaRegBell className="text-green-700 text-[4rem] m-auto" />
                    </div>
                    <div className="text-right">
                        <span className="block text-[2.8rem] font-semibold">100</span>
                        <span className="block text-[1.4rem]">Thông báo</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-10 mt-10">
                <div className="col-span-2 bg-white p-10 rounded-lg custom-shadow-v1">
                    <h2 className="font-semibold text-[1.8rem]">Biểu đồ ứng tuyển</h2>
                </div>
                <div className="col-span-1 bg-white p-10 rounded-lg custom-shadow-v1">
                    <h2 className="font-semibold text-[1.8rem]">Thông báo</h2>
                    <ul className="w-full mt-10 space-y-2">
                        <li className="group/item-list relative flex items-center gap-5 w-full py-3 text-[1.4rem]">
                            <div className="flex w-[35px] h-[35px] bg-blue-100 rounded-full">
                                <IoBriefcaseOutline className="text-blue-700 text-[1.8rem] m-auto" />
                            </div>
                            <div className="flex-1 w-full space-y-1">
                                <p title={'Bạn có 1 đơn ứng tuyển mới'} className="truncate-1">
                                    Bạn có 1 đơn ứng tuyển mới Bạn có 1 đơn ứng tuyển mớiBạn có 1 đơn ứng tuyển mới
                                </p>
                                <p className="text-[1rem]">3 giờ trước</p>
                            </div>
                            <div className="hidden absolute top-[50%] translate-y-[-50%] right-0 w-[30px] h-[30px] bg-white text-[1.8rem] leading-none rounded-full custom-shadow-v2 group-hover/item-list:flex">
                                <FaXmark className="m-auto" />
                            </div>
                        </li>
                        <li className="group/item-list relative flex items-center gap-5 w-full py-3 text-[1.4rem]">
                            <div className="flex w-[35px] h-[35px] bg-blue-100 rounded-full">
                                <IoBriefcaseOutline className="text-blue-700 text-[1.8rem] m-auto" />
                            </div>
                            <div className="flex-1 w-full space-y-1">
                                <p title={'Bạn có 1 đơn ứng tuyển mới'} className="truncate-1">
                                    Bạn có 1 đơn ứng tuyển mới Bạn có 1 đơn ứng tuyển mớiBạn có 1 đơn ứng tuyển mới
                                </p>
                                <p className="text-[1rem]">3 giờ trước</p>
                            </div>
                            <div className="hidden absolute top-[50%] translate-y-[-50%] right-0 w-[30px] h-[30px] bg-white text-[1.8rem] leading-none rounded-full custom-shadow-v2 group-hover/item-list:flex">
                                <FaXmark className="m-auto" />
                            </div>
                        </li>
                        <li className="group/item-list relative flex items-center gap-5 w-full py-3 text-[1.4rem]">
                            <div className="flex w-[35px] h-[35px] bg-blue-100 rounded-full">
                                <IoBriefcaseOutline className="text-blue-700 text-[1.8rem] m-auto" />
                            </div>
                            <div className="flex-1 w-full space-y-1">
                                <p title={'Bạn có 1 đơn ứng tuyển mới'} className="truncate-1">
                                    Bạn có 1 đơn ứng tuyển mới Bạn có 1 đơn ứng tuyển mớiBạn có 1 đơn ứng tuyển mới
                                </p>
                                <p className="text-[1rem]">3 giờ trước</p>
                            </div>
                            <div className="hidden absolute top-[50%] translate-y-[-50%] right-0 w-[30px] h-[30px] bg-white text-[1.8rem] leading-none rounded-full custom-shadow-v2 group-hover/item-list:flex">
                                <FaXmark className="m-auto" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
