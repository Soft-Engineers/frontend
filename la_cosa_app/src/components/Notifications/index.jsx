import React, {useEffect} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import {List} from '@mui/material';

const cardEffectListStyle = {
    width: '95%',
    height: '400px', // Set a fixed height
    overflow: 'auto',
    marginTop: '0.5rem',
    marginLeft: '0.1rem',
    border: '1px solid grey',
    borderRadius: '3%',

};

const Notifications = ({ messages }) => {
    const [messageList, setMessageList] = React.useState([]);

    useEffect(() => {
        setMessageList((prevMessages) => {
            return [...messages, ...prevMessages];
        });
    }, [messages]);

    const renderMessage = (message, index) => {
        const isInfected = message.includes('LA COSA TE HA INFECTADO!!');
        const messageStyle = {
            color: isInfected ? 'red' : 'black',
        };

        return (
            <ListItem key={index}>
                <ListItemText primary={message} style={messageStyle} />
            </ListItem>
        );
    };

    return (
        <Paper style={cardEffectListStyle}>
            <List>
                {messageList.map((message, index) => renderMessage(message, index))}
            </List>
        </Paper>
    );
};

export default Notifications;
