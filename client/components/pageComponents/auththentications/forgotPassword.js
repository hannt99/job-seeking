import Link from 'next/link';

const ForgotPassword = () => {
    return (
        <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] z-50">
            <div className="bg-white w-full h-fit px-9 py-8 rounded-lg">
                <div className="font-bold text-center tracking-widest text-[2.4rem] text-[var(--primary-color)]">
                    TimViecNhanh
                </div>
                <h1 className="font-semibold text-[2rem] my-7">Quên mật khẩu</h1>
                <p className="text-[#aaaaaa] mb-7">
                    Hãy điền địa chỉ email của bạn tại đây. Bạn sẽ nhận được liên kết để tạo mật khẩu mới qua email.
                </p>
                <div className="space-y-4">
                    <label className="font-semibold text-[1.5rem]">
                        Địa chỉ Email<span className="text-[1.8rem] text-red-600">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        className="block w-full text-[1.5rem] outline-[var(--primary-color)] border px-5 py-3 rounded-lg"
                    />
                </div>
                <button className="w-full bg-[var(--primary-color)] text-white font-medium py-3 mt-7 rounded-lg hover:bg-[var(--primary-hover-color)] transition-all">
                    Gửi
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

export default ForgotPassword;
