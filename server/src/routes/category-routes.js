import { Router } from 'express';
import {
    createCategoryController,
    getAllCategoryController,
    getCategoryByIdController,
    updateCategoryByIdController,
    deleteCategoryByIdController,
} from '../controllers/category-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/role.js';

const router = Router();

// Create category route
router.post('/create', verifyToken, isAdmin, createCategoryController);

// Get all category route
router.get('/get-all', getAllCategoryController);

// Get category route
router.get('/get/:categoryId', getCategoryByIdController);

// Update category by id route
router.put('/update/:categoryId', verifyToken, isAdmin, updateCategoryByIdController);

// Delete category by id route
router.delete('/delete/:categoryId', verifyToken, isAdmin, deleteCategoryByIdController);

export default router;
