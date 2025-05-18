import { useContext , useEffect, useState } from 'react'
import { SocketContext } from '../sockets/SocketContext'


const Count = () => {
    const socket = useContext(SocketContext)
    const [count , setCount] = useState(0)
    console.log(count);
    
    useEffect (() => {
        socket.on("count history" , (data) => {
            setCount(data.value)
        })
        socket.on("count updated" , setCount)

        return () => {
            socket.off('count history')
            socket.off('count updated')
        }
    }, [socket])

    const addCount = () =>{
        socket.emit('count update', { action: 'add'})
    }
    const minusCount = () => {
        socket.emit('count update',  { action: 'minus'})
    }
    const nullCount = () => {
        socket.emit('count update', { action: 'null'})
    }


  return (
    <div>
        <h1>{count}</h1>
        <button
            onClick={addCount}
        > Ajouter le compteur</button>
        <button
            onClick={minusCount}
        > Minus le compteur</button>
        <button
            onClick={nullCount}
        > Reinitialiser</button>
    </div>
  )
}

export default Count