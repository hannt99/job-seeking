'use client';

import { useState, useEffect } from 'react';
import { RiLockPasswordFill, RiLogoutBoxLine, RiArrowDropDownFill } from 'react-icons/ri';
import Link from 'next/link';
import { passwordValidator } from '@/utils/formValidation';
import { success, error } from '@/utils/toastMessage';
import Loading from '@/components/loading';

const HeaderXSidebar = () => {
    const [showChangePassword, setShowChangePassword] = useState(false);
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
    };

    const handleLogout = () => {};

    return (
        <>
            <div className="flex items-center justify-between border w-full min-h-[60px]">
                <div></div>
                <div className="group relative flex items-center mr-4 cursor-pointer">
                    <div className="w-[40px] h-[40px] border border-black rounded-full">
                        <img
                            className="w-full h-full object-cover rounded-full"
                            src="https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-man-avatar-isolated-on-white-background-png-image_4891418.png"
                            alt="avatar"
                        />
                    </div>
                    <div className="text-[2.4rem]">
                        <RiArrowDropDownFill />
                    </div>
                    <div className="group-hover:block hidden absolute top-[100%] right-0 w-[300px] rounded-lg transition-all cursor-default">
                        <ul className="bg-white shadow-md border border-[#cccccc]/30 rounded-lg pb-3">
                            <li className="px-6 py-4 rounded-lg">
                                <Link href="#" className="block px-5 border border-[#cccccc]/30 shadow-md rounded-lg">
                                    <div className="flex items-center gap-3 w-full py-3">
                                        <div className="w-[36px] h-[36px]">
                                            <img
                                                src="https://png.pngtree.com/png-vector/20220608/ourmid/pngtree-man-avatar-isolated-on-white-background-png-image_4891418.png"
                                                alt="user avatar"
                                                className="w-full h-full border border-black object-cover rounded-full"
                                            />
                                        </div>
                                        <span className="text-[1.3rem] font-semibold max-w-[156px] truncate">
                                            Han Nguyen
                                        </span>
                                    </div>
                                    <div className="border-t text-[1.3rem] font-semibold py-3">
                                        Xem thông tin cá nhân
                                    </div>
                                </Link>
                            </li>
                            <li
                                onClick={() => setShowChangePassword(true)}
                                className="flex items-center gap-3 px-6 py-4 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] rounded-lg mx-3 cursor-pointer"
                            >
                                <div className="flex w-[30px] h-[30px] bg-[#cccccc]/50 rounded-full">
                                    <RiLockPasswordFill className="m-auto" />
                                </div>
                                <span className="whitespace-nowrap">Thay đối mật khẩu</span>
                            </li>
                            <li
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-6 py-4 hover:bg-[var(--second-color)] hover:text-[var(--primary-color)] rounded-lg mx-3 cursor-pointer"
                            >
                                <div className="flex w-[30px] h-[30px] bg-[#cccccc]/50 rounded-full">
                                    <RiLogoutBoxLine className="m-auto" />
                                </div>
                                <span className="whitespace-nowrap">Đăng xuất</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {showChangePassword && (
                <div
                    onClick={() => setShowChangePassword(false)}
                    className="fixed top-0 left-0 bottom-0 right-0 z-50 bg-black/30 flex w-full h-screen items-center justify-center px-5"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white w-full md:w-[450px] h-fit px-9 py-8 rounded-lg"
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
                                        passwordValidator(
                                            oldPassword,
                                            oldPassword,
                                            setIsOldPasswordErr,
                                            setOldPasswordErrMsg,
                                        )
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
                                        passwordValidator(
                                            newPassword,
                                            newPassword,
                                            setIsNewPasswordErr,
                                            setNewPasswordErrMsg,
                                        )
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
            )}
        </>
    );
};

export default HeaderXSidebar;
