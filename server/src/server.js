const express = require('express')
const { createServer } = require("http")
const { join } = require('path')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer , {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET' , 'POST']
    }
})

const count = io.engine.clientsCount
app.use(cors())
app.get('/' , (req, res)=> {
    res.send('Socket.io running')
})


io.on("connection" , (socket) => {
    console.log("New Client connected : ", socket.id)
    console.log("Hello world")

    socket.on('chat message' ,(msg)=> {
        console.log('Message : ' , msg)
        io.emit('chat message:', msg)
    })

    socket.on('diconnect' , ()=> {
        console.log('Client disconnect' , socket.id)
    })
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT , () => {
    console.log("Server connected")
    console.log(count)
})