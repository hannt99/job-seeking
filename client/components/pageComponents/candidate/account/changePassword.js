import ChangePasswordForm from '../../changePasswordForm';
import RightSide from './rightSide';

const ChangePassword = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] py-10">
            <div className="md:col-span-4 bg-white">
                <ChangePasswordForm />
            </div>
            <div className="md:col-span-2 w-full h-fit">
                <RightSide />
            </div>
        </div>
    );
};

export default ChangePassword;
