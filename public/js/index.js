'use strict';

let name;
let socket;

const addMessage = message => {
    document.getElementById('messages').innerHTML = document.getElementById('messages').innerHTML +
        `<span class="message">${message.sender}: ${message.message}</span><br/>`;
};

document.getElementById('set-name-button')
    .addEventListener('click', () => {
        console.log('oi');
        name = document.getElementById('name-input').value;
        if (name === '') {
            alert('Nome inválido.');
            return;
        }

        socket = io('http://desenvvar36-lnx:2999');

        socket.emit('name', name);
        socket.on('connect', goToChat);
        socket.on('message', message => addMessage(JSON.parse(message)));

    });

function goToChat() {
    document.getElementById('login').style.visibility = 'hidden';
    document.getElementById('chat').style.visibility = 'visible';
}

document.getElementById('send-button')
    .addEventListener('click', () => {
        const input = document.getElementById('message-input');
        const message = {sender: name, message: input.value};
        addMessage(message);
        socket.emit('message', JSON.stringify(message));
        input.value = '';
    });
