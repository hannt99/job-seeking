'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { fullNameValidator, dropListValidator, phoneValidator } from '@/utils/formValidation';
import Loading from '@/components/loading';
import { success, error } from '@/utils/toastMessage';

const UserInfomation = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [fullNameErrMsg, setFullNameErrMsg] = useState({});
    const [isFullNameErr, setIsFullNameErr] = useState(false);
    const [gender, setGender] = useState('');
    const [genderErrMsg, setGenderErrMsg] = useState({});
    const [isGenderErr, setIsGenderErr] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneErrMsg, setPhoneErrMsg] = useState({});
    const [isPhoneErr, setIsPhoneErr] = useState(false);
    const [birthDate, setBirthDate] = useState('');
    const [avatar, setAvatar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reRender, setReRender] = useState(false);

    const handleUpdateInfo = async () => {
        const isFullNameValid = fullNameValidator(fullName, setIsFullNameErr, setFullNameErrMsg);
        const isPhoneValid = phoneValidator(phone, setIsPhoneErr, setPhoneErrMsg);
        const isGenderValid = dropListValidator(gender, setIsGenderErr, setGenderErrMsg);

        if (!isFullNameValid || !isPhoneValid || !isGenderValid) return;

        setIsLoading(true);
        const data = {
            fullName,
            gender,
            birthDate,
            phone,
        };
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        if (res?.data?.code === 200) {
            setIsLoading(false);
            setReRender(!reRender);
            return success(res?.data?.message);
        } else {
            setIsLoading(false);
            return error(res?.data?.message);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/get-current-user`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                setEmail(res?.data?.currentUser?.email);
                setFullName(res?.data?.currentUser?.fullName);
                setGender(res?.data?.currentUser?.gender);
                setBirthDate(res?.data?.currentUser?.birthDate);
                setPhone(res?.data?.currentUser?.phone);
                setAvatar(res?.data?.currentUser?.avatar);
                return;
            } else {
                return;
            }
        };
        fetchUser();
    }, []);

    return (
        <>
            <h2 className="pl-4 border-l-4 border-red-600 font-semibold text-[1.8rem]">Thông tin cá nhân</h2>
            <div className="grid grid-cols-2 gap-5 mt-7">
                <div className="flex items-center gap-5">
                    <div className="w-[45px] h-[45px] border border-black rounded-full">
                        <img src={avatar} alt="user avatar" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <button className="font-medium hover:underline">Đổi avatar</button>
                </div>
                <div className="space-y-4">
                    <label className="font-semibold text-[1.5rem]">
                        Địa chỉ Email<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        placeholder="name@example.com"
                        className="block w-full text-[1.5rem] bg-slate-200 border px-5 py-3 rounded-lg pointer-events-none"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-3">
                <div className="space-y-4">
                    <label className="font-semibold text-[1.5rem]">
                        Họ và tên<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={() => fullNameValidator(fullName, setIsFullNameErr, setFullNameErrMsg)}
                        placeholder="Han Nguyen"
                        className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                            isFullNameErr ? 'border-red-600' : ''
                        }`}
                    />
                    <p className="text-red-600 text-[1.3rem]">{fullNameErrMsg.fullName}</p>
                </div>
                <div className="space-y-4">
                    <label className="font-semibold text-[1.5rem]">
                        Giới tính<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        onBlur={() => dropListValidator(gender, setIsGenderErr, setGenderErrMsg)}
                        className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                            isGenderErr ? 'border-red-600' : ''
                        }`}
                    >
                        <option value="">-- Giới tính --</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                    <p className="text-red-600 text-[1.3rem]">{genderErrMsg.gender}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-3">
                <div className="space-y-4">
                    <label className="font-semibold text-[1.5rem]">Ngày sinh</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg"
                    />
                </div>
                <div className="space-y-4">
                    <label className="font-semibold text-[1.5rem]">
                        Số điện thoại cá nhân<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => phoneValidator(phone, setIsPhoneErr, setPhoneErrMsg)}
                        placeholder="0123456789"
                        className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                            isPhoneErr ? 'border-red-600' : ''
                        }`}
                    />
                    <p className="text-red-600 text-[1.3rem]">{phoneErrMsg.phone}</p>
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    onClick={handleUpdateInfo}
                    className="flex items-center justify-center gap-3 w-fit bg-[var(--primary-color)] text-white font-medium px-7 py-3 mt-7 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all"
                >
                    {isLoading && <Loading />}
                    <span>Lưu</span>
                </button>
            </div>
        </>
    );
};

export default UserInfomation;
