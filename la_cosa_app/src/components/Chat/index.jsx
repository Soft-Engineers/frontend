import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMatchC } from "../../screens/Match/matchContext.jsx";
import ListItem from "@mui/material/ListItem";

const BoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
};

const Chat = () => {
    const { state, actions } = useMatchC();
    const scrollRef = useRef(null);
    const [messagesList, setMessagesList] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const newMessage = {
            author: '', // Replace with the actual author's name
            message: (
                <span>
                ¡Bienvenido al Juego de la Cosa! Lee las reglas <a href="https://famaf.aulavirtual.unc.edu.ar/pluginfile.php/27371/mod_resource/content/1/Reglas%20del%20Juego_%20La%20Cosa.pdf" target="_blank" rel="noopener noreferrer">
                    acá
                </a>
            </span>
            ),
            timestamp: new Date().getTime(),
        };
        setMessagesList([...messagesList, newMessage]);
    }, []);

    useEffect(() => {
        setMessagesList((prevMessages) => {
            return [...prevMessages, ...state.messages];
        });
    }, [state.messages]);

    useEffect(() => {
        if (scrollRef.current) {
            const notificationBody = scrollRef.current;
            notificationBody.scrollTop = notificationBody.scrollHeight - notificationBody.clientHeight;
        }
    }, [messagesList]);

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            const request = {
                message_type: 'chat',
                message_content: {
                    message: inputMessage,
                },
            };
            state.socket.send(JSON.stringify(request));

            setInputMessage('');
        }
    };

    const renderMessage = (message, index) => {
        const isMainUser = message.author === sessionStorage.getItem('player_name');
        console.log(localStorage.getItem('player_name'));
        return (
            <ListItem key={index} sx={isMainUser ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }}>
                {isMainUser && (
                <Typography variant="caption" color="textSecondary" sx={{marginRight:'2rem'}} >
                    {new Date(message.timestamp).toLocaleTimeString()}
                </Typography>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMainUser ? 'flex-end' : 'flex-start',
                        backgroundColor: isMainUser ? '#3498db' : '#f2f2ff',
                        padding: '5px 10px',
                        borderRadius: '10px',
                    }}
                >
                    {!isMainUser && (
                        <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 'bold', alignSelf: 'flex-start' }}>
                            {message.author}
                        </Typography>
                    )}
                    <Typography variant="body1">{message.message}</Typography>
                </Box>
                {!isMainUser && (
                    <Typography variant="caption" color="textSecondary" sx={{marginLeft:'2rem'}} >
                        {new Date(message.timestamp).toLocaleTimeString()}
                    </Typography>
                )}
            </ListItem>
        );
    };


    return (
        <Box style={BoxStyle} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <div style={{ overflowY: 'auto',overflowX: 'hidden', minWidth: '100%', flexGrow: 1 }} ref={scrollRef}>
                {messagesList.map((message, index) => renderMessage(message, index))}
            </div>
            <TextField
                label="Escribe un mensaje"
                variant="outlined"
                fullWidth
                value={inputMessage}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSendMessage();
                    }
                }}
            />
        </Box>
    );
};

export default Chat;
