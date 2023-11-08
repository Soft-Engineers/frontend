import React, { useEffect, useRef, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { List } from '@mui/material';
import { useMatchC, turnStates } from '../../screens/Match/matchContext.jsx';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import OpenInFullSharpIcon from '@mui/icons-material/OpenInFullSharp';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import IconButton from "@mui/material/IconButton";

const BoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    overflow: 'hidden', // Use 'hidden' to hide content when minimized
    marginLeft: '20px',
    marginBottom: '16.1px',
    border: '1px solid grey',
    borderRadius: '10px',
};

const buttonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
};

const Notifications = () => {
    const { state } = useMatchC();
    const scrollRef = useRef(null);

    const [notificationsList, setNotificationsList] = useState([]);
    const [minimized, setMinimized] = useState(false);

    useEffect(() => {
        setNotificationsList((prevNotifications) => {
            return [...prevNotifications, ...state.notifications];
        });
    }, [state.notifications]);

    useEffect(() => {
        if (scrollRef.current) {
            const notificationBody = scrollRef.current;
            notificationBody.scrollTop = notificationBody.scrollHeight - notificationBody.clientHeight;
        }
    }, [notificationsList]);

    const renderNotification = (notification, index) => {
        const isInfected = notification.includes('LA COSA TE INFECTÓ!!');
        const notificationStyle = {
            color: isInfected ? 'red' : 'black',
        };

        return (
            <ListItem key={index} style={{ borderTop: index === 0 ? 'none' : '1px dashed black' }}>
                <ListItemText primary={notification} style={notificationStyle} />
            </ListItem>
        );
    };

    const toggleMinimized = () => {
        setMinimized(!minimized);
    };

    return (
        <Box style={{ ...BoxStyle, height: minimized ? '16%' : '100%' }}>
            <ListItem sx={{ flexDirection: 'column', alignItems: 'center', borderBottom: '0.1px solid grey' }}>
                <ListItemText primary={
                    <Typography variant="h5" style={{ color: 'green' }}>
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
                                            : null }

                    </Typography>
                )}
                {!state.isTurn && (
                    <Typography variant="h6" style={{ color: '#3968B1', marginTop: '12px' }}>
                        {state.turnState === turnStates.WAIT_EXCHANGE || state.turnState === turnStates.WAIT_DEFENSE
                            ? state.waitMessage
                            : 'Esperando tu turno...'}

                    </Typography>
                )}
            </ListItem>
            <IconButton variant="sharp" onClick={toggleMinimized} style={buttonStyle}>
                {minimized ? <OpenInFullSharpIcon /> : <CloseFullscreenIcon />}
            </IconButton>
            <div style={{ maxHeight: '100%', overflowY: 'auto', display: minimized ? 'none' : 'block' }} ref={scrollRef}>
                <List>
                    {notificationsList.map((notification, index) => renderNotification(notification, index))}
                </List>
            </div>
        </Box>
    );
};

export default Notifications;
