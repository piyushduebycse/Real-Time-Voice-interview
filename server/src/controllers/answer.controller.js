import Answer from '../models/Answer.model.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { ApiError } from '../utils/apiError.js';

// Legacy endpoint — replaced by POST /api/vapi/analyze in the new Vapi flow
export const submitAnswer = asyncWrapper(async (req, res) => {
    throw new ApiError(410, 'This endpoint is deprecated. Use POST /api/vapi/analyze instead.');
});

export const getAnswersBySession = asyncWrapper(async (req, res) => {
    const answers = await Answer.find({
        sessionId: req.params.sessionId,
        userId: req.dbUser._id
    }).populate('questionId');

    res.status(200).json({ status: 'success', answers });
});
