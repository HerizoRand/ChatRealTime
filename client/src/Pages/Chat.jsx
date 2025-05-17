import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Message from '../components/Message';

const socket = io('http://192.168.10.91:3000');

const Chat = () => {
  const [username, setUsername] = useState('Alice');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Historique
    socket.on("chat history" , (data) => {
      setMessages(data)
      console.log("data" , data);
    })
    
    socket.on("chat message", (data) => {
      setMessages((prev) => [...prev , data])
    })
    
    socket.on("hello" , (arg , callback) => {
      console.log(arg)
      callback("got it")
    })

    return () => {
      socket.off('chat message')
      socket.off('chat history')
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('chat message', { username , text: input });
      setMessages((prev) => [...prev, {username ,text: input}])
      setInput('');
    }
  };
  return (
    <div>
      <h3>Chat</h3>
      {messages.length === 0 && <p>Aucun message</p>}
      {messages.map((m, i) => (
        <Message key={i}>
          <strong>{m.sender}</strong> {m.content}
        </Message>
      ))}
      <div>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}>Envoyer</button>
      </div>
      
    </div>
  );
};

export default Chat;
