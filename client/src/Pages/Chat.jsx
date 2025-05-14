import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Message from '../components/Message';

const socket = io('http://localhost:3000');

const Chat = () => {
  const [username, setUsername] = useState('Alice');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', (data) => {
      console.log('Message reçu :', data);
      setMessages((prev) => [...prev, data]);
    });

    socket.on("hello" , (arg , callback) => {
      console.log(arg)
      callback("got it")
    })

    return () => socket.off('chat message');
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('chat message', { username, message: input });
      setMessages((prev) => [...prev, {username,text: input}])
      setInput('');
    }
  };
  return (
    <div>
      <h3>Chat</h3>
      {messages.length === 0 && <p>Aucun message</p>}
      {messages.map((m, i) => (
        <Message key={i}>
          <strong>{m.username}</strong> {m.text}
        </Message>
      ))}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
};

export default Chat;
