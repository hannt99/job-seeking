import Company from '../models/Company.js';

// Get company by employer controller
export const getCompanyByEmployerController = async (req, res) => {
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

// Get all company controller
export const getAllCompanyController = async (req, res) => {
    try {
        let { page, limit, search, sort } = req.query;
        let queryFilters = {};

        if (search) {
            queryFilters = { companyName: { $regex: search, $options: 'i' } };
        }

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const companies = await Company.find(queryFilters).sort(sort).skip(skip).limit(limit);
        const totalCompanies = await Company.countDocuments(queryFilters);
        const totalPages = Math.ceil(totalCompanies / limit);

        res.status(200).json({ code: 200, message: 'Success', companies, totalPages });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get company controller
export const getCompanyController = async (req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);
        res.status(200).json({ code: 200, message: 'Success', company });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Add follower controller
export const addFollowerController = async (req, res) => {
    try {
        await Company.findByIdAndUpdate(req.params.companyId, {
            $push: { followers: req.user._id },
        });
        res.status(200).json({ code: 200, message: 'Đã theo dõi' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Remove follower controller
export const removeFollowerController = async (req, res) => {
    try {
        await Company.findByIdAndUpdate(req.params.companyId, {
            $pull: { followers: req.user._id },
        });
        res.status(200).json({ code: 200, message: 'Đã hủy theo dõi' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get all followed company controller
export const getAllFollowedCompanyController = async (req, res) => {
    try {
        let { page, limit } = req.query;

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const companies = await Company.find({ followers: req.user._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const totalCompanies = await Company.countDocuments({ followers: req.user._id });
        const totalPages = Math.ceil(totalCompanies / limit);

        res.status(200).json({ code: 200, message: 'Success', companies, totalPages });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};
