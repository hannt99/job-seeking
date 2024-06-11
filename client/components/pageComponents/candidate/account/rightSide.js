'use client';

import { FaCircleCheck } from 'react-icons/fa6';

const RightSide = () => {
    return (
        <div className="w-full bg-white custom-shadow-v1 p-7 space-y-5">
            <div className="flex items-center gap-7">
                <div className="w-[85px] h-[85px] rounded-full border border-black">
                    <img
                        src="http://localhost:8080/static/1718027555670-avatar-shin-cute-3.jpg"
                        alt="avatar"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <div className="flex-1">
                    <span className="text-[1.5rem]">Chào mừng trở lại,</span>
                    <h2 className="text-[1.8rem] font-semibold">Trinh Phieu An</h2>
                    <span className="text-[1.1rem] text-white bg-[#808080] px-3 py-1.5 rounded-md">
                        TÀI KHOẢN ĐÃ XÁC THỰC
                    </span>
                </div>
            </div>
            <hr></hr>
            <div className="space-y-5">
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div class="relative w-20 h-10 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--secondary-color)] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
                    <span class="ms-3 text-[1.5rem] font-semibold text-[#cccccc]">Đang tắt tìm việc</span>
                </label>
                <p className="text-[1.3rem]">
                    Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều hơn trong danh sách tìm kiếm của
                    NTD.
                </p>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div class="relative w-20 h-10 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--secondary-color)] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
                    <span class="ms-3 text-[1.5rem] font-semibold text-[#cccccc]">Cho phép NTD tìm kiếm hồ sơ</span>
                </label>
                <p className="text-[1.5rem]">Khi có cơ hội việc làm phù hợp, NTD sẽ liên hệ và trao đổi với bạn qua:</p>
                <div className="space-y-2">
                    <p className="flex items-center gap-3">
                        <FaCircleCheck className="text-[var(--primary-color)]" />
                        <span className="text-[1.5rem]">Nhắn tin trực tiếp qua TimViecNhanh</span>
                    </p>
                    <p className="flex items-center gap-3">
                        <FaCircleCheck className="text-[var(--primary-color)]" />
                        <span className="text-[1.5rem]">Email và Số điện thoại của bạn</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RightSide;
