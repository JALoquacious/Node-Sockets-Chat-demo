const express = require('express');
const app = express();

app.use(express.static(__dirname));

const messages = [
    { title: 'Joe', content: 'Hello, World!' },
    { title: 'Jan', content: 'Hello, World!' },
    { title: 'Bob', content: 'Hello, World!' },
    { title: 'Sue', content: 'Hello, World!' }
];

app.get('/messages', (req, res) => {
    res.send(messages);
});

const server = app.listen(3000, () => {
    console.log(`Server is listening on port ${server.address().port}.`);
});