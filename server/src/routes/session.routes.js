import express from 'express';
import { requireAuth, syncUser } from '../middleware/clerkAuth.middleware.js';
import { createSession, getSessions, getSessionById, updateSession } from '../controllers/session.controller.js';

const router = express.Router();

router.use(requireAuth);
router.use(syncUser);

router.post('/', createSession);
router.get('/', getSessions);
router.get('/:id', getSessionById);
router.patch('/:id', updateSession);

export default router;
