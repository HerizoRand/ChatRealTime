// require("dotenv").config()
// const express = require('express')
// const cors = require('cors')

// const app = express()

// const PORT = process.env.PORT 
// app.listen(PORT , () => {
//     try{
//         console.log('Server connected')
//     } catch (e) {
//         console.log('error' . e)
//     }
// })

const { createServer } = require("http")
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer , {})

io.on("connection" , (socket) => {
    console.log("Hello world")
})

httpServer.listen(3000 , () => {
    console.log("Server connected")
})