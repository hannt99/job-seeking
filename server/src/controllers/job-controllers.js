import Job from '../models/Job.js';
import Company from '../models/Company.js';

// Create job controller
export const createJobController = async (req, res) => {
    try {
        const company = await Company.findOne({ userId: req.user._id });

        const newJob = new Job({ ...req.body, userId: req.user._id, companyAvatar: company.avatar });

        await newJob.save();
        res.status(200).json({ code: 200, message: 'Việc mới đã được tạo thành công', data: newJob });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Update job controller
export const updateJobController = async (req, res) => {
    try {
        await Job.findOneAndUpdate(
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

// Get all job by specific employer controller
export const getAllJobBySpecificEmployerController = async (req, res) => {
    try {
        let { page, limit, userId } = req.query;

        const queryFilters = {};

        if (userId) {
            queryFilters.userId = userId;
        }

        const jobs = Job.find(queryFilters);
        res.status(200).json({ code: 200, message: 'Cập nhật thành công', jobs });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};
