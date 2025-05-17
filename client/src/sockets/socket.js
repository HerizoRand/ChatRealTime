import { io } from 'socket.io-client'

// connection
const socket = io("http://localhost:3000", {
    autoConnect: false, 
})

export default socket