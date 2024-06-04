import Link from 'next/link';

const RegisterCandidate = () => {
    return (
        <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] z-50">
            <div className="bg-white w-full h-fit px-9 py-8 rounded-lg">
                <div className="font-bold text-center tracking-widest text-[2.4rem] text-[var(--primary-color)]">
                    TimViecNhanh
                </div>
                <h1 className="font-semibold text-[2rem] my-7">Đăng ký</h1>
                <div className="space-y-4">
                    <label className="font-semibold text-[1.5rem]">
                        Họ và tên<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Han Nguyen"
                        className="block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg"
                    />
                </div>
                <div className="space-y-4 mt-7">
                    <label className="font-semibold text-[1.5rem]">
                        Địa chỉ Email<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        className="block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg"
                    />
                </div>
                <div className="space-y-4 mt-7">
                    <label className="font-semibold text-[1.5rem]">
                        Mật khẩu<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        className="block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg"
                    />
                </div>
                <div className="space-y-4 mt-7">
                    <label className="font-semibold text-[1.5rem]">
                        Xác nhận mật khẩu<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        className="block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg"
                    />
                </div>
                <div className="flex items-start space-x-3 my-9">
                    <input type="checkbox" className="accent-[var(--primary-color)] scale-125" />
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
                <button className="w-full bg-[var(--primary-color)] text-white font-medium py-3 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all">
                    Đăng ký
                </button>
                <div className="space-x-5 text-center mt-7">
                    <span className="text-[#aaaaaa] text-[1.5rem]">Bạn đã có tài khoản?</span>
                    <Link
                        href="/signin?k=auth"
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

export default RegisterCandidate;
