'use strict';

let name;
let socket;

function addMessage(message) {
    document.getElementById('messages').innerHTML = document.getElementById('messages').innerHTML +
        `<span class="message">${message.sender}: ${message.message}</span><br/>`;
}

function confirmName() {
    name = document.getElementById('name-input').value;
    if (name === '') {
        alert('Nome inválido.');
        return;
    }

    socket = io('http://desenvvar36-lnx:2999');

    socket.emit('name', name);
    socket.on('connect', goToChat);
    socket.on('message', message => addMessage(JSON.parse(message)));

}

const nameInput = document.getElementById('name-input');
nameInput.focus();
document.getElementById('set-name-button')
    .addEventListener('click', confirmName);
nameInput
    .addEventListener('keydown', e => {
        if ('Enter' === e.key) {
            confirmName();
        }
    });

function goToChat() {
    document.getElementById('login').style.visibility = 'hidden';
    document.getElementById('chat').style.visibility = 'visible';
    document.getElementById('message-input').focus();
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value;
    if (message !== '') {
        const wsMessage = {sender: name, message: message};
        addMessage(wsMessage);
        socket.emit('message', JSON.stringify(wsMessage));
        input.value = '';
    }
}

document.getElementById('send-button')
    .addEventListener('click', sendMessage);
document.getElementById('message-input')
    .addEventListener('keydown', e => {
        if ('Enter' === e.key) {
            sendMessage();
        }
    });
