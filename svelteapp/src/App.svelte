<script>
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

  

</script>

<div>
  main
  {JSON.stringify(arry)}
  
</div>
