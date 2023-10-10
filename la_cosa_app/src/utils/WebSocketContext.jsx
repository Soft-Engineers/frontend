import {useState, useEffect, createContext, useContext} from 'react';

export const WebSocketContext = createContext();

export const useWebSocket = () => {
    const {socket} = useContext(WebSocketContext);
    return socket;
};

export const WebSocketProvider = ({children, match_name}) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8000/ws/${match_name}`);
        ws.onopen = () => {
            console.log("Conectado al servidor");
            console.log(ws);
        };

        ws.onclose = () => {
            console.log("Desconectado del servidor");
        };
        setSocket(ws);
    }, []);

    return (
        <WebSocketContext.Provider value={{socket}}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default {WebSocketProvider, useWebSocket};