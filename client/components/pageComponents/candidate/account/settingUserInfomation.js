import UserInfomationForm from '@/components/forms/userInfomationForm';
import RightSide from './rightSide';
import UserResumeForm from '@/components/forms/userResumeForm';

const SettingUserInfomation = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 px-5 md:px-0 w-full md:w-[690px] lg:w-[960px] xl:w-[1200px] py-10">
            <div className="lg:col-span-4 space-y-7">
                <div className="custom-shadow-v1 rounded-lg">
                    <UserInfomationForm />
                </div>
                <div className="custom-shadow-v1 rounded-lg">
                    <UserResumeForm />
                </div>
            </div>
            <div className="lg:col-span-2 w-full h-fit">
                <RightSide />
            </div>
        </div>
    );
};

export default SettingUserInfomation;
