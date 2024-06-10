'use client';

import { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa6';
import { MdApartment } from 'react-icons/md';
import ChangeEmployerPassword from './changeEmployerPassword';
import UserInfomation from './userInfomation';
import CompanyInfomation from './companyInfomation';

const AccountSetting = () => {
    const [tab, setTab] = useState('cp');

    return (
        <div className="p-10">
            <div className="grid grid-cols-4 custom-shadow-v1">
                <ul className="bg-[var(--secondary-color)]">
                    <li
                        onClick={() => setTab('cp')}
                        className={`flex items-center gap-3 p-5 cursor-pointer hover:bg-white hover:text-[var(--primary-color)] ${
                            tab === 'cp' ? 'bg-white text-[var(--primary-color)]' : ''
                        }`}
                    >
                        <FaLock />
                        <span className="text-[1.4rem] font-medium">Đổi mật khẩu</span>
                    </li>
                    <li
                        onClick={() => setTab('ui')}
                        className={`flex items-center gap-3 p-5 cursor-pointer hover:bg-white hover:text-[var(--primary-color)] ${
                            tab === 'ui' ? 'bg-white text-[var(--primary-color)]' : ''
                        }`}
                    >
                        <FaUser />
                        <span className="text-[1.4rem] font-medium">Thông tin cá nhân</span>
                    </li>
                    <li
                        onClick={() => setTab('ci')}
                        className={`flex items-center gap-3 p-5 cursor-pointer hover:bg-white hover:text-[var(--primary-color)] ${
                            tab === 'ci' ? 'bg-white text-[var(--primary-color)]' : ''
                        }`}
                    >
                        <MdApartment />
                        <span className="text-[1.4rem] font-medium">Thông tin công ty</span>
                    </li>
                </ul>
                <div className="col-span-3 bg-white p-7">
                    {tab === 'cp' && <ChangeEmployerPassword />}
                    {tab === 'ui' && <UserInfomation />}
                    {tab === 'ci' && <CompanyInfomation />}
                </div>
            </div>
        </div>
    );
};

export default AccountSetting;
