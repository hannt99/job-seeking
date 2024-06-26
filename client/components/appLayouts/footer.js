import Link from 'next/link';
import { FaLocationDot, FaPhone, FaEnvelope, FaEarthAsia } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-y-9 py-16">
                <div className="xl:col-span-2">
                    <div className="w-[160px] h-auto">
                        <img src="../assets/images/logo.png" alt="logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="space-y-3 mt-6">
                        <p className="text-[1.7rem]">
                            <FaLocationDot className="inline mr-2" />
                            <span>Địa chỉ: Quận 8, TP.Hồ Chí Minh</span>
                        </p>
                        <p className="text-[1.7rem]">
                            <FaPhone className="inline mr-2" /> <a href="tel:0123456789">Hotline: 039 509 0752</a>
                        </p>
                        <p className="text-[1.7rem]">
                            <FaEnvelope className="inline mr-2" /> <span>Email: info@timviecnhanh.com</span>
                        </p>
                        <p className="text-[1.7rem]">
                            <FaEarthAsia className="inline mr-2" />{' '}
                            <Link href="/">Website: https://timviecnhanh.com</Link>
                        </p>
                    </div>
                </div>
                <div className="col-span-1 space-y-8">
                    <h3 className="text-[2.4rem] font-semibold">Dịch vụ</h3>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                href="/job/search-job"
                                className="text-[#808080] text-[1.8rem] hover:underline hover:text-[var(--primary-color)] transition-all"
                            >
                                Tìm việc làm
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/company/company-list"
                                className="text-[#808080] text-[1.8rem] hover:underline hover:text-[var(--primary-color)] transition-all"
                            >
                                Danh sách công ty
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/account/cv-manage"
                                className="text-[#808080] text-[1.8rem] hover:underline hover:text-[var(--primary-color)] transition-all"
                            >
                                Quản lý CV
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/account/setting-user-information"
                                className="text-[#808080] text-[1.8rem] hover:underline hover:text-[var(--primary-color)] transition-all"
                            >
                                Cài đặt gợi ý việc làm
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-span-1 space-y-8">
                    <h3 className="text-[2.4rem] font-semibold">Về chúng tôi</h3>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                href="#"
                                className="text-[#808080] text-[1.8rem] hover:underline hover:text-[var(--primary-color)] transition-all"
                            >
                                Giới thiệu
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="text-[#808080] text-[1.8rem] hover:underline hover:text-[var(--primary-color)] transition-all"
                            >
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="text-[#808080] text-[1.8rem] hover:underline hover:text-[var(--primary-color)] transition-all"
                            >
                                Liên hệ
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-span-1 space-y-8">
                    <h3 className="text-[2.4rem] font-semibold">Hỗ trợ</h3>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                href="#"
                                className="text-[#808080] text-[1.8rem] hover:underline hover:text-[var(--primary-color)] transition-all"
                            >
                                Điều khoản dịch vụ
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="text-[#808080] text-[1.8rem] hover:underline hover:text-[var(--primary-color)] transition-all"
                            >
                                Chính sách bảo mật
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="text-[#808080] text-[1.8rem] hover:underline hover:text-[var(--primary-color)] transition-all"
                            >
                                Chính sách cookie
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="text-center py-8 border-t">
                <p className="font-medium">
                    ©2024 TimViecNhanh. Design & Develop with <span className="text-red-600">&#10084;</span> by Han.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
