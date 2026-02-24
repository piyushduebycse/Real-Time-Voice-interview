import mongoose from 'mongoose';
import Answer from '../models/Answer.model.js';
import Session from '../models/Session.model.js';
import Question from '../models/Question.model.js';
import { ApiError } from '../utils/apiError.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { generateVapiFeedback } from '../services/gemini.service.js';

export const analyzeVapiCall = asyncWrapper(async (req, res) => {
    const { sessionId, questionIds, transcript } = req.body;

    if (!sessionId || !mongoose.Types.ObjectId.isValid(sessionId)) {
        throw new ApiError(400, 'Invalid or missing sessionId');
    }
    if (!Array.isArray(questionIds) || questionIds.length === 0) {
        throw new ApiError(400, 'questionIds must be a non-empty array');
    }
    if (!Array.isArray(transcript) || transcript.length === 0) {
        throw new ApiError(400, 'transcript must be a non-empty array');
    }
    for (const id of questionIds) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, `Invalid questionId: ${id}`);
        }
    }

    const session = await Session.findOne({ _id: sessionId, userId: req.dbUser._id });
    if (!session) throw new ApiError(404, 'Session not found');

    // Idempotency guard — prevent duplicate analysis
    if (session.status === 'completed') {
        const existingAnswers = await Answer.find({ sessionId }).populate('questionId');
        return res.status(200).json({ status: 'success', answers: existingAnswers });
    }

    const questions = await Question.find({ _id: { $in: questionIds } });
    if (questions.length === 0) throw new ApiError(404, 'Questions not found');

    // Sort questions to match the original questionIds order
    const orderedQuestions = questionIds
        .map(id => questions.find(q => q._id.toString() === id))
        .filter(Boolean);

    const feedbackArray = await generateVapiFeedback(orderedQuestions, transcript);

    // Create one Answer document per question
    const answerDocs = [];
    for (let i = 0; i < orderedQuestions.length; i++) {
        const question = orderedQuestions[i];
        const fb = feedbackArray.find(f => f.questionIndex === i) || feedbackArray[i];
        if (!fb) continue;

        const { questionIndex, transcript: answerTranscript, ...feedbackFields } = fb;
        const answer = await Answer.create({
            sessionId,
            questionId: question._id,
            userId: req.dbUser._id,
            transcript: answerTranscript || 'No answer provided',
            feedback: feedbackFields,
            duration: 0
        });
        answerDocs.push(answer);
    }

    // Update session
    const totalScore = answerDocs.reduce((acc, a) => acc + (a.feedback?.score || 0), 0);
    session.answeredCount = answerDocs.length;
    session.averageScore = answerDocs.length > 0 ? totalScore / answerDocs.length : 0;
    session.status = 'completed';
    session.completedAt = new Date();
    await session.save();

    res.status(201).json({ status: 'success', answers: answerDocs });
});
