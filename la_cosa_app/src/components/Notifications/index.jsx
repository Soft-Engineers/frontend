import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { List } from '@mui/material';
import {useMatchC, turnStates} from "../../screens/Match/matchContext.jsx";
import Typography from "@mui/material/Typography";

const ListStyle = {
    display : 'flex',
    flexDirection: 'column',
};


const Notifications = ({ messages}) => {
    const { state} = useMatchC();

    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        setMessageList((prevMessages) => {
            return [...messages, ...prevMessages];
        });
    }, [messages]);

    const renderMessage = (message, index) => {
        const isInfected = message.includes('LA COSA TE INFECTÓ!!');
        const messageStyle = {
            color: isInfected ? 'red': 'black',
        };

        return (
            <ListItem key={index}>
                <ListItemText primary={message} style={messageStyle} />
            </ListItem>
        );
    };

    return (
        <Paper style={ListStyle}>
            <ListItem sx={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <ListItemText primary={
                    <Typography variant="h6" style={{ color: 'green', borderBottom: '2px solid black'}}>
                        Es el turno de {state.currentTurn}
                    </Typography>
                } />
                {state.isTurn && state.turnState === turnStates.WAIT_DEFENSE && (
                    <Typography variant="h5" style={{ color: '#3968B1', borderBottom: '2px solid black', marginTop: '12px'}}>
                        Te estás defiendiendo
                    </Typography>
                )
                }
            </ListItem>
            <List>
                {messageList.map((message, index) => renderMessage(message, index))}
            </List>
        </Paper>
    );
};

export default Notifications;

