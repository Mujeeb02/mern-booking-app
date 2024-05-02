import express from 'express';
import register from '../controller/user';

const router = express.Router();

// Route for user registration
router.post('/register', register);

export default router;
