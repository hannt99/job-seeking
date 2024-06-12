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
            { _id: req.params.jobId },
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

// Get job controller
export const getJobController = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        res.status(200).json({ code: 200, message: 'Success', job });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get all job by specific employer controller
export const getAllJobByEmployerController = async (req, res) => {
    try {
        let { page, limit, search } = req.query;

        let queryFilters = {};

        if (search) {
            queryFilters = { jobTitle: { $regex: search, $options: 'i' } };
        }

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const jobs = await Job.find({ ...queryFilters, userId: req.user._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const totalJobs = await Job.countDocuments({ ...queryFilters, userId: req.user._id });
        const totalPages = Math.ceil(totalJobs / limit);
        res.status(200).json({ code: 200, message: 'Thành công', jobs, totalPages });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Delete job by employer controller
export const deleteJobByEmployerController = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId);
        if (!job) return res.status(200).json({ code: 404, message: 'Không tìm thấy công việc' });

        await Job.findByIdAndDelete(jobId);
        res.status(200).json({ code: 200, message: 'Xóa thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};