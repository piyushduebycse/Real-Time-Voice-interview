import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    category: { type: String, enum: ['technical', 'behavioral', 'hr', 'system-design'] },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
    tags: [{ type: String }],
    idealAnswer: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', QuestionSchema);
export default Question;
