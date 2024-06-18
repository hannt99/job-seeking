'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), {
    ssr: false,
});
import Loading from '../common/loading';
import DropListMulti from '../common/dropListMulti';
import { dropListValidator, fullNameValidator, dateValidator, disabledPastDate } from '@/utils/formValidation';
import { success, error } from '@/utils/toastMessage';

const careers = [
    { value: 'Kinh doanh/Bán hàng', label: 'Kinh doanh/Bán hàng' },
    { value: 'Biên/Phiên dịch', label: 'Biên / Phiên dịch' },
    { value: 'Bảo hiểm', label: 'Bảo hiểm' },
];

const skills = [
    { value: 'HTML/CSS', label: 'HTML/CSS' },
    { value: 'Javascript', label: 'Javascript' },
    { value: 'React', label: 'React' },
];

const CreateJobForm = ({ formTitle }) => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleErrMsg, setJobTitleErrMsg] = useState({});
    const [isJobTitleErr, setIsJobTitleErr] = useState(false);
    const [jobType, setJobType] = useState('');
    const [jobTypeErrMsg, setJobTypeErrMsg] = useState({});
    const [isJobTypeErr, setIsJobTypeErr] = useState(false);
    const [jobDeadline, setJobDeadline] = useState('');
    const [jobDeadlineErrMsg, setJobDeadlineErrMsg] = useState({});
    const [isJobDeadlineErr, setIsJobDeadlineErr] = useState(false);
    const [jobDesc, setJobDesc] = useState('');
    const [position, setPosition] = useState('');
    const [positionErrMsg, setPositionErrMsg] = useState({});
    const [isPositionErr, setIsPositionErr] = useState(false);
    const [career, setCareer] = useState(null);
    const [careerErrMsg, setCareerErrMsg] = useState({});
    const [isCareerErr, setIsCareerErr] = useState(false);
    const [skill, setSkill] = useState(null);
    const [skillErrMsg, setSkillErrMsg] = useState({});
    const [isSkillErr, setIsSkillErr] = useState(false);
    const [exp, setExp] = useState(null);
    const [expErrMsg, setExpErrMsg] = useState({});
    const [isExpErr, setIsExpErr] = useState(false);
    const [salaryRange, setSalaryRange] = useState(null);
    const [salaryRangeErrMsg, setSalaryRangeErrMsg] = useState({});
    const [isSalaryRangeErr, setIsSalaryRangeErr] = useState(false);
    const [workingLocation, setWorkingLocation] = useState(null);
    const [workingLocationErrMsg, setWorkingLocationErrMsg] = useState({});
    const [isWorkingLocationErr, setIsWorkingLocationErr] = useState(false);
    const [allProvinces, setAllProvinces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCreateJob = async () => {
        const isTitleValid = fullNameValidator(jobTitle, setIsJobTitleErr, setJobTitleErrMsg);
        const isDeadlineValid = dateValidator(jobDeadline, setIsJobDeadlineErr, setJobDeadlineErrMsg);
        const isPositionValid = dropListValidator(position, setIsPositionErr, setPositionErrMsg);
        const isCareerValid = dropListValidator(career, setIsCareerErr, setCareerErrMsg);
        const isSkillValid = dropListValidator(skill, setIsSkillErr, setSkillErrMsg);
        const isExpValid = dropListValidator(exp, setIsExpErr, setExpErrMsg);
        const isSalaryRangeValid = dropListValidator(salaryRange, setIsSalaryRangeErr, setSalaryRangeErrMsg);
        const isWorkingLocationValid = dropListValidator(
            workingLocation,
            setIsWorkingLocationErr,
            setWorkingLocationErrMsg,
        );
        if (
            !isTitleValid ||
            !isDeadlineValid ||
            !isCareerValid ||
            !isSkillValid ||
            !isPositionValid ||
            !isExpValid ||
            !isSalaryRangeValid ||
            !isWorkingLocationValid
        )
            return;
        setIsLoading(true);

        const data = {
            jobTitle,
            jobType,
            jobDeadline,
            jobDesc,
            jobPosition: position,
            jobCareers: career,
            jobSkills: skill,
            jobExp: exp,
            jobSalaryRange: salaryRange,
            jobWorkingLocation: workingLocation,
        };

        let res;

        if (searchParams.get('requestId')) {
            res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/job/update/${searchParams.get('requestId')}`,
                data,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                },
            );
        } else {
            res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/job/create`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
        }
        if (res?.data?.code === 200) {
            setIsLoading(false);
            router.push('/employer/manage-jobs');
            return success(res?.data?.message);
        } else {
            setIsLoading(false);
            return error(res?.data?.message);
        }
    };

    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
            const result = res?.data?.data?.map((item) => {
                return { value: item?.name, label: item?.name };
            });
            setAllProvinces(result);
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (!searchParams.get('requestId')) return;
        const fetchJob = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job/get/${searchParams.get('requestId')}`);
            if (res?.data?.code === 200) {
                setJobTitle(res?.data?.job?.jobTitle);
                setJobType(res?.data?.job?.jobType);
                setJobDeadline(res?.data?.job?.jobDeadline);
                setPosition(res?.data?.job?.jobPosition);
                setCareer(res?.data?.job?.jobCareers);
                setExp(res?.data?.job?.jobExp);
                setSkill(res?.data?.job?.jobSkills);
                setSalaryRange(res?.data?.job?.jobSalaryRange);
                setWorkingLocation(res?.data?.job?.jobWorkingLocation);
                setJobDesc(res?.data?.job?.jobDesc);
                return;
            } else {
                return;
            }
        };
        fetchJob();
    }, [searchParams.get('requestId')]);

    return (
        <div className="p-10">
            <div className="bg-white p-7">
                <h2 className="pl-4 border-l-4 border-red-600 font-semibold text-[1.8rem] mb-5">{formTitle}</h2>
                <div className="block md:grid grid-cols-2 gap-5">
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Tên công việc<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            onBlur={() => fullNameValidator(jobTitle, setIsJobTitleErr, setJobTitleErrMsg)}
                            placeholder="Thực tập sinh IT support"
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isJobTitleErr ? 'border-red-600' : ''
                            }`}
                        />
                        <p className="text-red-600 text-[1.3rem]">{jobTitleErrMsg.jobTitle}</p>
                    </div>
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Ngày hết hạn<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            value={jobDeadline}
                            min={disabledPastDate()}
                            onChange={(e) => setJobDeadline(e.target.value)}
                            onBlur={() => dateValidator(jobDeadline, setIsJobDeadlineErr, setJobDeadlineErrMsg)}
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isJobDeadlineErr ? 'border-red-600' : ''
                            }`}
                        />
                        <p className="text-red-600 text-[1.3rem]">{jobDeadlineErrMsg.jobDeadline}</p>
                    </div>
                </div>
                <div className="block md:grid grid-cols-2 gap-5">
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
                            <option value="Nhân viên kinh doanh">Nhân viên kinh doanh</option>
                            <option value="Thư kí trưởng">Thư kí trưởng</option>
                            <option value="Kĩ sư phầm mềm">Kĩ sư phầm mềm</option>
                        </select>
                        <p className="text-red-600 text-[1.3rem]">{positionErrMsg.jobPosition}</p>
                    </div>
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Hình thức<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <select
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            onBlur={() => dropListValidator(jobType, setIsJobTypeErr, setJobTypeErrMsg)}
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isJobTypeErr ? 'border-red-600' : ''
                            }`}
                        >
                            <option value="">-- Hình thức --</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Part time">Part time</option>
                            <option value="Full time">Full time</option>
                            <option value="Thời vụ">Thời vụ</option>
                        </select>
                        <p className="text-red-600 text-[1.3rem]">{jobTypeErrMsg.jobType}</p>
                    </div>
                </div>
                <div className="space-y-4 mt-7">
                    <label className="font-semibold text-[1.5rem]">
                        Ngành nghề<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <select
                        value={career}
                        onChange={(e) => setCareer(e.target.value)}
                        onBlur={() => dropListValidator(career, setIsCareerErr, setCareerErrMsg)}
                        className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                            isCareerErr ? 'border-red-600' : ''
                        }`}
                    >
                        <option value="">-- Ngành nghề --</option>
                        {careers?.map((c, index) => {
                            return (
                                <option key={index} value={c?.value}>
                                    {c?.label}
                                </option>
                            );
                        })}
                    </select>
                    <p className="text-red-600 text-[1.3rem]">{careerErrMsg.jobCareer}</p>
                </div>
                <div className="block md:grid grid-cols-2 gap-5">
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Kinh nghiệm<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <select
                            value={exp}
                            onChange={(e) => setExp(e.target.value)}
                            onBlur={() => dropListValidator(exp, setIsExpErr, setExpErrMsg)}
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isExpErr ? 'border-red-600' : ''
                            }`}
                        >
                            <option value="">-- Kinh nghiệm --</option>
                            <option value="Chưa có kinh nghiệm">Chưa có kinh nghiệm</option>
                            <option value="Dưới 1 năm">Dưới 1 năm</option>
                            <option value="1 năm">1 năm</option>
                            <option value="2 năm">2 năm</option>
                            <option value="3 năm">3 năm</option>
                            <option value="4 năm">4 năm</option>
                            <option value="5 năm">5 năm</option>
                            <option value="Trên 5 năm">Trên 5 năm</option>
                        </select>
                        <p className="text-red-600 text-[1.3rem]">{expErrMsg.jobExp}</p>
                    </div>
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Kỹ năng<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <DropListMulti
                            value={skill}
                            onChange={setSkill}
                            onBlur={() => dropListValidator(skill, setIsSkillErr, setSkillErrMsg)}
                            options={skills}
                            placeholder="-- Kỹ năng --"
                            msg={skillErrMsg.jobCareer}
                            isErr={isSkillErr}
                        />
                    </div>
                </div>
                <div className="block md:grid grid-cols-2 gap-5">
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Mức lương<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <select
                            value={salaryRange}
                            onChange={(e) => setSalaryRange(e.target.value)}
                            onBlur={() => dropListValidator(salaryRange, setIsSalaryRangeErr, setSalaryRangeErrMsg)}
                            className={`block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg ${
                                isSalaryRangeErr ? 'border-red-600' : ''
                            }`}
                        >
                            <option value="">-- Mức lương --</option>
                            <option value="Dưới 10 triệu">Dưới 10 triệu</option>
                            <option value="15 - 20 triệu">15 - 20 triệu</option>
                            <option value="20 - 25 triệu">20 - 25 triệu</option>
                            <option value="25 - 30 triệu">25 - 30 triệu</option>
                            <option value="30 - 50 triệu">30 - 50 triệu</option>
                            <option value="Trên 50 triệu">Trên 50 triệu</option>
                            <option value="Thỏa thuận">Thỏa thuận</option>
                        </select>
                        <p className="text-red-600 text-[1.3rem]">{salaryRangeErrMsg.jobSalaryRange}</p>
                    </div>
                    <div className="space-y-4 mt-7">
                        <label className="font-semibold text-[1.5rem]">
                            Địa điểm làm việc<span className="text-[1.8rem] text-red-600">*</span>
                        </label>
                        <DropListMulti
                            value={workingLocation}
                            onChange={setWorkingLocation}
                            onBlur={() =>
                                dropListValidator(workingLocation, setIsWorkingLocationErr, setWorkingLocationErrMsg)
                            }
                            options={allProvinces}
                            placeholder="-- Địa điểm --"
                            msg={workingLocationErrMsg.jobLocation}
                            isErr={isWorkingLocationErr}
                        />
                    </div>
                </div>
                <div className="space-y-4 mt-7">
                    <label className="font-semibold text-[1.5rem]">Mô tả công việc</label>
                    <JoditEditor value={jobDesc} tabIndex={1} onChange={(newContent) => setJobDesc(newContent)} />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleCreateJob}
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

export default CreateJobForm;
