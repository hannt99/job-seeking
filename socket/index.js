import { Server } from 'socket.io';

const io = new Server({
    cors: {
        origin: 'http://localhost:3000',
    },
});

let users = [];

let assignToUsers = [];

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

    socket.on('sendNotification', ({ senderId, _id, receiverId, text, link, isRead }) => {
        const receiveUser = users?.find((item) => item?.userId === receiverId);
        io.to(receiveUser?.socketId).emit('getNotification', {
            senderId,
            _id,
            text,
            receiverId,
            link,
            isRead,
        });
    });

    socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected!`);
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});

io.listen(5000);
