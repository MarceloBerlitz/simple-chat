'use strict';

let name;
let color;
let socket;

const colors = [
    '#FF87A2',
    '#B66BE8',
    '#839EFF',
    '#6BE8E6',
    '#6BE8A6',
    '#FFB77A',
];

function addMessage(message) {
    document.getElementById('messages').innerHTML = document.getElementById('messages').innerHTML +
        `<span class="sender" style="color: ${message.color}">${message.sender}:</span><span class="message">${message.message}</span><br/>`;
}

function confirmName() {
    name = document.getElementById('name-input').value;
    color = colors[Math.floor(Math.random() * colors.length)];
    if (name === '') {
        alert('Nome inválido.');
        return;
    }

    socket = io(':2999');

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
        const wsMessage = {sender: name, message: message, color: color};
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
