
import authRoutes from './auth.routes.js';
import sessionRoutes from './session.routes.js';
import answerRoutes from './answer.routes.js';
import questionRoutes from './question.routes.js';
import vapiRoutes from './vapi.routes.js';

import express from 'express';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/sessions', sessionRoutes);
router.use('/answers', answerRoutes);
router.use('/questions', questionRoutes);
router.use('/vapi', vapiRoutes);

export default router;
