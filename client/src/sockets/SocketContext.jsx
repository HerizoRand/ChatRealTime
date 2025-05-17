import { createContext , useEffect } from "react";
import socket from './socket'

// gestion une seul instance de socket pas beaucout
// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext(null)

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