module.exports = (io , socket) => {

    console.log("New Client connected : ", socket.id)

    const clientDisconnect = () => {
        console.log('Client disconnect :' , socket.id)
    }

    const message = (msg) => {
        console.log('Message : ' , msg)
        io.emit('chat message:', msg)
    }

    socket.on("disconnect" , clientDisconnect)
    socket.on("chat message" , message)
}