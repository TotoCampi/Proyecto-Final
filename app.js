//Crea la Collection de la base de datos
var express=require('express')
var cors= require('cors')
var app=express()
const {ObjectId}= require('mongoDb');
app.use(cors());
app.use(express.json());
// le digo al servidor que escuchar
var MongoClient=require('mongodb').MongoClient;
var url= "mongodb://localhost:27017/";
const collectionName= 'Number List'
// Crear la base de datos y una collection
MongoClient.connect(url, function(err,db){
  if (err) {
    console.log('Error!',err)
  }

  var dbObject= db.db("mydb")
  dbObject.createCollection(collectionName, function(err, response){
    if (err) {
      console.log("Error!");
    }
    else console.log("Collection created!")
    // db.close() cierra la conexion
    db.close();
  });
});











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
