import Session from '../models/Session.model.js';
import Answer from '../models/Answer.model.js';
import { ApiError } from '../utils/apiError.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

export const createSession = asyncWrapper(async (req, res) => {
    const { title, category, difficulty, totalQuestions } = req.body;

    const session = await Session.create({
        userId: req.dbUser._id,
        title,
        category,
        difficulty,
        totalQuestions: totalQuestions || 5
    });

    res.status(201).json({ status: 'success', session });
});

export const getSessions = asyncWrapper(async (req, res) => {
    const sessions = await Session.find({ userId: req.dbUser._id })
        .sort('-createdAt');

    res.status(200).json({ status: 'success', sessions });
});

export const getSessionById = asyncWrapper(async (req, res) => {
    const session = await Session.findOne({ _id: req.params.id, userId: req.dbUser._id });

    if (!session) {
        throw new ApiError(404, 'Session not found');
    }

    const answers = await Answer.find({ sessionId: session._id }).populate('questionId');

    res.status(200).json({ status: 'success', session, answers });
});

export const updateSession = asyncWrapper(async (req, res) => {
    const { title, category, difficulty, status, totalQuestions, completedAt } = req.body;
    const allowedUpdates = { title, category, difficulty, status, totalQuestions, completedAt };
    Object.keys(allowedUpdates).forEach(k => allowedUpdates[k] === undefined && delete allowedUpdates[k]);

    const session = await Session.findOneAndUpdate(
        { _id: req.params.id, userId: req.dbUser._id },
        allowedUpdates,
        { new: true, runValidators: true }
    );

    if (!session) {
        throw new ApiError(404, 'Session not found');
    }

    res.status(200).json({ status: 'success', session });
});
