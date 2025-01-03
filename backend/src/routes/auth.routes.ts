import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { registerValidation, loginValidation } from '../validators/auth.validators';
import { validate } from '../middleware/validation';

const router = Router();

// Register route with validation
router.post('/register', validate(registerValidation), register);

// Login route with validation
router.post('/login', validate(loginValidation), login);

export default router;
