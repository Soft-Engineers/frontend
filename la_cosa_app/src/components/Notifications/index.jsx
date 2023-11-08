import React, {useEffect, useRef, useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { List } from '@mui/material';
import { useMatchC, turnStates } from '../../screens/Match/matchContext.jsx';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";

const ListStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
};

const Notifications = ({ messages }) => {
    const { state } = useMatchC();
    const scrollRef = useRef(null);

    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        setMessageList((prevMessages) => {
            return [...prevMessages , ...messages];
        });
    }, [messages]);

    useEffect(() => {
        if (scrollRef.current) {
            const messageBody = scrollRef.current;
            messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
        }
    }, [messageList]);

    const renderMessage = (message, index) => {
        const isInfected = message.includes('LA COSA TE INFECTÓ!!');
        const messageStyle = {
            color: isInfected ? 'red': 'black',
        };

        return (
            <ListItem key={index} style={{borderTop: index === 0 ? 'none' : '1px dashed black',}}>
                <ListItemText primary={message} style={messageStyle} />
            </ListItem>
        );
    };

    return (
        <Box style={ListStyle}>
            <ListItem sx={{flexDirection: 'column', alignItems: 'center', borderBottom: '0.1px solid black'}}>
                <ListItemText primary={
                    <Typography variant="h5" style={{ color: 'green'}}>
                        {`Es ${state.isTurn ? 'tu turno' : 'el turno de ' + state.currentTurn}`}
                    </Typography>
                } />
                {state.isTurn && (
                    <Typography variant="h6" style={{ color: '#3968B1', marginTop: '12px' }}>
                        {state.turnState === turnStates.WAIT_DEFENSE
                            ? 'Te estas defendiendo'
                            : state.turnState === turnStates.WAIT_EXCHANGE || state.turnState === turnStates.EXCHANGE
                            ? 'Tenés que intercambiar una carta'
                            : state.turnState === turnStates.DRAW_CARD
                            ? 'Tenés que robar una carta'
                            : state.turnState === turnStates.PLAY_TURN
                            ? 'Tenés que jugar o descartar una carta'
                            : state.turnState === turnStates.PANIC
                            ? 'Tenés que jugar la carta de pánico'
                            :   null }

                    </Typography>
                )}
                {!state.isTurn && (
                    <Typography variant="h6" style={{ color: '#3968B1', marginTop: '12px' }}>
                        {state.turnState === turnStates.WAIT_EXCHANGE || state.turnState === turnStates.WAIT_DEFENSE
                        ? state.esperaMessage
                        : 'Esperando tu turno...'}

                    </Typography>
                )}
            </ListItem>
            <div style={{ maxHeight: '100%', overflowY: 'auto'}} ref={scrollRef}>
                <List >
                    {messageList.map((message, index) => renderMessage(message, index))}
                </List>
            </div>
        </Box>
    );
};

export default Notifications;
