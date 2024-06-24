import { Router } from 'express';
import {
    createSkillController,
    getAllSkillController,
    getSkillByIdController,
    updateSkillByIdController,
    deleteSkillByIdController,
} from '../controllers/skill-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/role.js';

const router = Router();

// Create skill route
router.post('/create', verifyToken, isAdmin, createSkillController);

// Get all skill route
router.get('/get-all', getAllSkillController);

// Get skill route
router.get('/get/:skillId', getSkillByIdController);

// Update skill by id route
router.put('/update/:skillId', verifyToken, isAdmin, updateSkillByIdController);

// Delete skill by id route
router.delete('/delete/:skillId', verifyToken, isAdmin, deleteSkillByIdController);

export default router;
