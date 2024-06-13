import ChangePasswordForm from '@/components/forms/changePasswordForm';
import RightSide from './rightSide';

const ChangePassword = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 px-5 w-full md:w-[690px] lg:w-[960px] xl:w-[1120px] py-10">
            <div className="lg:col-span-4 bg-white">
                <ChangePasswordForm />
            </div>
            <div className="lg:col-span-2 w-full h-fit">
                <RightSide />
            </div>
        </div>
    );
};

export default ChangePassword;
