import Skill from '../models/Skill.js';

// Create skill controller
export const createSkillController = async (req, res) => {
    try {
        const skill = await Skill.findOne({ skill: req.body.skill });
        if (skill) return res.status(200).json({ code: 400, message: 'Kỹ năng đã tồn tại' });

        const newSkill = new Skill(req.body);
        await newSkill.save();

        res.status(200).json({ code: 200, message: 'Tạo kỹ năng thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get all skill controller
export const getAllSkillController = async (req, res) => {
    try {
        let { page, limit } = req.query;

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const skills = await Skill.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalSkills = await Skill.countDocuments();
        const totalPages = Math.ceil(totalSkills / limit);

        res.status(200).json({ code: 200, message: 'Success', skills, totalPages });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get all skill controller
export const getSkillByIdController = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.skillId);

        res.status(200).json({ code: 200, message: 'Success', skill });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Delete skill by id controller
export const deleteSkillByIdController = async (req, res) => {
    try {
        const skillId = req.params.skillId;
        await Skill.findByIdAndDelete(skillId);

        res.status(200).json({ code: 200, message: 'Xóa kỹ năng thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Update skill by id controller
export const updateSkillByIdController = async (req, res) => {
    try {
        const skillId = req.params.skillId;
        const updated = await Skill.findByIdAndUpdate(
            skillId,
            { $set: req.body },
            {
                new: true,
            },
        );

        res.status(200).json({ code: 200, message: 'Cập nhật kỹ năng thành công', updated });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};
