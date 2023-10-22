import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useMatchC, turnStates } from '../../screens/Match/matchContext.jsx';
import LinearProgress from "@mui/material/LinearProgress";

const ButtonsBox = () => {
    const { state, actions } = useMatchC();

    useEffect(() => {
        if (state.DtimeoutEnded) {
            handleSkip();
            actions.setDTimeoutEnded(false);
        }
    }, [state.DtimeoutEnded]);

    const handlePlayCard = () => {
        if (state.selectedCard !== null) {
            console.log({
                hand: state.hand,
            });
            const request = {
                message_type: 'jugar carta',
                message_content: {
                    card_name: state.selectedCard.card_name,
                    card_id: state.selectedCard.card_id,
                    target: state.target_name
                },
            };
            state.socket.send(JSON.stringify(request));
        } else {
            actions.setSeverity('error');
            actions.setBody('Elige una carta para jugar.');
            actions.setOpen(true);
        }
    };

    const handleExchange = () => {
        if (state.selectedCard !== null) {
            const request = {
                message_type: 'intercambiar carta',
                message_content: {
                    card_id: state.selectedCard.card_id,
                },
            };
            state.socket.send(JSON.stringify(request));
        } else {
            actions.setSeverity('error');
            actions.setBody('Elige una carta para intercambiar.');
            actions.setOpen(true);
        }
    };
    const handleSkip = () => {
        const request = {
            message_type: 'omitir defensa',
            message_content: {},
        };
        state.socket.send(JSON.stringify(request));
    };

    const styles = {
        box: {
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            border: '1px solid grey',
            borderRadius: '3%',
            marginLeft : '1rem',
            backgroundColor: '#f2f2ff',
            fontSize: '15px',
        },
        button : {
            backgroundColor: '#515952',
            color: 'white',
            '&:hover': {
            backgroundColor: '#2a2e2b'
            },
            },
    };

    return (
        <Box sx={styles.box}>
            {state.isTurn && (
                <>
                    {state.turnState === turnStates.DRAW_CARD && (
                        <p>Antes de jugar debes robar una carta del mazo.</p>
                    )}
                    {state.turnState === turnStates.PLAY_TURN && (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handlePlayCard}
                                sx={styles.button}
                            >
                                Jugar carta
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={styles.button}
                            >
                                Descartar carta
                            </Button>
                        </>
                    )}
                    {(state.turnState === turnStates.EXCHANGE || state.turnState === turnStates.WAIT_EXCHANGE) && (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleExchange}
                                sx={styles.button}
                            >
                                Intercambiar Carta
                            </Button>
                        </>
                    )}
                    {state.turnState === turnStates.WAIT_DEFENSE && (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handlePlayCard}
                                sx={styles.button}
                            >
                                Jugar carta
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleSkip}
                                sx={styles.button}
                            >
                                Pasar
                            </Button>
                        </>
                    )}
                </>
            )}
            {!state.isTurn && (
                <>
                    {state.turnState === turnStates.WAIT_EXCHANGE ? (
                        <p>Esperando intercambio....</p>
                    ) : state.turnState === turnStates.WAIT_DEFENSE ? (
                        <p>Esperando defensa...</p>
                    ) : (
                        <p>Esperando turno...</p>
                    )}
                </>
            )}
        </Box>
    );
};

export default ButtonsBox;
