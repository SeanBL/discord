import { io } from "socket.io-client";
  const socket = io("http://localhost:3000/");

  let arry = [];

  socket.on("connect", () => {

    socket.on("getfirst", (data) => {
      if(data) {
        console.log(data);
        arry = data;
      }
      console.log(socket.id);
      
    })

    socket.on("foo", (data) => {
      if(data) {
        console.log(data);
        arry = data.data;
      }
    })
  });
  let test = JSON.stringify(arry)
  document.getElementById("demo").innerHTML = "test";




// const ws = new WebSocket('ws://localhost:8080')

// ws.on('error', console.error);

// ws.on('open', function open() {
//   ws.send('something');
// });

// ws.on('message', function message(data) {
//   console.log('received: %s', data);
// });
// ws.onopen = () => {
//   console.log('ws opened on browser')
//   ws.send('hello world')
// }

// ws.onmessage = (message) => {
//   console.log(`message received`, message.data)
// }
















