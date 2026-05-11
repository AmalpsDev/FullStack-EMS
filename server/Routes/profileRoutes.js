import Router from 'express';
import { getProfile, updateProfile } from '../controller/profileController';
import { protect } from '../middleware/auth.js';

const profileRouter = Router();

profileRouter.get('/', protect, getProfile);
profileRouter.post('/', protect, updateProfile);