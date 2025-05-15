import connectDB from './config'

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

DB()

const messages = []
const clientHandlers = require('./sockets/handlers')
const testHandlers = require('./sockets/testHandler')


io.on("connection" , (socket) => {

    clientHandlers(io , socket, messages)
    testHandlers(io, socket)

})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT , () => {
    console.log(`______Server connected on port ${PORT}`)
})