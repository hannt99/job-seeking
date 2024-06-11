import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDb from './src/configs/database.js';
import router from './src/routes/index.js';

const app = express();
const port = process.env.PORT || 8888;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Connect database
connectDb();

// Middlewares
app.use(
    cors({
        origin: '*',
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'uploads')));

// Set header
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Routes init
app.use('/api/v1', router);

app.listen(port, () => console.log(`Server is running at port ${port}`));
