import UserInfomation from '../../userInfomation';
import UserResume from '../../userResume';

const SettingUserInfomation = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 w-[360px] md:w-[690px] lg:w-[925px] xl:w-[1120px] py-10">
            <div className="md:col-span-4 space-y-7">
                <div className="custom-shadow-v1">
                    <UserInfomation />
                </div>
                <div className="custom-shadow-v1">
                    <UserResume />
                </div>
            </div>
            <div className="md:col-span-2 bg-red-600 w-full h-[100px]"></div>
        </div>
    );
};

export default SettingUserInfomation;
