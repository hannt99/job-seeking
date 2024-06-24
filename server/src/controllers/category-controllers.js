import Category from '../models/Category.js';

// Create category controller
export const createCategoryController = async (req, res) => {
    try {
        const category = await Category.findOne({ category: req.body.category });
        if (category) return res.status(200).json({ code: 400, message: 'Ngành nghề đã tồn tại' });

        const newCategory = new Category(req.body);
        await newCategory.save();

        res.status(200).json({ code: 200, message: 'Tạo ngành nghề thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get all category controller
export const getAllCategoryController = async (req, res) => {
    try {
        let { page, limit } = req.query;

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const categories = await Category.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalCategories = await Category.countDocuments();
        const totalPages = Math.ceil(totalCategories / limit);

        res.status(200).json({ code: 200, message: 'Success', categories, totalPages });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get all category controller
export const getCategoryByIdController = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);

        res.status(200).json({ code: 200, message: 'Success', category });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Delete category by id controller
export const deleteCategoryByIdController = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({ code: 200, message: 'Xóa ngành nghề thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Update category by id controller
export const updateCategoryByIdController = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const updated = await Category.findByIdAndUpdate(
            categoryId,
            { $set: req.body },
            {
                new: true,
            },
        );

        res.status(200).json({ code: 200, message: 'Cập nhật ngành nghề thành công', updated });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};
