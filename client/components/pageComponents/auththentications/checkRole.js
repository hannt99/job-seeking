import { FaXmark } from 'react-icons/fa6';
import Link from 'next/link';

const CheckRole = ({ setRegisterOpen }) => {
    return (
        <div
            onClick={() => setRegisterOpen(false)}
            className="flex fixed top-0 left-0 bottom-0 right-0 py-5 bg-black/30 overflow-auto z-[999]"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-[calc(100%-48px)] md:w-[700px] lg:w-[800px] bg-white border m-auto rounded-3xl"
            >
                <div className="text-center pt-20 pb-8">
                    <p className="text-[2rem] font-semibold">Chào bạn,</p>
                    <p className="text-[#aaaaaa] text-[1.5rem] px-10 md:px-0">
                        Bạn hãy dành ra vài giây để xác nhận thông tin dưới đây nhé! &#128276;
                    </p>
                </div>
                <div className="border-t pt-9 pb-20 px-10 md:px-16 rounded-3xl">
                    <p className="text-center text-[1.5rem] md:text-[1.7rem] font-medium px-0 md:px-40">
                        Để tối ưu tốt nhất cho trải nghiệm của bạn với TimViecNhanh, vui lòng lựa chọn nhóm phù hợp nhất
                        với bạn.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-5 gap-y-10">
                        <div className="flex flex-col items-center w-full h-full">
                            <div className="w-[140px] md:w-[320px] h-auto">
                                <img
                                    src="../assets/images/employer.png"
                                    alt="employer"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <Link
                                href="/register/employer"
                                className="block bg-[var(--primary-color)] text-[1.2rem] md:text-[1.3rem] whitespace-nowrap text-white px-5 md:px-10 py-3 rounded-full hover:bg-[var(--primary-hover-color)] transition-all mt-5"
                            >
                                Tôi là nhà tuyển dụng
                            </Link>
                        </div>
                        <div className="flex flex-col items-center w-full h-full">
                            <div className="w-[140px] md:w-[320px] h-auto">
                                <img
                                    src="../assets/images/candidate.png"
                                    alt="candidate"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <Link
                                href="/register/candidate"
                                className="block bg-[var(--primary-color)] text-[1.2rem] md:text-[1.3rem] whitespace-nowrap text-white px-5 md:px-10 py-3 rounded-full hover:bg-[var(--primary-hover-color)] transition-all mt-5"
                            >
                                Tôi là ứng cử viên
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => setRegisterOpen(false)}
                    className="block md:hidden absolute top-0 right-0 text-[2.4rem] p-5 cursor-pointer"
                >
                    <FaXmark />
                </div>
            </div>
        </div>
    );
};

export default CheckRole;
