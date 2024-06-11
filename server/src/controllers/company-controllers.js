import Company from '../models/Company.js';

// Get current user controller
export const getCompanyController = async (req, res) => {
    try {
        const company = await Company.findOne({ userId: req.user._id });
        res.status(200).json({ code: 200, message: 'Success', company });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Update company controller
export const updateCompanyController = async (req, res) => {
    try {
        await Company.findOneAndUpdate(
            { userId: req.user._id },
            { $set: req.body },
            {
                new: true,
            },
        );
        res.status(200).json({ code: 200, message: 'Cập nhật thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Change avatar controller
export const changeAvatarController = async (req, res) => {
    try {
        console.log(123);
        const userId = req.user._id;
        const file = req.file;
        const fileUrl = process.env.BASE_URL + `/static/${file.filename}`;
        if (!file) return res.status(200).json({ code: 400, message: 'Hãy chọn 1 ảnh' });

        await Company.findOneAndUpdate({ userId: userId }, { avatar: fileUrl });
        res.status(200).json({ code: 200, message: 'Thay đổi ảnh nền thành công', fileName: file.filename });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};
