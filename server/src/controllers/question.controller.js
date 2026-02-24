import Question from '../models/Question.model.js';
import { ApiError } from '../utils/apiError.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';

export const getQuestions = asyncWrapper(async (req, res) => {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;

    const questions = await Question.find(filter);
    res.status(200).json({ status: 'success', results: questions.length, questions });
});

export const getRandomQuestions = asyncWrapper(async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 5;
    const matchRules = {};

    if (req.query.category && req.query.category !== 'All') {
        matchRules.category = req.query.category.toLowerCase().replace(/ /g, '-');
    }

    const questions = await Question.aggregate([
        { $match: matchRules },
        { $sample: { size: limit } }
    ]);

    res.status(200).json({ status: 'success', questions });
});

export const getQuestionById = asyncWrapper(async (req, res) => {
    const question = await Question.findById(req.params.id);

    if (!question) {
        throw new ApiError(404, 'Question not found');
    }

    res.status(200).json({ status: 'success', question });
});
