import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

import { List } from '@mui/material';
const cardEffectListStyle = {
    width: '400px',
    maxHeight: '200px',
    overflowY: 'auto'
};

//{  }
export default function CardEffectList({ messages }) {
    return (
        <Paper style={cardEffectListStyle}>
            <List
                height={400}
                width={360}
                itemSize={46}
                itemCount={200}
                overscanCount={5}
            >

                {messages.map((message, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={message} />
                    </ListItem>
                ))}

            </List>
        </Paper>
    );
}