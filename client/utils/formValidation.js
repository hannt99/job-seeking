import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

// Validate name
export const fullNameValidator = (fullName, setIsFullNameErr, setFullNameErrMsg) => {
    const msg = {};
    if (isEmpty(fullName)) {
        msg.fullName = 'Tên không được để trống';
        msg.companyName = 'Tên công ty không được để trống';
        setIsFullNameErr(true);
    } else {
        setIsFullNameErr(false);
    }
    setFullNameErrMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
};

// Validate phone
export const phoneValidator = (phone, setIsPhoneErr, setPhoneErrMsg) => {
    const msg = {};
    if (isEmpty(phone)) {
        msg.phone = 'Số điện thoại không được để trống';
        setIsPhoneErr(true);
    } else if (!isMobilePhone(phone, 'vi-VN')) {
        msg.phone = 'Số điện thoại không hợp lệ';
        setIsPhoneErr(true);
    } else {
        setIsPhoneErr(false);
    }
    setPhoneErrMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
};

// Validate number
export const numberValidator = (number, setIsNumberErr, setNumberErrMsg) => {
    const msg = {};
    if (isEmpty(String(number))) {
        msg.number = 'Quy mô không được để trống';
        setIsNumberErr(true);
    } else if (number <= 0 || number > 9999) {
        msg.number = 'Quy mô không hợp lệ';
        setIsNumberErr(true);
    } else {
        setIsNumberErr(false);
    }
    setNumberErrMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
};

// Validate email
export const emailValidator = (email, setIsEmailErr, setEmailErrMsg) => {
    const msg = {};
    if (isEmpty(email)) {
        msg.email = 'Email không được để trống';
        setIsEmailErr(true);
    } else if (!isEmail(email)) {
        msg.email = 'Email không hợp lệ';
        setIsEmailErr(true);
    } else {
        setIsEmailErr(false);
    }
    setEmailErrMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
};

// Validate password
export const passwordValidator = (password, confirmPassword, setIsPasswordErr, setPasswordErrMsg) => {
    const msg = {};
    if (isEmpty(password)) {
        msg.oldPassword = 'Mật khẩu cũ không được để trống';
        msg.newPassword = 'Mật khẩu mới không được để trống';
        msg.password = 'Mật khẩu không được để trống';
        msg.confirmPassword = 'Xác nhận mật khẩu không được để trống';
        setIsPasswordErr(true);
    } else if (password.length < 6) {
        msg.oldPassword = 'Mật khẩu cũ phải có ít nhất 6 kí tự';
        msg.newPassword = 'Mật khẩu mới phải có ít nhất 6 kí tự';
        msg.password = 'Mật khẩu phải có ít nhất 6 kí tự';
        msg.confirmPassword = 'Xác nhận mật khẩu phải có ít nhất 6 kí tự';
        setIsPasswordErr(true);
    } else if (confirmPassword !== password) {
        msg.confirmPassword = 'Xác nhận mật khẩu không trùng khớp';
        setIsPasswordErr(true);
    } else {
        setIsPasswordErr(false);
    }
    setPasswordErrMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
};

// Validate date
// export const disabledPastDate = () => {
//     let today, dd, mm, yyyy, hh, minu;
//     today = new Date();
//     dd = ('0' + today.getDate()).slice(-2);
//     mm = ('0' + (today.getMonth() + 1)).slice(-2);
//     yyyy = today.getFullYear();
//     hh = ('0' + today.getHours()).slice(-2);
//     minu = ('0' + today.getMinutes()).slice(-2);
//     return yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + minu;
// };

// export const dateValidator = (date, setIsDateErr, setDateErrMsg) => {
//     const msg = {};
//     if (isEmpty(date)) {
//         msg.date = 'Thời gian không được để trống';
//         msg.dueDate = 'Ngày đến hạn không được để trống';
//         msg.inDate = 'Ngày đến không được để trống';
//         msg.outDate = 'Ngày đi không được để trống';
//         msg.issuedDate = 'Ngày ban hành không được để trống';
//         setIsDateErr(true);
//     } else {
//         setIsDateErr(false);
//     }
//     setDateErrMsg(msg);
//     if (Object.keys(msg).length > 0) return false;
//     return true;
// };

export const dropListValidator = (value, setIsDropListErr, setDropListErrMsg) => {
    const msg = {};
    if (!value || value.length === 0) {
        msg.position = 'Chức vụ không được để trống';
        msg.province = 'Tỉnh/thành không được để trống';
        msg.gender = 'Giới tính không được để trống';
        msg.jobPosition = 'Vị trí công việc không được để trống';
        setIsDropListErr(true);
    } else {
        setIsDropListErr(false);
    }
    setDropListErrMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
};
