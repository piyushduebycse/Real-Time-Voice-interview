import express from 'express';
import { requireAuth, syncUser } from '../middleware/clerkAuth.middleware.js';

const router = express.Router();

router.post('/sync', requireAuth, syncUser, (req, res) => {
    res.status(200).json({ status: 'success', user: req.dbUser });
});

router.get('/me', requireAuth, syncUser, (req, res) => {
    res.status(200).json({ status: 'success', user: req.dbUser });
});

export default router;
