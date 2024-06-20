'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    fullNameValidator,
    emailValidator,
    passwordValidator,
    phoneValidator,
    dropListValidator,
    numberValidatorFrom,
    numberValidatorTo,
} from '@/utils/formValidation';
import { success, error } from '@/utils/toastMessage';
import Loading from '@/components/common/loading';

const RegisterEmployer = () => {
    const [fullName, setFullName] = useState('');
    const [fullNameErrMsg, setFullNameErrMsg] = useState({});
    const [isFullNameErr, setIsFullNameErr] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState({});
    const [isEmailErr, setIsEmailErr] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState({});
    const [isPasswordErr, setIsPasswordErr] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState({});
    const [isConfirmPasswordErr, setIsConfirmPasswordErr] = useState(false);
    const [phone, setPhone] = useState('');
    const [phoneErrMsg, setPhoneErrMsg] = useState({});
    const [isPhoneErr, setIsPhoneErr] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [companyNameErrMsg, setCompanyNameErrMsg] = useState({});
    const [isCompanyNameErr, setIsCompanyNameErr] = useState(false);
    const [companySizeFrom, setCompanySizeFrom] = useState(Number);
    const [companySizeFromErrMsg, setCompanySizeFromErrMsg] = useState({});
    const [isCompanySizeFromErr, setIsCompanySizeFromErr] = useState(false);
    const [companySizeTo, setCompanySizeTo] = useState(Number);
    const [companySizeToErrMsg, setCompanySizeToErrMsg] = useState({});
    const [isCompanySizeToErr, setIsCompanySizeToErr] = useState(false);
    const [position, setPosition] = useState('');
    const [positionErrMsg, setPositionErrMsg] = useState({});
    const [isPositionErr, setIsPositionErr] = useState(false);
    const [allProvinces, setAllProvinces] = useState([]);
    const [province, setProvince] = useState('');
    const [provinceErrMsg, setProvinceErrMsg] = useState({});
    const [isProvinceErr, setIsProvinceErr] = useState(false);
    const [allDistricts, setAllDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        const isFullNameValid = fullNameValidator(fullName, setIsFullNameErr, setFullNameErrMsg);
        const isEmailValid = emailValidator(email, setIsEmailErr, setEmailErrMsg);
        const isPasswordValid = passwordValidator(password, password, setIsPasswordErr, setPasswordErrMsg);
        const isConfirmPasswordValid = passwordValidator(
            confirmPassword,
            password,
            setIsConfirmPasswordErr,
            setConfirmPasswordErrMsg,
        );
        const isPhoneValid = phoneValidator(phone, setIsPhoneErr, setPhoneErrMsg);
        const isCompanyNameValid = fullNameValidator(companyName, setIsCompanyNameErr, setCompanyNameErrMsg);
        const isCompanySizeFromValid = numberValidatorFrom(
            companySizeFrom,
            setIsCompanySizeFromErr,
            setCompanySizeFromErrMsg,
        );
        const isCompanySizeToValid = numberValidatorTo(
            companySizeTo,
            companySizeFrom,
            setIsCompanySizeToErr,
            setCompanySizeToErrMsg,
        );
        const isPositionValid = dropListValidator(position, setIsPositionErr, setPositionErrMsg);
        const isProvinceValid = dropListValidator(province, setIsProvinceErr, setProvinceErrMsg);
        if (
            !isEmailValid ||
            !isPasswordValid ||
            !isConfirmPasswordValid ||
            !isFullNameValid ||
            !isPhoneValid ||
            !isCompanyNameValid ||
            !isCompanySizeFromValid ||
            !isCompanySizeToValid ||
            !isPositionValid ||
            !isProvinceValid ||
            !isChecked
        )
            return;

        setIsLoading(true);
        const jsonObject = new Function('return ' + province)();

        const data = {
            email,
            password,
            fullName,
            phone,
            companyName,
            companySize: { from: companySizeFrom, to: companySizeTo },
            position,
            companyAddress: { district, jsonObject },
            role: 0,
        };
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);
        if (res?.data?.code === 200) {
            setFullName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setPhone('');
            setCompanyName('');
            setCompanySizeFrom('');
            setCompanySizeTo('');
            setPosition('');
            setProvince('');
            setDistrict('');
            setIsLoading(false);
            router.push('/signin');
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

    return (
        <div className="relative grid grid-cols-1 xl:grid-cols-2 w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] z-50 px-5 md:px-0">
            <div className="bg-white w-full h-fit px-9 py-8 rounded-lg">
                <div className="font-bold text-center tracking-widest text-[2.4rem] text-[var(--primary-color)]">
                    TimViecNhanh
                </div>
                <form>
                    <div className="space-y-7 mt-7">
                        <h1 className="font-semibold text-[2rem]">Đăng ký tài khoản Nhà tuyển dụng</h1>
                        <div className="space-y-4">
                            <label className="font-semibold text-[1.5rem]">
                                Địa chỉ Email<span className="text-[1.8rem] text-red-600">*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => emailValidator(email, setIsEmailErr, setEmailErrMsg)}
                                placeholder="name@example.com"
                                className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                    isEmailErr ? 'border-red-600' : ''
                                }`}
                            />
                            <p className="text-red-600 text-[1.3rem]">{emailErrMsg.email}</p>
                        </div>
                        <div className="space-y-4">
                            <label className="font-semibold text-[1.5rem]">
                                Mật khẩu<span className="text-[1.8rem] text-red-600">*</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() =>
                                    passwordValidator(password, password, setIsPasswordErr, setPasswordErrMsg)
                                }
                                placeholder="Mật khẩu"
                                className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                    isPasswordErr ? 'border-red-600' : ''
                                }`}
                            />
                            <p className="text-red-600 text-[1.3rem]">{passwordErrMsg.password}</p>
                        </div>
                        <div className="space-y-4">
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
                                        password,
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
                    <div className="space-y-7 mt-5">
                        <h2 className="text-[2rem] font-semibold">Thông tin nhà tuyển dụng</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                    Số điện thoại cá nhân<span className="text-[1.8rem] text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
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
                        <div className="space-y-4">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-4">
                                <label className="font-semibold text-[1.5rem]">
                                    Quy mô<span className="text-[1.8rem] text-red-600">*</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <input
                                            type="number"
                                            value={companySizeFrom}
                                            onChange={(e) => setCompanySizeFrom(e.target.value)}
                                            onBlur={() =>
                                                numberValidatorFrom(
                                                    companySizeFrom,
                                                    setIsCompanySizeFromErr,
                                                    setCompanySizeFromErrMsg,
                                                )
                                            }
                                            placeholder="1-9999"
                                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                                isCompanySizeFromErr ? 'border-red-600' : ''
                                            }`}
                                        />
                                        <p className="text-red-600 text-[1.3rem]">{companySizeFromErrMsg.number}</p>
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            value={companySizeTo}
                                            onChange={(e) => setCompanySizeTo(e.target.value)}
                                            onBlur={() =>
                                                numberValidatorTo(
                                                    companySizeTo,
                                                    companySizeFrom,
                                                    setIsCompanySizeToErr,
                                                    setCompanySizeToErrMsg,
                                                )
                                            }
                                            placeholder="1-9999"
                                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                                isCompanySizeToErr ? 'border-red-600' : ''
                                            }`}
                                        />
                                        <p className="text-red-600 text-[1.3rem]">{companySizeToErrMsg.number}</p>
                                    </div>
                                </div>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                            <option
                                                key={index}
                                                value={JSON.stringify({ id: p?.id, name: p?.full_name })}
                                            >
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
                    </div>
                    <div className="flex items-start space-x-3 my-9">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="accent-[var(--primary-color)] scale-125"
                        />
                        <label className="text-[1.5rem] leading-none">
                            Tôi đã đọc và đồng ý với{' '}
                            <Link href="#" className="text-[var(--primary-color)] font-medium">
                                Điều khoản dịch vụ
                            </Link>{' '}
                            và{' '}
                            <Link href="#" className="text-[var(--primary-color)] font-medium">
                                Chính sách bảo mật
                            </Link>{' '}
                            của TimViecNhanh
                        </label>
                    </div>
                    <button
                        onClick={handleRegister}
                        className={`flex items-center justify-center gap-3 w-full bg-[var(--primary-color)] text-white font-medium py-3 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all ${
                            !isChecked ? 'pointer-events-none opacity-40' : ''
                        }`}
                    >
                        {isLoading && <Loading />}
                        <span>Hoàn tất</span>
                    </button>
                </form>
                <div className="space-x-5 text-center mt-7">
                    <span className="text-[#aaaaaa] text-[1.5rem]">Bạn đã có tài khoản?</span>
                    <Link
                        href="/signin"
                        className="text-black font-medium hover:text-[var(--primary-color)] transition-all"
                    >
                        Đăng nhập
                    </Link>
                </div>
                <div className="text-center text-[1.5rem] text-[#aaaaaa] font-medium mt-12">
                    © 2024 TimViecNhanh. Designed by Han.
                </div>
            </div>
        </div>
    );
};

export default RegisterEmployer;
