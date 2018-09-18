const socket = io();
let errorFlag = false;

$(() => {
    $('#send').click(() => {
        postMessage({
            name: $('#name').val(),
            content: $('#content').val()
        });
        clearFields();
    });

    getMessages();
});

function appendMessage(msg) {
    $('#messages').append(`<h4> ${msg.name} </h4> <p> ${msg.content} </p>`);
}

function clearFields() {
    $('#name').val('');
    $('#content').val('');
}

function getMessages() {
    $.get('http://localhost:3000/messages', (data) => {
        data.forEach(appendMessage);
    });
}

function postMessage(msg) {
    $.post('http://localhost:3000/messages', msg);
}

function showGuidErrorAlert() {
    $('#guid-error').css('display', 'block');
}

function hideGuidErrorAlert() {
    $('#guid-error').hide();
}

socket.on('message', (msg) => {
    hideGuidErrorAlert();
    appendMessage(msg);
});
socket.on('guidError', showGuidErrorAlert);