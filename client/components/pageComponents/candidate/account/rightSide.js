'use client';

import { useState, useEffect, useRef, useContext } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import { TbPhotoEdit } from 'react-icons/tb';
import axios from 'axios';
import { success } from '@/utils/toastMessage';
import { UserAvatarContext } from '@/components/appLayouts/defaultLayout';

const RightSide = () => {
    const [fullName, setFullName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isAppeared, setIsAppeared] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const [reRender, setReRender] = useState(false);

    const { isChangeUserAvatar, setIsChangeUserAvatar } = useContext(UserAvatarContext);

    const ref = useRef();

    const handleChangeAppearance = async (e) => {
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/change-appearance`,
            { isAppeared: e.target.checked },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            },
        );
        if (res?.data?.code === 200) {
            setReRender(!reRender);
            return success(res?.data?.message);
        } else {
            return;
        }
    };

    const handleChangeSeekingStatus = async (e) => {
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/change-seeking-status`,
            { isSeeking: e.target.checked },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            },
        );
        if (res?.data?.code === 200) {
            setReRender(!reRender);
            return success(res?.data?.message);
        } else {
            return;
        }
    };

    const handleChangeAvatar = async (e) => {
        const data = new FormData();
        const file = e.target.files[0];
        data.append('avatar', file);
        if (!file) return;
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/change-avatar`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        if (res?.data?.code === 200) {
            setReRender(!reRender);
            ref.current.value = '';
            setIsChangeUserAvatar(!isChangeUserAvatar);
            return success(res?.data?.message);
        } else {
            return error(res?.data?.message);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/get-current-user`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                setFullName(res?.data?.currentUser?.fullName);
                setAvatar(res?.data?.currentUser?.avatar);
                setIsAppeared(res?.data?.currentUser?.isAppeared);
                setIsSeeking(res?.data?.currentUser?.isSeeking);
                return;
            } else {
                return;
            }
        };
        fetchUser();
    }, [reRender, isChangeUserAvatar]);

    return (
        <div className="w-full bg-white custom-shadow-v1 p-7 space-y-5 rounded-lg">
            <div className="flex items-center gap-7">
                <div className="relative w-[85px] h-[85px] rounded-full border border-black">
                    <img src={avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />
                    <div className="absolute bottom-0 right-0 bg-[var(--primary-color)] p-2 rounded-full">
                        <input
                            ref={ref}
                            type="file"
                            name="avatar"
                            id="avatar"
                            class="inputfile"
                            onChange={(e) => handleChangeAvatar(e)}
                        />
                        <label
                            for="avatar"
                            className="font-medium text-white text-[2rem] cursor-pointer hover:underline"
                        >
                            <TbPhotoEdit />
                        </label>
                    </div>
                </div>
                <div className="flex-1">
                    <span className="text-[1.5rem]">Chào mừng trở lại,</span>
                    <h2 className="text-[1.8rem] font-semibold">{fullName}</h2>
                    <span className="text-[1.1rem] text-white bg-[#808080] px-3 py-1.5 rounded-md">
                        TÀI KHOẢN ĐÃ XÁC THỰC
                    </span>
                </div>
            </div>
            <hr></hr>
            <div className="space-y-5">
                <label class="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isSeeking}
                        onChange={(e) => handleChangeSeekingStatus(e)}
                        class="sr-only peer"
                    />
                    <div class="relative w-20 h-10 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--secondary-color)] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
                    <span class={`ms-3 text-[1.5rem] font-semibold ${isSeeking ? 'text-black' : 'text-[#cccccc]'}`}>
                        Đang {isSeeking ? 'bật' : 'tắt'} tìm việc
                    </span>
                </label>
                <p className="text-[1.3rem]">
                    Bật tìm việc giúp hồ sơ của bạn nổi bật hơn và được chú ý nhiều hơn trong danh sách tìm kiếm của
                    NTD.
                </p>
                <label class="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isAppeared}
                        onChange={(e) => handleChangeAppearance(e)}
                        class="sr-only peer"
                    />
                    <div class="relative w-20 h-10 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--secondary-color)] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-9 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
                    <span class={`ms-3 text-[1.5rem] font-semibold ${isAppeared ? 'text-black' : 'text-[#cccccc]'}`}>
                        Cho phép NTD tìm kiếm hồ sơ
                    </span>
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
