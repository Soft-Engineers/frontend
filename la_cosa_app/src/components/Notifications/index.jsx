import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import { List } from '@mui/material';
const cardEffectListStyle = {
    width: '400px',
    overflowY: 'auto'
};

//{  }
const Notifications = ({ messages }) => {
    return (
        <Paper style={cardEffectListStyle}>
            <List>

                {messages.map((message, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={message} />
                    </ListItem>
                ))}

            </List>
        </Paper>
    );
}

export default Notifications;