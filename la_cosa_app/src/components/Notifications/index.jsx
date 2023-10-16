import React from 'react';
import {useEffect} from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { List } from '@mui/material';

const cardEffectListStyle = {
    width: '100%',
    height: '100%',
    overflowY: 'auto'
};

const Notifications = ({ messages }) => {
    const [messageList, setMessageList] = React.useState([]);

    useEffect(() => {
        setMessageList((prevMessages) => [...prevMessages, ...messages]);
    }, [messages]);

    return (
        <Paper style={cardEffectListStyle}>
            <List>
                {messageList.map((message, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={message} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default Notifications;