import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Chat from './Pages/Chat.jsx'
import Count from './Pages/Count.jsx'

createRoot(document.getElementById('root')).render( 
    <div>
        <Chat />
        <Count />
    </div>
)
