import express from 'express';
import multer from 'multer';
import { requireAuth, syncUser } from '../middleware/clerkAuth.middleware.js';
import { submitAnswer, getAnswersBySession } from '../controllers/answer.controller.js';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const router = express.Router();

router.use(requireAuth);
router.use(syncUser);

router.post('/', upload.single('audio'), submitAnswer);
router.get('/:sessionId', getAnswersBySession);

export default router;
