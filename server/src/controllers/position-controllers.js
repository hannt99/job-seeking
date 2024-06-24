import Position from '../models/Position.js';

// Create position controller
export const createPositionController = async (req, res) => {
    try {
        const position = await Position.findOne({ position: req.body.position });
        if (position) return res.status(200).json({ code: 400, message: 'Vị trí đã tồn tại' });

        const newPosition = new Position(req.body);
        await newPosition.save();

        res.status(200).json({ code: 200, message: 'Tạo vị trí thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get all position controller
export const getAllPositionController = async (req, res) => {
    try {
        let { page, limit } = req.query;

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const positions = await Position.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalPositions = await Position.countDocuments();
        const totalPages = Math.ceil(totalPositions / limit);

        res.status(200).json({ code: 200, message: 'Success', positions, totalPages });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get position controller
export const getPositionByIdController = async (req, res) => {
    try {
        const position = await Position.findById(req.params.positionId);

        res.status(200).json({ code: 200, message: 'Success', position });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Delete position by id controller
export const deletePositionByIdController = async (req, res) => {
    try {
        const positionId = req.params.positionId;
        await Position.findByIdAndDelete(positionId);

        res.status(200).json({ code: 200, message: 'Xóa vị trí thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Update position by id controller
export const updatePositionByIdController = async (req, res) => {
    try {
        const positionId = req.params.positionId;
        const updated = await Position.findByIdAndUpdate(
            positionId,
            { $set: req.body },
            {
                new: true,
            },
        );

        res.status(200).json({ code: 200, message: 'Cập nhật vị trí thành công', updated });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};
