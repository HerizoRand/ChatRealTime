module.exports = (io , socket , messages) => {


    const clientDisconnect = () => {
        console.log('Client disconnect :' , socket.id)
    }

    const message = (data) => {
        // console.log('Message : ' , msg)
        messages.push(data)

        // Diffuser le message 
        io.emit('chat message:', data)
    }
    
    console.log("New Client connected : ", socket.id)
    socket.emit("chat history" , messages)
    socket.on("disconnect" , clientDisconnect)
    socket.on("chat message" , message)
}