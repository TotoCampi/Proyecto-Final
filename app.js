// create a tcp modbus client
let Modbus = require('jsmodbus');
let net = require('net');
let socket = new net.Socket();
let client = new Modbus.client.TCP(socket);
let options = {
'host' : '172.22.35.219',
'port' : 3333
}

socket.on('connect', function () {
  client.writeSingleRegister(1002, 333)
    .then(function (resp) {
      console.log(resp)
      socket.end()
    }).catch(function () {
      console.error(arguments)
      socket.end()
    })
})

socket.on('error', console.error)
socket.connect(options)
