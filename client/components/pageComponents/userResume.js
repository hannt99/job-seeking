'use client';

import { useState } from 'react';
import { dropListValidator } from '@/utils/formValidation';

const UserResume = () => {
    const [position, setPosition] = useState('');
    const [positionErrMsg, setPositionErrMsg] = useState({});
    const [isPositionErr, setIsPositionErr] = useState(false);

    return (
        <div className="bg-white p-7">
            <h2 className="pl-4 border-l-4 border-red-600 font-semibold text-[1.8rem]">Hồ sơ việc làm</h2>
            <div className="space-y-4 mt-7">
                <label className="font-semibold text-[1.5rem]">
                    Vị trí công việc<span className="text-[1.8rem] text-red-600">*</span>
                </label>
                <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    onBlur={() => dropListValidator(position, setIsPositionErr, setPositionErrMsg)}
                    className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                        isPositionErr ? 'border-red-600' : ''
                    }`}
                >
                    <option value="">-- Vị trí --</option>
                    <option value="Nam">Nhân viên kinh doanh</option>
                    <option value="Nữ">Thư kí trưởng</option>
                    <option value="Nữ">Kĩ sư phầm mềm</option>
                </select>
                <p className="text-red-600 text-[1.3rem]">{positionErrMsg.jobPosition}</p>
            </div>
        </div>
    );
};

export default UserResume;
