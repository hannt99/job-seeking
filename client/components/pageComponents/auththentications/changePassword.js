'use client';

import { useState } from 'react';
import axios from 'axios';
import { passwordValidator } from '@/utils/formValidation';
import { success, error } from '@/utils/toastMessage';
import Loading from '@/components/loading';

const ChangePassword = ({ setShowChangePassword }) => {
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

    const handleChangePassword = async (e) => {
        e.preventDefault();

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
        <div
            onClick={() => setShowChangePassword(false)}
            className="fixed top-0 left-0 bottom-0 right-0 z-50 bg-black/30 flex w-full h-screen items-center justify-center px-5"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full md:w-[450px] h-fit px-9 py-8 rounded-lg animate-fadeIn"
            >
                <div className="font-bold text-center tracking-widest text-[2.4rem] text-[var(--primary-color)]">
                    TimViecNhanh
                </div>
                <h1 className="font-semibold text-[2rem] my-7">Thay đổi mật khẩu</h1>
                <form>
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Mật khẩu cũ<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
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
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Mật khẩu mới<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
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
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Xác nhận mật khẩu<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
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
                    <button
                        onClick={handleChangePassword}
                        className="flex items-center justify-center gap-3 w-full bg-[var(--primary-color)] text-white font-medium py-3 mt-7 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all"
                    >
                        {isLoading && <Loading />}
                        <span>Lưu</span>
                    </button>
                </form>
                <div className="text-center text-[1.5rem] text-[#aaaaaa] font-medium mt-12">
                    © 2024 TimViecNhanh. Designed by Han.
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
