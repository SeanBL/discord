const express = require("express");
const PORT = 3000;
const { createServer } = require("http");
const { Server } = require("socket.io");
const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

io.on("connection", async(socket) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'red999',
    database: "mydb"
  });

  const instance = new MySQLEvents(connection, {
    startAtEnd: true,
  });

  await instance.start();

  instance.addTrigger({
    name: 'TEST',
    expression: 'mydb.users',
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: (event) => {
      console.log(event);
      if(event) {
        const sql = "SELECT * from users";
        connection.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          socket.emit("foo", {data:result})
        })
      }
    },
  });

  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);

  const sql = "select * from users";
        connection.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          socket.emit("getfirst", result);
        })
  console.log("user connected");
})

httpServer.listen(PORT, ()=> {
  console.log(`Server listening on http://localhost:${PORT}`)
});
//const WebSocket = require('ws');
//import { WebSocketServer } from "ws";
//const app = express();







// // Create a WebSocket server on port 8080
// const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', function connection(ws) {
//     ws.on('message', function message(data) {
//       console.log('received: %s', data);
//     });
  
//     ws.send('something');
// });





// let mysql = require('mysql2');
// let con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "red999",
//     database: "mydb"
// })

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// //app.use(routes);

// //initialize a simple http server
// const server = http.createServer(app);

// //initialize the WebSocket server instance
// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {

//     ws.on('error', console.error);
//     //connection is up, let's add a simple simple event
//     ws.on('message', (message) => {

//         //log the received message and send it back to the client
//         console.log('received: %s', message);
//         ws.send(`Hello, you sent -> ${message}`);
//     });

//     //send immediatly a feedback to the incoming connection    
//     ws.send('Hi there, I am a WebSocket server');
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Database Connected!");
//     let sql2 = "CREATE TABLE users (name VARCHAR(255), tag VARCHAR(255))";
//     let sql = "ALTER TABLE users ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
//     con.query(function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
//     //start our server
//     server.listen(3001, () => {
//     console.log(`Server started on port ${server.address().port} :)`);
//     });
// });










// let mysql = require('mysql2');
// let con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "red999",
//     database: "mydb"
// })

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     let sql2 = "CREATE TABLE users (name VARCHAR(255), tag VARCHAR(255))";
//     let sql = "ALTER TABLE users ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
//     con.query(function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     })
//     app.listen(port, () => {
//         console.log(`API server running on http://localhost:${port}`);
//     });
// });

// app.listen(port, () => {
//     console.log(`API server running on http://localhost:${port}`);
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         let sql2 = "CREATE TABLE users (name VARCHAR(255), tag VARCHAR(255))";
//         let sql = "ALTER TABLE users ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
//         con.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log("Table created");
//         })
//     });
// });