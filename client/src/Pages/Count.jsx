import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

const Count = () => {
    const [count , setCount] = useState(0)
    
    useEffect (() => {
        socket.on("count history" , (count) => {
            setCount(count.value)
            console.log('Historique' , count.value)
        })
        socket.on("count updated" , (count) => {
            setCount(count)
            console.log('Mise a jour' , count)
         })

        return () => {
            socket.off('count history')
            socket.off('count updated')
        }
    }, [])

    const updateCount = () =>{
        socket.emit('count update')
    }


  return (
    <div>
        <h1>{count}</h1>
        <button
            onClick={updateCount}
        > Ajouter le compteur</button>
    </div>
  )
}

export default Count