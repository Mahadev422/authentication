import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { createFeedback, getAllFeedbacks } from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/log-in', loginUser);
router.post('/feedback', createFeedback);
router.get('/feedback', getAllFeedbacks); 

export default router;
