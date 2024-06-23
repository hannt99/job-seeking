import User from '../models/User.js';
import Company from '../models/Company.js';
import bcrypt from 'bcryptjs';
import { generateVerifyEmailToken, generateAccessToken, generateResetPasswordToken } from '../utils/tokenGenerator.js';
import sendMail from '../utils/email.js';
import jwt from 'jsonwebtoken';
import Resume from '../models/Resume.js';
import JobSave from '../models/JobSave.js';

// Sigin controller
export const signInController = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || user.isActived === false)
            return res.status(200).json({ code: 404, message: 'Tài khoản không tồn tại hoặc chưa được xác thực' });

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return res.status(200).json({ code: 400, message: 'Email hoặc mật khẩu không chính xác' });

        const accessToken = generateAccessToken(user);

        res.cookie('accessToken', accessToken, { expires: new Date(Date.now() + 24 * 3600000), httpOnly: true })
            .status(200)
            .json({
                code: 200,
                message: 'Đăng nhập thành công',
                accessToken: accessToken,
            });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Register controller
export const registerController = async (req, res) => {
    try {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isEmailExist = await User.findOne({ email: req.body.email });
        if (!emailRegex.test(req.body.email)) return res.status(200).json({ code: 403, message: 'Email không hợp lệ' });
        if (isEmailExist) return res.status(200).json({ code: 403, message: 'Email đã được sử dụng' });
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({ ...req.body, password: hash });
        await newUser.save();

        const newResume = new Resume({ ...req.body, userId: newUser?._id });
        await newResume.save();

        const newJobSave = new JobSave({ ...req.body, userId: newUser?._id });
        await newJobSave.save();

        if (req.body.role === 0) {
            const company = await Company.findOne({ companyName: req.body.companyName });
            if (company) {
                await User.findByIdAndDelete(newUser?._id);
                await Resume.findOneAndDelete({ userId: newUser?._id });
                return res.status(200).json({ code: 403, message: 'Tên công ty đã được sử dụng' });
            }
            const newCompany = new Company({ ...req.body, userId: newUser?._id });
            await newCompany.save();
        }

        const subject = 'TimViecNhanh - Xác thực tài khoản người dùng';
        const token = generateVerifyEmailToken(newUser);
        const html = `<p>Hãy nhấn vào <a href="${process.env.BASE_URL}/api/v1/auth/verify?token=${token}"> liên kết</a> để xác thực tài khoản của bạn</p>
        <p>Thời gian hiệu lực trong vòng 24 giờ</p>`;
        sendMail(newUser.email, subject, html);
        res.status(200).json({ code: 200, message: 'Vui lòng kiểm tra email' });
    } catch (err) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(err);
    }
};

// Verify account controller
export const verifyController = async (req, res) => {
    try {
        const token = req.query.token;

        jwt.verify(token, process.env.VERIFY_EMAIL_SECRET, async (err, user) => {
            if (err) {
                return res.status(200).json({ code: 403, message: 'Mã xác thực không hợp lệ hoặc đã hết hạn' });
            }

            await User.updateOne({ _id: user._id }, { $set: { isActived: true } });

            res.status(200).format({
                'text/html': function () {
                    res.send(
                        `<h1 style="color:red;">Xác thực tài khoản thành công</h1><a href='${process.env.REACT_APP_BASE_URL}/signin'>Chuyển đến trang đăng nhập</a>`,
                    );
                },
            });
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Forgot password controller
export const forgotPasswordController = async (req, res) => {
    try {
        const email = req.body.email;
        const isEmailExist = await User.findOne({ email: email });
        if (!isEmailExist) return res.status(200).json({ code: 404, message: 'Email không tồn tại' });
        const userData = await User.findOne({ email: email });
        if (userData) {
            const subject = 'TimViecNhanh - Đặt lại mật khẩu';
            const token = generateResetPasswordToken(userData);
            const html = `<p>Xin chào ${userData.email}, Hãy nhấn vào <a href="${process.env.REACT_APP_BASE_URL}/reset-password">liên kết</a> này và  đặt lại mật khẩu của bạn</p>
            <p>Thời gian hiệu lực trong vòng 10 phút</p>`;
            sendMail(userData.email, subject, html);
            res.status(200).json({
                code: 200,
                message: 'Kiểm tra email và đặt lại mật khẩu của bạn',
                resetToken: token,
            });
        } else {
            res.status(200).json({ code: 404, message: 'Email không tồn tại' });
        }
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Reset password controller
export const resetPasswordController = async (req, res) => {
    try {
        const token = req.body.token;
        jwt.verify(token, process.env.RESET_PASS_SECRET, async (err, user) => {
            if (err) {
                return res.status(200).json({ code: 403, message: 'Mã xác thực không hợp lệ hoặc đã hết hạn' });
            }

            const salt = bcrypt.genSaltSync(10);
            const newPassword = bcrypt.hashSync(req.body.password, salt);

            await User.updateOne({ _id: user._id }, { $set: { password: newPassword } });
            res.status(200).json({ code: 200, message: 'Mật khẩu đã được đặt lại' });
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get current user controller
export const getCurrentUserController = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);
        res.status(200).json({ code: 200, message: 'Success', currentUser });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Sign out
export const signOutController = (req, res) => {
    res.clearCookie('accessToken', {
        secure: true,
        sameSite: 'none',
    })
        .status(200)
        .json({ code: 200, message: 'Đăng xuất thành công' });
};
