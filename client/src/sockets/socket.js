import { io } from 'socket.io-client'

// connection
const socket = io("http://192.168.10.91:3000", {
    autoConnect: false, 
})

export default socket