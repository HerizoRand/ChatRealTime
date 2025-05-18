const express = require('express')
const { createServer } = require("http")
const { Server } = require('socket.io')
const cors = require('cors')
const connectDB = require('./config')
const userRoutes = require('./routes/userRoutes')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer , {
    cors: {
        origin: '*',
        methods: ['GET' , 'POST']
    }
})

connectDB().then(async () => {
  console.log("Db connected");
});

app.use(cors())
app.get('/' , (req, res)=> {
    res.send('Socket.io running')
})
app.get("/test", (req, res) => {
  res.send("ok depuis le backend !");
});
// User Route
app.use('/user', userRoutes)

const clientHandlers = require('./sockets/handlers')
const testHandlers = require('./sockets/testHandler')

io.on("connection" , (socket) => {
    clientHandlers(io , socket)
    testHandlers(io, socket)
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT , '0.0.0.0' , () => {
    console.log(`______Server connected on port ${PORT}`)
})