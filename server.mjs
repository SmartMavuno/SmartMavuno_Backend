import express, { json } from 'express';
import dotenv from 'dotenv'; // Change to import
import pool from './src/config/db.js';

dotenv.config(); // Call dotenv.config() after importing

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(json());

app.get('/', (_req, res) => {
    res.send('Backend is running!');
});

app.get('/db-test', async (_req, res) => {
    try {
        const result = await pool.query('SELECT 1 AS success');
        res.status(200).json({
            message: 'Database connection is successful',
            result: result.rows,
        });
    } catch (err) {
        console.error('Database connection test failed:', {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            error: err.message,
        });
        res.status(500).json({
            message: 'Database connection failed',
            error: err.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
