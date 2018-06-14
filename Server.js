const express = require('express')
const app = express();
const net = require('net')

var clients = [];
var server = net.createServer(socket => {

    clients.push(socket);
    console.log(`Socket Added : ${socket.remoteAddress} : ${socket.remotePort}`);
    socket.on('data', function (data) {
        broadcastOddEven(data, socket);
    });

    socket.on('close', function (socket) {
        console.log(`inside close : ${socket.remoteAddress} : ${socket.remotePort}`);
        clients.splice(clients.indexOf(socket), 1);

    });
    socket.on('error', function (exception) {
        console.log(`SOCKET ERROR : ${socket.remoteAddress} : ${socket.remotePort}`);
    });

    socket.write("Connected to Server");

});

function broadcastOddEven(message, sender) {
    let recieverIndex = (clients.indexOf(sender) % 2) == 0 ? 1 : 0;
    console.log(recieverIndex);
    for (let i = recieverIndex; i < clients.length; i += 2)
        clients[i].write(message);
};


server.listen(8000, () => console.log("server started"));