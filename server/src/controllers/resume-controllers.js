import Resume from '../models/Resume.js';

// Get resume controller
export const getResumeController = async (req, res) => {
    try {
        const resume = await Resume.findOne({ userId: req.user._id });
        res.status(200).json({ code: 200, message: 'Success', resume });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Update resume controller
export const updateResumeController = async (req, res) => {
    try {
        await Resume.findOneAndUpdate(
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

// Upload cv controller
export const uploadCVController = async (req, res) => {
    try {
        const files = req.files;

        if (!files) return res.status(200).json({ code: 400, message: 'Hãy chọn ít nhất 1 file' });

        const fileUrls = files.map((file) => {
            return { name: file.filename, path: process.env.BASE_URL + `/static/${file.filename}` };
        });

        const iterator = fileUrls.values();

        for (const value of iterator) {
            await Resume.findOneAndUpdate(
                { userId: req.user._id },
                { $push: { cv: { isMain: false, name: value?.name, path: value?.path } } },
            );
        }

        res.status(200).json({ code: 200, message: 'Upload CV thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Delete cv controller
export const deleteCVController = async (req, res) => {
    try {
        const filename = req.body.filename;
        if (!filename) return res.status(200).json({ code: 404, message: 'Không tìm thấy CV' });
        const resume = await Resume.findOne({ userId: req.user._id });
        const attachFiles = resume.cv.filter((item) => item?.name !== filename);
        await Resume.findOneAndUpdate({ userId: req.user._id }, { cv: attachFiles });
        res.status(200).json({ code: 200, message: 'Xóa CV thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get all cv controller
export const getAllCVController = async (req, res) => {
    try {
        const resume = await Resume.findOne({ userId: req.user._id });
        const cvs = resume?.cv;
        res.status(200).json({ code: 200, message: 'Success', cvs });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};
