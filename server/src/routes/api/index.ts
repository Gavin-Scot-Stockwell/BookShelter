import { Router } from 'express';
import bookRoutes from './bookRoutes.js';


const router = Router();

// respond to route requests for books
router.use('/books', bookRoutes);

export default router;
