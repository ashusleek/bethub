import { Router } from 'express';

import { canRefreshToken } from 'api/middlewares/auth';
import authCelebrates from 'api/v1/validations/auth';
import { signin, refreshToken } from 'api/v1/controllers/auth';

const router = Router();

router.post('/login', authCelebrates.login, signin);

router.get('/token/refresh', canRefreshToken, refreshToken);

export default router;
