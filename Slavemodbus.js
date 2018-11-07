let net = require('net')
let modbus = require('jsmodbus')
let netServer = new net.Server()
let holding = Buffer.alloc(10000)
let server = new modbus.server.TCP(netServer)
var greenColor = '\x1b[32m%s\x1b[0m';

server.on('connection', function (client) {
  console.log(greenColor, 'New Connection')
})
server.on('readHoldingRegisters', function (request, response, send) {
  var number = setInterval(random, 500);

  function random() {
    var number = Math.floor((Math.random() * 100) + 1);
    console.log(number);
  }
})
server.on('WriteSingleRegister', function (value, address) {
  console.log('New {register, value}: {', address, ',', server.holding.readUInt16BE(address), '}')
})
netServer.listen(3333)
