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
        socket.emit('count add')
    }
    const minusCount = () => {
        socket.emit('count minus')
    }


  return (
    <div>
        <h1>{count}</h1>
        <button
            onClick={addCount}
        > Ajouter le compteur</button>
        <button
            onClick={minusCount}
        > Ajouter le compteur</button>
    </div>
  )
}

export default Count