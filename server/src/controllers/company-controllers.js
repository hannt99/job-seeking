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
