const express = require('express')
const { createServer } = require("http")
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

app.use(cors())
app.get('/' , (req, res)=> {
    res.send('Socket.io running')
})


io.on("connection" , (socket) => {
    console.log("New Client connected : ", socket.id)

    socket.on('chat message' ,(msg)=> {
        console.log('Message : ' , msg)
        io.emit('chat message:', msg)
    })

    socket.on('disconnect' , ()=> {
        console.log('Client disconnect :' , socket.id)
    })

    socket.emit("hello" , "world" , (response)=> {
        console.log(response)
    })

    socket.join("room 237")
})
io.engine.on("connection_error" , (err) => {
    console.log(err.req);
    console.log(err.code)
    console.log(err.context);
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT , () => {
    console.log(`Server connected on port ${PORT}`)
})