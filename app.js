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
const collectionName = 'rtu-data'

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
'host' : '127.0.0.1',
'port' : 3333,
'debug': true
}

socket.on('connect', function () {
  setInterval(() => {
    client.readHoldingRegisters(0, 2)
      .then(function (resp) {
        console.log("READ response: ", resp.response._body.valuesAsArray)
        //hacer funcion DATOS desde aca
        const fecha = new Date();
        const numero = resp.response._body.valuesAsArray[0]
        const data = {
          fecha: fecha,
          numero: numero
        };
        MongoClient.connect(url, function(err,db){
          if (err) throw err;
          // Accedo a la base de datos previamente creada
          var dbo= db.db("mydb");

          // Accedo a la collection e inserto un elemento
          dbo.collection(collectionName).insertOne(data, function(err,response){
            db.close()
            if (err){
              console.log (err);
            }
            else {
              console.log("1 document inserted")
            }
          });
        });
        //Hasta aca
      }).catch(function (err) {

        console.error(err)
        socket.end()
      })

  }, 3000);
});
//modifique de aca
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection(collectionName);
  // Find some documents
  collection.find({}).toArray(function(err, docs) {

    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

app.get('/list', function(req,res){
  MongoClient.connect(url, function(err,db){

    if (err) throw err;

    var dbo= db.db("mydb")

    findDocuments(dbo, function(docs){
      db.close()
      res.json(docs)
    })
  })
});
//hasta aca
socket.on('error', (err) => console.error(err))
socket.connect(options)
app.listen(3000,function(){
  console.log('Example app listening on port 3000!');
});


// client.writeSingleRegister(0, 33)
//  .then(function (resp) {
  //    console.log(resp)
  //    client.readHoldingRegisters(0, 1)
  //      .then(function (resp) {
    //        console.log("READ response: ", resp.response._body.valuesAsArray)
    //        socket.end()
    //      }).catch(function (err) {
      //        console.error(err)
      //        socket.end()
      //      })
      //  }).catch(function () {
        //    console.error(arguments)
        //    socket.end()
        //  })
