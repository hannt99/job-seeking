import Job from '../models/Job.js';
import Company from '../models/Company.js';
import JobSave from '../models/JobSave.js';
import Resume from '../models/Resume.js';

// Create job controller
export const createJobController = async (req, res) => {
    try {
        const company = await Company.findOne({ userId: req.user._id });

        const newJob = new Job({ ...req.body, companyId: company._id });

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

        const company = await Company.findOne({ userId: req.user._id });

        const jobs = await Job.find({ ...queryFilters, companyId: company._id })
            .populate('companyId')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const totalJobs = await Job.countDocuments({ ...queryFilters, companyId: company._id });
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

// Get all job controller
export const getAllJobController = async (req, res) => {
    try {
        let {
            page,
            limit,
            companyId,
            search,
            jobType,
            jobExp,
            jobSalaryRange,
            jobCareers,
            jobWorkingLocation,
            jobId,
            jobStatus,
            sort,
        } = req.query;
        let queryFilters = {};

        if (search) {
            queryFilters = { jobTitle: { $regex: search, $options: 'i' } };
        }

        if (jobId) {
            queryFilters.jobId = jobId;
        }

        if (companyId) {
            queryFilters.companyId = companyId;
        }

        if (jobType) {
            queryFilters.jobType = jobType;
        }

        if (jobExp) {
            queryFilters.jobExp = jobExp;
        }

        if (jobSalaryRange) {
            queryFilters.jobSalaryRange = jobSalaryRange;
        }

        if (jobCareers) {
            queryFilters.jobCareers = jobCareers;
        }

        if (jobStatus) {
            queryFilters.jobStatus = jobStatus;
        }

        if (jobWorkingLocation) {
            queryFilters.jobWorkingLocation = { $elemMatch: { value: jobWorkingLocation } };
        }

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const jobs = await Job.find(queryFilters).populate('companyId').sort(sort).skip(skip).limit(limit);
        const totalJobs = await Job.countDocuments(queryFilters);
        const totalPages = Math.ceil(totalJobs / limit);
        res.status(200).json({ code: 200, message: 'Thành công', jobs, totalPages });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get job controller
export const getJobController = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId).populate('companyId');
        res.status(200).json({ code: 200, message: 'Success', job });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get relative job controller
export const getRelativeJobController = async (req, res) => {
    try {
        const { jobCareers, jobType } = req.query;

        const relativeJobs = await Job.find({ jobCareers, jobType }).populate('companyId');
        res.status(200).json({ code: 200, message: 'Success', relativeJobs });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Save job controller
export const saveJobController = async (req, res) => {
    try {
        const jobId = req.body.jobId;
        await JobSave.findOneAndUpdate(
            { userId: req.user._id },
            {
                $push: { totalJobs: { saveTime: Date.now(), jobId } },
            },
        );
        res.status(200).json({ code: 200, message: 'Đã lưu' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// unSave job controller
export const unsaveJobController = async (req, res) => {
    try {
        const jobId = req.body.jobId;
        await JobSave.findOneAndUpdate(
            { userId: req.user._id },
            {
                $pull: { totalJobs: { jobId } },
            },
        );
        res.status(200).json({ code: 200, message: 'Đã bỏ lưu' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Save job controller
export const getSaveJobController = async (req, res) => {
    try {
        const saveJobs = await JobSave.findOne({ userId: req.user._id }).populate({
            path: 'totalJobs.jobId',
            populate: {
                path: 'companyId',
            },
        });
        const totalJobs = saveJobs?.totalJobs;

        res.status(200).json({ code: 200, message: 'Đã lưu', totalJobs });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get recommend job controller
export const getRecommendJobController = async (req, res) => {
    try {
        let { page, limit } = req.query;

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const userResume = await Resume.findOne({ userId: req.user._id });

        const careers = userResume?.careers?.map((item) => item?.value);
        const skills = userResume?.skills;
        const experience = userResume?.experience;
        const workingLocation = userResume?.workingLocation;

        const recommendJobs = await Job.find({
            jobCareers: { $in: careers },
            jobSkills: { $in: skills },
            jobExp: experience,
            jobWorkingLocation: { $in: workingLocation },
        })
            .populate('companyId')
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalJobs = await Job.countDocuments({
            jobCareers: { $in: careers },
            jobSkills: { $in: skills },
            jobExp: experience,
            jobWorkingLocation: { $in: workingLocation },
        });
        const totalPages = Math.ceil(totalJobs / limit);
        res.status(200).json({ code: 200, message: 'Success', recommendJobs, totalPages });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get active job by employer controller
export const getActiveJobByEmployerController = async (req, res) => {
    try {
        const company = await Company.findOne({ userId: req.user._id });

        const activeJobs = await Job.find({ companyId: company._id, jobStatus: 'Đang tuyển' })
            .select('_id jobTitle')
            .sort({ createdAt: -1 });
        res.status(200).json({ code: 200, message: 'Thành công', activeJobs });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Apply job controller
export const applyJobController = async (req, res) => {
    try {
        const { coverLetter, cvPath } = req.body;
        const jobId = req.params.jobId;
        const userId = req.user._id;

        const company = await Company.findOne({ userId });

        const job = await Job.findOne({ _id: jobId, companyId: company?._id });

        if (job) return res.status(200).json({ code: 400, message: 'Bạn không thể ứng việc làm của chính bạn' });

        await Job.findByIdAndUpdate(jobId, {
            $push: { jobApplicants: { status: 'Đã ứng tuyển', appliedTime: Date.now(), userId, coverLetter, cvPath } },
        });

        res.status(200).json({ code: 200, message: 'Ứng tuyển thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get candidate by job controller
export const getApplicantsByJob = async (req, res) => {
    try {
        const job = await Job.findOne({ _id: req.query.jobId }).populate('jobApplicants.userId', '-password -role');

        const applicants = job?.jobApplicants;

        res.status(200).json({ code: 200, message: 'Success', applicants });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get candidate by job controller
export const decideApplicant = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const { userId, status } = req.body;
        const job = await Job.findOne({ _id: jobId });
        const applicants = job?.jobApplicants;

        let appFind = applicants?.find((item) => item?.userId?.toString() === userId);
        appFind = Object.assign(appFind, { status });

        let appFilter = applicants?.filter((item) => item?.userId?.toString() !== userId);

        const result = [...appFilter, appFind];

        await Job.findOneAndUpdate({ _id: jobId }, { jobApplicants: result });

        res.status(200).json({ code: 200, message: status === 'Phù hợp' ? 'Đã chấp nhận' : 'Đã từ chối', result });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get applied job controller
export const getAppliedJob = async (req, res) => {
    try {
        const jobs = await Job.find().populate('companyId');

        const result = jobs?.filter((item) =>
            item?.jobApplicants?.find((item2) => item2?.userId?.toString() === req.user._id),
        );

        res.status(200).json({ code: 200, message: 'Success', result, userId: req.user._id });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};
