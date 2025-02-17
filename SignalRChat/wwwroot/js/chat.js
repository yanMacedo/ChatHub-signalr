"use strict";


var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

var group = '';
var chooseHtmlGroup = document.getElementById('textGroup');
var buttonA = document.getElementById('joinGroupAButton');
var buttonB = document.getElementById('joinGroupBButton');

var user = document.getElementById('userText');
var userText = document.getElementById('userInput');
var message = document.getElementById('messageText');
var messageText = document.getElementById('messageInput');
var enterButton = document.getElementById('sendButton');


//user.style.visibility = 'hidden';
//userText.style.visibility = 'hidden';
//message.style.visibility = 'hidden';
//messageText.style.visibility = 'hidden';
//enterButton.style.visibility = 'hidden';


document.getElementById("sendButton").disabled = true;

connection.on('ReceiveMessage', function (user, message) {
    var li = document.createElement('li');
    document.getElementById('messagesList').appendChild(li);

    li.textContent = `${user}: ${message}`;
});

connection.start().then(function () {
    document.getElementById('sendButton').disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById('sendButton').addEventListener('click', function (event) {
    var user = document.getElementById('userInput').value;
    var message = document.getElementById('messageInput').value;
    connection.invoke('SendMessage', user, message).catch(function (err) {
        return console.log(err.toString());
    });
    event.preventDefault();
});
document.getElementById('sendGroupButton').addEventListener('click', function (event) {
    var user = document.getElementById('userInput').value;
    var message = document.getElementById('messageInput').value;
    connection.invoke('SendMessageToGroup', group, user, message).catch(function (err) {
        return console.log(err.toString());
    });
    event.preventDefault();
});


buttonA.addEventListener('click', function (event) {

    connection.invoke('JoinGroup', 'Group A').catch(function (err) {
        return console.log(err.toString());
    });
    event.preventDefault;
    group = 'Group A';
    alert('You Join to Group A');
});

buttonB.addEventListener('click', function (event) {
    connection.invoke('JoinGroup', 'Group B').catch(function (err) {
        return console.log(err.toString());
    });
    event.preventDefault;
    group = 'Group B';
    alert('You Join to Group B');
})

