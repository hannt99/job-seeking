import Job from '../models/Job.js';

// Create job controller
export const createJobController = async (req, res) => {
    try {
        const newJob = new Job(req.body);

        await newJob.save();
        res.status(200).json({ code: 200, message: 'Việc mới đã được tạo thành công', data: newJob });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};
