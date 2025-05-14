module.exports = (io , socket) => {
    socket.emit("hello" , "world" , (response)=> {
        console.log("Reponse du client" , response)
    })
}