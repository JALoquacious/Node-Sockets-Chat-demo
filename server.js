const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const dbUrl = require('./credentials.config').dbUrl;

const server = http.listen(3000, () => {
    console.log(`Server is listening on port ${server.address().port}.`);
});

const Message = mongoose.model('Message', {
    name: String,
    content: String
});

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    });
});

app.post('/messages', (req, res) => {
    const message = new Message(req.body);

    message.save((err) => {
        if (err) res.sendStatus(500);

        io.emit('message', req.body);
        res.sendStatus(200);
    });
});

io.on('connect', (socket) => {
    console.log('User connected to socket.');
});

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    console.log(`MongoDB connected. Error?: ${err}`)
});