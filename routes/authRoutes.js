import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/log-in', loginUser);

export default router;
