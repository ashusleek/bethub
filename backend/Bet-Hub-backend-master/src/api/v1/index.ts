import { Router } from 'express';

import authRoutes from 'api/v1/routes/auth';
import userRoutes from 'api/v1/routes/user';
import sportRoutes from 'api/v1/routes/sport';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/sport', sportRoutes);

export default router;
