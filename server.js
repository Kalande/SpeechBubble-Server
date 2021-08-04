const app = require("./app");
const express = require('express')
const Message = require('./models/message')

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

let myServer = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});


// Socket io instance
const { Server } = require('socket.io')
const io = new Server(myServer, {
  cors: { origin: '*'}
})

//Socket Events

io.on('connection', socket =>{
  console.log('user connected');
  socket.on('disconnect', ()=>{
    console.log('user disconnected');
  })
  socket.on('joinChat', data =>{
    socket.join(data)
  })
  socket.on('sendMessage', data => {
    const {content: {sender, message}, roomId}= data
    let newMessage = {
      sender: sender._id,
      message: message,
      roomId: roomId
    }
    Message.create(newMessage).then(()=>{
      socket.to(data.roomId).emit('receiveMessage', data.content)
    })
  })
})

