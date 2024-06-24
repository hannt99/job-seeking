import { Router } from 'express';
import {
    createPositionController,
    getAllPositionController,
    getPositionByIdController,
    updatePositionByIdController,
    deletePositionByIdController,
} from '../controllers/position-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/role.js';

const router = Router();

// Create position route
router.post('/create', verifyToken, isAdmin, createPositionController);

// Get all position route
router.get('/get-all', getAllPositionController);

// Get position route
router.get('/get/:positionId', getPositionByIdController);

// Update position by id route
router.put('/update/:positionId', verifyToken, isAdmin, updatePositionByIdController);

// Delete position by id route
router.delete('/delete/:positionId', verifyToken, isAdmin, deletePositionByIdController);

export default router;
