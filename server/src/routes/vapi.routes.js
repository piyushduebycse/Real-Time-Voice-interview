import express from 'express';
import { requireAuth, syncUser } from '../middleware/clerkAuth.middleware.js';
import { analyzeVapiCall } from '../controllers/vapiAnalysis.controller.js';

const router = express.Router();

router.use(requireAuth);
router.use(syncUser);

router.post('/analyze', analyzeVapiCall);

export default router;
