const express = require('express');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('message', message => socket.broadcast.emit('message', message));
});

app.use(express.static('public'));

const port = 2999;
server.listen(port, () => {
    console.log(`listen on port ${port}`)
});
