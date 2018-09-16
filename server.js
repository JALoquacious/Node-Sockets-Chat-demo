const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const server = http.listen(3000, () => {
    console.log(`Server is listening on port ${server.address().port}.`);
});

const messages = [
    { name: 'Joe', content: 'Hello, World, I\'m Joe!' },
    { name: 'Jan', content: 'Hello, World, I\'m Jan!' }
];

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
});

io.on('connect', (socket) => {
    console.log('User connected to socket.');
});