const express = require('express')
const { createServer } = require("http")
const { join } = require('path')
const { Server } = require('socket.io')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer , {})

const count = io.engine.clientsCount
app.get('/' , (req, res)=> {
    res.sendFile(join(__dirname , 'index.html'))
})


io.on("connection" , (socket) => {
    console.log("Hello world")
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT , () => {
    console.log("Server connected")
    console.log(count)
})