import React, { useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { List } from '@mui/material';

const cardEffectListStyle = {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    marginTop: '0.1rem',
};

const Notifications = ({ messages }) => {
    const [messageList, setMessageList] = React.useState([]);

    useEffect(() => {
        setMessageList((prevMessages) => {
            const newMessages = [...messages, ...prevMessages];
            return newMessages;
        });
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
};

export default Notifications;
