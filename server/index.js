import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDb from './src/configs/database.js';
import router from './src/routes/index.js';

// Socket.io
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const port = process.env.PORT || 8888;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Connect database
connectDb();

// Middlewares
app.use(
    cors({
        origin: process.env.REACT_APP_BASE_URL,
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

// Socket.io
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.REACT_APP_BASE_URL,
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
    console.log(`user ${socket.id} connected`);
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    socket.on('sendNotification', ({ _id, receiverId, text, link, isRead }) => {
        const receiveUser = users?.find((item) => item?.userId === receiverId);
        io.to(receiveUser?.socketId).emit('getNotification', {
            receiverId,
        });
    });

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected!`);
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});

server.listen(port, () => console.log(`Server is running at port ${port}`));
