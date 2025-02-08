import { Router } from 'express';
import bookRoutes from './bookRoutes.js';

import { volunteerRouter } from './volunteer-routes.js';
import { workRouter } from './work-volunteer.js';

const router = Router();

router.use('/books', bookRoutes);
router.use('/volunteers', volunteerRouter);
router.use('/works', workRouter);

export default router;
