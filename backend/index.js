import express from 'express';
import cors from 'cors';
import ConnectDB from './src/database/database.js';
import dotenv from 'dotenv';
import TaskRouter from './src/route/task.route.js';

dotenv.config({ path: './.env' });

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], credentials: true }));
app.use(express.json());

ConnectDB();

app.use('/api', TaskRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});