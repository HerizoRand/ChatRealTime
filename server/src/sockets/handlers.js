const Message = require('../models/Messages')
const User = require('../models/Users')


module.exports = async (io , socket) => {
    // Client connected
    console.log("New Client connected : ", socket.id)
    
    const history = await Message.find().sort({ timestamp: 1 }).populate('sender' , 'username')
    // console.log(history);
    socket.emit('chat history' , history.map(msg => ({
        sender: msg.sender.username, 
        content: msg.content,
        timestamp: msg.timestamp
    })))

    const clientDisconnect = () => {
        console.log('Client disconnect :' , socket.id)
    }

    const message = async (data) => {
        try {
            // data = { username: "John" , text: "Coucou"}

            // Touver ou creer l'utlisateur 
            let user = await User.findOne({ username: data.username })
            if (!user) {
                user = await User.create({ username: data.username })
            }

            // Creer le message 
            const newMessage = await Message.create({
                sender: user._id,
                content: data.text
            })

            const toSend = {
                sender: user.username,
                content: newMessage.content,
                timestamp: newMessage.timestamp
            };

            io.emit('chat message:', toSend);
        } catch (e) {
            console.error('Erreur lors de l’enregistrement du message :', e);
        }
    }

    const notificationFunction = (data) => {
        io.emit('dataUpdate' , data)
    }
    

    socket.on("disconnect" , clientDisconnect)
    socket.on("chat message" , message)
}