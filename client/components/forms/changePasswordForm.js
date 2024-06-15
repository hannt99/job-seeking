'use client';

import { useState } from 'react';
import axios from 'axios';
import { passwordValidator } from '@/utils/formValidation';
import { success, error } from '@/utils/toastMessage';
import Loading from '@/components/common/loading';

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordErrMsg, setOldPasswordErrMsg] = useState({});
    const [isOldPasswordErr, setIsOldPasswordErr] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordErrMsg, setNewPasswordErrMsg] = useState({});
    const [isNewPasswordErr, setIsNewPasswordErr] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState({});
    const [isConfirmPasswordErr, setIsConfirmPasswordErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePassword = async () => {
        const isOldPasswordValid = passwordValidator(
            oldPassword,
            oldPassword,
            setIsOldPasswordErr,
            setOldPasswordErrMsg,
        );
        const isNewPasswordValid = passwordValidator(
            newPassword,
            newPassword,
            setIsNewPasswordErr,
            setNewPasswordErrMsg,
        );
        const isConfirmPasswordValid = passwordValidator(
            confirmPassword,
            newPassword,
            setIsConfirmPasswordErr,
            setConfirmPasswordErrMsg,
        );
        if (!isOldPasswordValid || !isNewPasswordValid || !isConfirmPasswordValid) return;
        setIsLoading(true);
        const data = {
            oldPassword,
            newPassword,
        };
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/change-password`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        if (res?.data?.code === 200) {
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setIsLoading(false);
            return success(res?.data?.message);
        } else {
            setIsLoading(false);
            return error(res?.data?.message);
        }
    };

    return (
        <div className="p-7">
            <h2 className="pl-4 border-l-4 border-red-600 font-semibold text-[1.8rem]">Đổi mật khẩu</h2>
            <div className="p-5 border mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 mt-3">
                    <label className="font-semibold text-[1.5rem] whitespace-nowrap">
                        Mật khẩu cũ<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <div className="md:col-span-2">
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            onBlur={() =>
                                passwordValidator(oldPassword, oldPassword, setIsOldPasswordErr, setOldPasswordErrMsg)
                            }
                            placeholder="Mật khẩu cũ"
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isOldPasswordErr ? 'border-red-600' : ''
                            }`}
                        />
                        <p className="text-red-600 text-[1.3rem]">{oldPasswordErrMsg.oldPassword}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 mt-7">
                    <label className="font-semibold text-[1.5rem] whitespace-nowrap">
                        Mật khẩu mới<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <div className="md:col-span-2">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onBlur={() =>
                                passwordValidator(newPassword, newPassword, setIsNewPasswordErr, setNewPasswordErrMsg)
                            }
                            placeholder="Mật khẩu mới"
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isNewPasswordErr ? 'border-red-600' : ''
                            }`}
                        />
                        <p className="text-red-600 text-[1.3rem]">{newPasswordErrMsg.newPassword}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 mt-7">
                    <label className="font-semibold text-[1.5rem] whitespace-nowrap">
                        Xác nhận mật khẩu<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <div className="md:col-span-2">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={() =>
                                passwordValidator(
                                    confirmPassword,
                                    newPassword,
                                    setIsConfirmPasswordErr,
                                    setConfirmPasswordErrMsg,
                                )
                            }
                            placeholder="Xác nhận mật khẩu"
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isConfirmPasswordErr ? 'border-red-600' : ''
                            }`}
                        />
                        <p className="text-red-600 text-[1.3rem]">{confirmPasswordErrMsg.confirmPassword}</p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleChangePassword}
                        className="flex items-center justify-center gap-3 w-fit bg-[var(--primary-color)] text-white font-medium px-16 py-3 mt-7 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all"
                    >
                        {isLoading && <Loading />}
                        <span>Lưu</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ChangePasswordForm;
