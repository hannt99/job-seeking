'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import CheckRole from '../pageComponents/auththentications/checkRole';

const Header = () => {
    const [registerOpen, setRegisterOpen] = useState(false);

    useEffect(() => {
        registerOpen && (document.body.style.overflow = 'hidden');
        !registerOpen && (document.body.style.overflow = 'unset');
    }, [registerOpen]);

    return (
        <>
            <div className="flex items-center justify-between border w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] min-h-[60px]">
                <div className="text-[2rem] text-[var(--primary-color)] font-semibold">TimViecNhanh</div>
                <div className="flex items-center gap-3">
                    <Link href="/signin" className="block border px-5 py-3">
                        Đăng nhập
                    </Link>
                    <div onClick={() => setRegisterOpen(true)} className="border px-5 py-3">
                        Đăng ký
                    </div>
                </div>
            </div>
            {registerOpen && <CheckRole setRegisterOpen={setRegisterOpen} />}
        </>
    );
};

export default Header;
