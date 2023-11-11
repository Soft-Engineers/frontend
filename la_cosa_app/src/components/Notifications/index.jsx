import React, { useEffect, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { List } from '@mui/material';
import { useMatchC, turnStates } from '../../screens/Match/matchContext.jsx';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import ExpandLessSharpIcon from '@mui/icons-material/ExpandLessSharp';
import IconButton from "@mui/material/IconButton";

const BoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    overflow: 'hidden',
    marginLeft: '20px',
    marginBottom: '16.1px',
    border: '1px solid grey',
    borderRadius: '10px',
};

const buttonStyle = {
    position: 'absolute',
    top: '40px',
    right: '15px',
};

const Notifications = () => {
    const { state , actions} = useMatchC();
    const [notificationsList, setNotificationsList] = useState([]);
    const [minimized, setMinimized] = useState(false);

    useEffect(() => {
        setNotificationsList((prevNotifications) => {
            return [...state.notifications, ...prevNotifications];
        });
    }, [state.notifications]);

    useEffect(() => {
        //if turnstates changes to VUELTA_Y_VUELTA, set state.waitMessage to 'Esperando que se termine el efecto vuelta y vuelta'
        // if turnstates changes to REVELACIONES, set state.WaitMessage to 'Esperando el efecto revelaciones'
        if (state.turnState === turnStates.VUELTA_Y_VUELTA) {
            actions.setWaitMessage('Esperando el efecto "Vuelta y vuelta"');
        }
        if (state.turnState === turnStates.REVELACIONES) {
            actions.setWaitMessage('Esperando el efecto "Revelaciones"');
        }
    }, [state.turnState]);


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
        <Box style={BoxStyle}>
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
                            : state.turnState === turnStates.VUELTA_Y_VUELTA
                            ? 'Esperando que el efecto "Vuelta y vuelta"'
                            : state.turnState === turnStates.REVELACIONES
                            ? 'Esperando el efecto "Revelaciones"'
                            : state.turnState === turnStates.DISCARD
                            ? 'Tenés que descartar'
                            : null }

                    </Typography>
                )}
                {!state.isTurn && (
                    <Typography variant="h6" style={{ color: '#3968B1', marginTop: '12px' }}>
                        {(state.turnState === turnStates.WAIT_EXCHANGE || state.turnState === turnStates.WAIT_DEFENSE
                        || state.turnState === turnStates.VUELTA_Y_VUELTA || state.turnState === turnStates.REVELACIONES) && state.waitMessage !== ''
                            ? state.waitMessage
                            : state.turnState === turnStates.WAIT_EXCHANGE
                            ? 'Esperando intercambio'
                            : state.turnState === turnStates.WAIT_DEFENSE
                            ? 'Esperando defensa'
                            : state.turnState === turnStates.VUELTA_Y_VUELTA
                            ? 'Esperando que el efecto "Vuelta y vuelta"'
                            : state.turnState === turnStates.REVELACIONES
                            ? 'Esperando el efecto "Revelaciones"'
                            : state.turnState === turnStates.DISCARD
                            ? 'Esperando que' + state.currentTurn + ' descarte'
                            : 'Esperando tu turno...'}
                    </Typography>
                )}
            </ListItem>
            <IconButton variant="sharp" onClick={toggleMinimized} style={buttonStyle}>
                {minimized ? <ExpandMoreSharpIcon /> : <ExpandLessSharpIcon />}
            </IconButton>
            {!minimized && (notificationsList.length !== 0) && (
                <div style={{ maxHeight: '100%', overflowY: 'auto', display: minimized ? 'none' : 'block', resize: 'vertical', scrollbarColor: 'gray white'}}>
                <List>
                    {notificationsList.map((notification, index) => renderNotification(notification, index))}
                </List>
            </div>)}
        </Box>
    );
};

export default Notifications;
