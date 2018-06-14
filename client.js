const net = require('net')
const client = net.connect({ port: 8000 }, () => console.log("client connected"));
var stdin = process.openStdin();

stdin.addListener("data", function (data) {
    client.write(data);
});
client.on('data', (data) => console.log(`Server sent : ${data}`));

client.on('close', function () {
    console.log('Connection closed');
});