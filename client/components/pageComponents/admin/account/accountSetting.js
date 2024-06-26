'use client';

import { useState } from 'react';
import { FaLock, FaUser, FaBuilding } from 'react-icons/fa6';
import ChangePasswordForm from '@/components/forms/changePasswordForm';
import UserInfomationForm from '@/components/forms/userInfomationForm';

const AccountSetting = () => {
    const [tab, setTab] = useState('cp');

    return (
        <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-4 custom-shadow-v1">
                <ul className="grid grid-cols-2 md:block bg-[var(--secondary-color)]">
                    <li
                        onClick={() => setTab('cp')}
                        className={`flex items-center gap-3 p-5 cursor-pointer hover:bg-white hover:text-[var(--primary-color)] transition-all ${
                            tab === 'cp' ? 'bg-white text-[var(--primary-color)]' : ''
                        }`}
                    >
                        <span className="m-auto md:m-0">
                            <FaLock />
                        </span>
                        <span className="hidden md:block text-[1.4rem] font-medium">Đổi mật khẩu</span>
                    </li>
                    <li
                        onClick={() => setTab('ui')}
                        className={`flex items-center gap-3 p-5 cursor-pointer hover:bg-white hover:text-[var(--primary-color)] transition-all ${
                            tab === 'ui' ? 'bg-white text-[var(--primary-color)]' : ''
                        }`}
                    >
                        <span className="m-auto md:m-0">
                            <FaUser />
                        </span>
                        <span className="hidden md:block text-[1.4rem] font-medium">Thông tin cá nhân</span>
                    </li>
                </ul>
                <div className="md:col-span-3 bg-white">
                    {tab === 'cp' && <ChangePasswordForm />}
                    {tab === 'ui' && <UserInfomationForm />}
                </div>
            </div>
        </div>
    );
};

export default AccountSetting;
