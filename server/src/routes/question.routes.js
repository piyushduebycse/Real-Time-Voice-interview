import express from 'express';
import { requireAuth, syncUser } from '../middleware/clerkAuth.middleware.js';
import { getQuestions, getRandomQuestions, getQuestionById } from '../controllers/question.controller.js';

const router = express.Router();

router.use(requireAuth);
router.use(syncUser);

router.get('/', getQuestions);
router.get('/random', getRandomQuestions);
router.get('/:id', getQuestionById);

export default router;
