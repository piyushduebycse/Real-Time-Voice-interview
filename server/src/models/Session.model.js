import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String },
    category: { type: String },
    difficulty: { type: String },
    status: { type: String, enum: ['active', 'completed', 'abandoned'], default: 'active' },
    totalQuestions: { type: Number },
    answeredCount: { type: Number, default: 0 },
    averageScore: { type: Number },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date }
});

const Session = mongoose.model('Session', SessionSchema);
export default Session;
