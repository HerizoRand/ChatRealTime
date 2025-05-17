import { useEffect } from "react";
import socket from './socket'
import { SocketContext } from "./SocketContext";


export const SocketProvider = ({ children }) => {
    // gestion d'ouverture et de fermeture
    useEffect(() => {
        socket.connect()

        return () => {
            socket.disconnect(0)
        }
    } , [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}