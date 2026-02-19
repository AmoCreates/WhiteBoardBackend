import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = new Server(server, {
    cors: {
        origin: 'https://whiteboard-blush.vercel.app',
        methods: ["GET", "POST"],
    }
});

app.get('/', (req, res) => {
    res.send("Sever is running");
})

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('draw', (data) => {
        io.emit('on_draw', {x: data.x, y: data.y})
    })

    socket.on('mousedown', (data) => {
        io.emit('on_mouse_down', {x: data.x, y: data.y})
    })


    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    });
})

server.listen(port);