import React from 'react'
import { useEffect , useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

const Test = () => {
    const [message , setMessage] = useState('')
    const [messages , setMessages] = useState([])

    useEffect(() => {
         socket.on('chat message', (msg) => {
        setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('chat message');
    };
    }, [])

    const sendMessage = () => {
        if (message.trim) {
            socket.emit('chat message' , message)
            setMessage('')
        }
    }
  return (
    <div>
        <h2>💬 Mini Chat Socket.IO</h2>
        <div>
            {messages.map((msg , i) => {
                <div key={i}>🗨️ {msg}</div>
            })}
        </div>
        <input
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
            placeholder='Place ton message'
        />
        <button onClick={sendMessage}>Envoyer</button>
    </div>
  )
}

export default Test