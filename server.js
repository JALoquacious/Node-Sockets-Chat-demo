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

app.post('/messages', async (req, res) => {
    try {
        const message = new Message(req.body);
        const savedMessage = await message.save();
        const guid = await Message.findOne({
            content: /{?[0-9A-F]{8}-?[0-9A-F]{4}-?[0-9A-F]{4}-?[0-9A-F]{4}-?[0-9A-F]{12}\}?/gi
        });
    
        if (guid) {
            io.emit('guidError');
            await Message.deleteOne({ _id: guid.id });
        } else {
            io.emit('message', req.body);
        }
        res.sendStatus(200);

    } catch (err) {
        res.sendStatus(500);
        return console.error(`A server error occurred: ${err}`);
    }
});

io.on('connect', (socket) => {
    console.log('User connected to socket.');
});

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
    console.log(`MongoDB connected. Error?: ${err}`)
});