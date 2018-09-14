$(() => {
    $('#send').click(() => {
        appendMessage({ title: 'Joe', content: 'Hello, World!' });
    });
    getMessages();
});

function appendMessage(message) {
    $('#messages').append(`<h4> ${message.title} </h4> <p> ${message.content} </p>`);
}

function getMessages() {
    $.get('http://localhost:3000/messages', (data) => {
        data.forEach(appendMessage);
    });
}