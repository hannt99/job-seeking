import { useState } from 'react';
import { FaEnvelope, FaPhone, FaFeatherPointed, FaCheck, FaRegCircleXmark } from 'react-icons/fa6';
import axios from 'axios';
import { success } from '@/utils/toastMessage';
import { socket } from '@/socket';

const ApplicantCard = (props) => {
    const [openCoverLetter, setOpenCoverLetter] = useState(false);

    const handleDecideApply = async (status, userId) => {
        const data = {
            status,
            userId,
        };
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/job/decide-applicant/${props.jobId}`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        if (res?.data?.code === 200) {
            socket.emit('sendNotification', {
                receiverId: res?.data?.receiverId,
            });
            props.setReRender(false);
            return success(res?.data?.message);
        } else {
            return;
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 border-b p-5">
                <div className="w-[100px] h-[100px] md:w-[70px] md:h-[70px] border border-black rounded-full">
                    <img src={props?.avatar} alt="user avatar" className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-[2rem] font-medium">{props?.fullName}</h2>
                    <div className="block md:flex flex-wrap items-center gap-5">
                        <p className="flex items-center justify-center gap-2 text-[#808080]">
                            <FaEnvelope />
                            <span>{props?.email}</span>
                        </p>
                        <p className="flex items-center justify-center gap-2 text-[#808080]">
                            <FaPhone />
                            <span>{props?.phone}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-8 mt-5">
                        <a
                            href={props?.cvPath}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="block underline text-blue-700"
                        >
                            CV ứng viên
                        </a>
                        <div
                            onClick={() => setOpenCoverLetter(!openCoverLetter)}
                            className="font-medium hover:underline cursor-pointer"
                        >
                            Thư giới thiệu
                        </div>
                    </div>
                    {props?.status === 'Đã ứng tuyển' ? (
                        <div className="flex justify-center md:justify-start items-center gap-5 mt-5">
                            <div
                                onClick={() => handleDecideApply('Phù hợp', props?.userId)}
                                className="bg-[var(--secondary-color)] text-[var(--primary-color)] text-[1.8rem] p-3 rounded-lg cursor-pointer"
                            >
                                <FaCheck />
                            </div>
                            <div
                                onClick={() => handleDecideApply('Chưa phù hợp', props?.userId)}
                                className="bg-red-200 text-red-600 text-[1.8rem] p-3 rounded-lg cursor-pointer"
                            >
                                <FaRegCircleXmark />
                            </div>
                        </div>
                    ) : (
                        <p className="text-[#808080] space-x-2 mt-5">
                            <span>Trạng thái:</span>
                            <span
                                className={`${
                                    props?.status === 'Phù hợp' ? 'text-green-600' : 'text-red-600'
                                } font-medium`}
                            >
                                {props?.status}
                            </span>
                        </p>
                    )}
                </div>
            </div>
            {openCoverLetter && (
                <div className="mt-5">
                    <h3 className="flex items-center gap-3">
                        <FaFeatherPointed className="text-[2rem] text-[var(--primary-color)]" />
                        <span className="font-semibold">Thư giới thiệu</span>
                    </h3>
                    <p className="text-[1.5rem] text-[#808080] whitespace-pre-wrap border-2 border-dashed mt-3 p-3 rounded-lg">
                        {props?.coverLetter}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ApplicantCard;
