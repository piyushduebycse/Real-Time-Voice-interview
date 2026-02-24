import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './src/routes/index.js';
import { errorHandler } from './src/middleware/errorHandler.middleware.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5173'],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is running' });
});

// Routes
app.use('/api', routes);

// Global Error Handler
app.use(errorHandler);

export default app;
