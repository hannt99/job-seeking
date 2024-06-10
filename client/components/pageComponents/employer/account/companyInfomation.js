'use client';

import { useState, useEffect } from 'react';
import { fullNameValidator, numberValidator, dropListValidator } from '@/utils/formValidation';
import axios from 'axios';
import Loading from '@/components/loading';
import { success, error } from '@/utils/toastMessage';

const CompanyInfomation = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyNameErrMsg, setCompanyNameErrMsg] = useState({});
    const [isCompanyNameErr, setIsCompanyNameErr] = useState(false);
    const [companySize, setCompanySize] = useState(Number);
    const [companySizeErrMsg, setCompanySizeErrMsg] = useState({});
    const [isCompanySizeErr, setIsCompanySizeErr] = useState(false);
    const [position, setPosition] = useState('');
    const [positionErrMsg, setPositionErrMsg] = useState({});
    const [isPositionErr, setIsPositionErr] = useState(false);
    const [allProvinces, setAllProvinces] = useState([]);
    const [province, setProvince] = useState('');
    const [provinceErrMsg, setProvinceErrMsg] = useState({});
    const [isProvinceErr, setIsProvinceErr] = useState(false);
    const [allDistricts, setAllDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [reRender, setReRender] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateInfo = async () => {
        const isCompanyNameValid = fullNameValidator(companyName, setIsCompanyNameErr, setCompanyNameErrMsg);
        const isCompanySizeValid = numberValidator(companySize, setIsCompanySizeErr, setCompanySizeErrMsg);
        const isPositionValid = dropListValidator(position, setIsPositionErr, setPositionErrMsg);
        const isProvinceValid = dropListValidator(province, setIsProvinceErr, setProvinceErrMsg);

        if (!isCompanyNameValid || !isCompanySizeValid || !isPositionValid || !isProvinceValid) return;

        setIsLoading(true);
        const jsonObject = new Function('return ' + province)();

        const data = {
            companyName,
            companySize,
            position,
            companyAddress: { district, jsonObject },
            introduction,
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
        const fetchProvinces = async () => {
            const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
            setAllProvinces(res?.data?.data);
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            const jsonObject = new Function('return ' + province)();

            const provinceId = jsonObject?.id;
            const res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
            setAllDistricts(res?.data?.data);
        };
        fetchDistricts();
    }, [province]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/get-current-user`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });

            if (res?.data?.code === 200) {
                setCompanyName(res?.data?.currentUser?.companyName);
                setCompanySize(res?.data?.currentUser?.companySize);
                setPosition(res?.data?.currentUser?.position);
                setProvince(JSON.stringify(res?.data?.currentUser?.companyAddress?.jsonObject));
                setDistrict(res?.data?.currentUser?.companyAddress?.district);
                setIntroduction(res?.data?.currentUser?.introduction);

                return;
            } else {
                return;
            }
        };
        fetchUser();
    }, [reRender]);

    return (
        <>
            <h2 className="pl-4 border-l-4 border-red-600 font-semibold text-[1.8rem]">Thông tin công ty</h2>
            <div className="grid grid-cols-2 gap-5 mt-7">
                <div className="flex items-center gap-5">
                    <div className="w-[45px] h-[45px] border border-black rounded-full">
                        {/* <img src={avatar} alt="user avatar" className="w-full h-full object-cover rounded-full" /> */}
                    </div>
                    <button className="font-medium hover:underline">Đổi avatar</button>
                </div>
            </div>
            <div className="space-y-4 mt-3">
                <label className="font-semibold text-[1.5rem]">
                    Tên công ty<span className="text-[1.8rem] text-red-600">*</span>
                </label>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    onBlur={() => fullNameValidator(companyName, setIsCompanyNameErr, setCompanyNameErrMsg)}
                    placeholder="Công ty TNHH ABC"
                    className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                        isCompanyNameErr ? 'border-red-600' : ''
                    }`}
                />
                <p className="text-red-600 text-[1.3rem]">{companyNameErrMsg.companyName}</p>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-3">
                <div className="space-y-4">
                    <label className="font-semibold text-[1.5rem]">
                        Quy mô<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <input
                        type="number"
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                        onBlur={() => numberValidator(companySize, setIsCompanySizeErr, setCompanySizeErrMsg)}
                        placeholder="1-9999"
                        className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                            isCompanySizeErr ? 'border-red-600' : ''
                        }`}
                    />
                    <p className="text-red-600 text-[1.3rem]">{companySizeErrMsg.number}</p>
                </div>
                <div className="space-y-4">
                    <label className="font-semibold text-[1.5rem]">
                        Vị trí công tác<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <select
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        onBlur={() => dropListValidator(position, setIsPositionErr, setPositionErrMsg)}
                        className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                            isPositionErr ? 'border-red-600' : ''
                        }`}
                    >
                        <option value="">-- Chức vụ --</option>
                        <option value="Nhân viên">Nhân viên</option>
                        <option value="Trưởng nhóm">Trưởng nhóm</option>
                        <option value="Trưởng phòng">Trưởng phòng</option>
                        <option value="Phó giám đốc">Phó giám đốc</option>
                        <option value="Giám đốc">Giám đốc</option>
                    </select>
                    <p className="text-red-600 text-[1.3rem]">{positionErrMsg.position}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
                <div className="space-y-4">
                    <label className="font-semibold text-[1.5rem]">
                        Địa điểm làm việc<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        onBlur={() => dropListValidator(province, setIsProvinceErr, setProvinceErrMsg)}
                        className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                            isProvinceErr ? 'border-red-600' : ''
                        }`}
                    >
                        <option value="">-- Tỉnh/Thành phố --</option>
                        {allProvinces?.map((p, index) => {
                            return (
                                <option key={index} value={JSON.stringify({ id: p?.id, name: p?.full_name })}>
                                    {p?.full_name}
                                </option>
                            );
                        })}
                    </select>
                    <p className="text-red-600 text-[1.3rem]">{provinceErrMsg.province}</p>
                </div>
                <div className="space-y-4">
                    <label className="block font-semibold text-[1.5rem] pb-0 md:pb-[4px]">Quận/huyện</label>
                    <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                            province ? '' : 'pointer-events-none opacity-60'
                        }`}
                    >
                        <option value="">-- Quận/huyện --</option>
                        {allDistricts?.map((d, index) => {
                            return (
                                <option key={index} value={d?.full_name}>
                                    {d?.full_name}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="space-y-4 mt-3">
                <label className="font-semibold text-[1.5rem]">Giới thiệu công ty</label>
                <textarea
                    type="text"
                    rows="4"
                    cols="50"
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                    placeholder="Mô tả ngắn về công ty"
                    className="whitespace-pre-wrap block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg"
                ></textarea>
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

export default CompanyInfomation;
