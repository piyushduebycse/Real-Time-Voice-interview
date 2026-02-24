import 'dotenv/config';
import app from './app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use. Kill the existing process or change PORT.`);
            } else {
                console.error('Server error:', err);
            }
            process.exit(1);
        });
    } catch (error) {
        console.error(`Failed to start server:`, error);
        process.exit(1);
    }
};

startServer();
