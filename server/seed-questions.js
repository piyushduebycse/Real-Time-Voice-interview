import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './src/models/Question.model.js';

dotenv.config();

const questions = [
    {
        text: 'How do you handle scope and closures in JavaScript?',
        category: 'technical',
        difficulty: 'medium',
        tags: ['javascript', 'fundamentals']
    },
    {
        text: 'Describe a time you had to optimize a slow React application.',
        category: 'technical',
        difficulty: 'hard',
        tags: ['react', 'performance']
    },
    {
        text: 'Tell me about a time you had a conflict with a coworker.',
        category: 'behavioral',
        difficulty: 'medium',
        tags: ['conflict-resolution', 'teamwork']
    },
    {
        text: 'How would you design a URL shortener service like bit.ly?',
        category: 'system-design',
        difficulty: 'hard',
        tags: ['system-design', 'scalability']
    },
    {
        text: 'Why do you want to work for this company?',
        category: 'hr',
        difficulty: 'easy',
        tags: ['motivation', 'culture']
    },
    {
        text: 'What is the difference between SQL and NoSQL databases?',
        category: 'technical',
        difficulty: 'easy',
        tags: ['databases', 'architecture']
    },
    {
        text: 'Describe an interesting technical problem you recently solved.',
        category: 'technical',
        difficulty: 'medium',
        tags: ['problem-solving']
    },
    {
        text: 'Tell me about a time you failed and what you learned from it.',
        category: 'behavioral',
        difficulty: 'medium',
        tags: ['growth-mindset', 'failure']
    }
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB. Seeding questions...');
        await Question.deleteMany({}); // Clear existing
        await Question.insertMany(questions);
        console.log('Successfully seeded questions!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error seeding database:', err);
        process.exit(1);
    });
