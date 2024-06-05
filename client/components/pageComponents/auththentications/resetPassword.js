import Link from 'next/link';

const ResetPassword = () => {
    return (
        <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] z-50">
            <div className="bg-white w-full h-fit px-9 py-8 rounded-lg">
                <div className="font-bold text-center tracking-widest text-[2.4rem] text-[var(--primary-color)]">
                    TimViecNhanh
                </div>
                <h1 className="font-semibold text-[2rem] my-7">Đặt lại mật khẩu</h1>
                <div className="space-y-4 mt-7">
                    <label className="font-semibold text-[1.5rem]">
                        Mật khẩu mới<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="Mật khẩu mới"
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
                <button className="w-full bg-[var(--primary-color)] text-white font-medium py-3 mt-7 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all">
                    Đặt lại
                </button>
                <Link
                    href="/signin"
                    className="block text-right text-[#aaaaaa] font-medium mt-7 hover:underline transition-all"
                >
                    Quay lại đăng nhập
                </Link>
                <div className="text-center text-[1.5rem] text-[#aaaaaa] font-medium mt-12">
                    © 2024 TimViecNhanh. Designed by Han.
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
