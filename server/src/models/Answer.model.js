import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    audioUrl: { type: String },
    transcript: { type: String, required: true },
    feedback: {
        score: { type: Number, min: 0, max: 10 },
        clarity: { type: String, enum: ['poor', 'fair', 'good', 'excellent'] },
        relevance: { type: String, enum: ['off-topic', 'partial', 'relevant', 'highly-relevant'] },
        confidence: { type: String, enum: ['low', 'moderate', 'high'] },
        strengths: [{ type: String }],
        improvements: [{ type: String }],
        suggestedAnswer: { type: String },
        summary: { type: String }
    },
    duration: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

const Answer = mongoose.model('Answer', AnswerSchema);
export default Answer;
