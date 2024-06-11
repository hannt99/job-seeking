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
