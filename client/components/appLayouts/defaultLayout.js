'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/appLayouts/header';
import Footer from '@/components/appLayouts/footer';

const DefaultLayout = ({ main }) => {
    const pathname = usePathname();

    const checkPathname = () => {
        if (pathname?.includes('/signin')) {
            return true;
        } else if (pathname?.includes('/register')) {
            return true;
        } else if (pathname?.includes('/forgot-password')) {
            return true;
        } else if (pathname?.includes('/reset-password')) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            {checkPathname() ? (
                <div
                    className="relative flex w-full min-h-screen"
                    style={{
                        backgroundImage: `url("../assets/images/auth_bg.jpg")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="py-5 m-auto overflow-auto">{main}</div>
                    <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-[#161c2d]/5 to-[#161c2d]/100"></div>
                </div>
            ) : (
                <div className="flex flex-col h-screen">
                    <div className="flex justify-center">
                        <Header />
                    </div>
                    <div className="flex flex-col flex-1 items-center">{main}</div>
                    <div className="flex justify-center">
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
};

export default DefaultLayout;
