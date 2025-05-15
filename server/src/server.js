const express = require('express')
const { createServer } = require("http")
const { Server } = require('socket.io')
const cors = require('cors')
const connectDB = require('./config')

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


const clientHandlers = require('./sockets/handlers')
const testHandlers = require('./sockets/testHandler')

connectDB().then(async () => {
  console.log("Db connected");
});

io.on("connection" , (socket) => {
    clientHandlers(io , socket)
    // testHandlers(io, socket)
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT , () => {
    console.log(`______Server connected on port ${PORT}`)
})