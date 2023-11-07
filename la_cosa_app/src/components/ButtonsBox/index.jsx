import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useMatchC, turnStates } from '../../screens/Match/matchContext.jsx';
import ConfirmWindow from "../ConfirmWindow/index.jsx";

const ButtonsBox = () => {
    const { state, actions } = useMatchC();
    const [isConfirmOpen, setConfirmOpen] = useState(false);

    console.log(state.role);
    useEffect(() => {
        if (state.defenseTimeoutEnded && state.isTurn) {
            handleSkip();
            actions.setDefenseTimeoutEnded(false);
        }
    }, [state.defenseTimeoutEnded]);

    const handleDiscardCard = () => {
        if (state.selectedCard !== null) {
            console.log({
                hand: state.hand,
            });
            const request = {
                message_type: 'descartar carta',
                message_content: {
                    card_id: state.selectedCard.card_id,
                },
            };
            state.socket.send(JSON.stringify(request));
        } else {
            actions.setSeverity('error');
            actions.setBody('Elige una carta para descartar.');
            actions.setOpen(true);
        }
    };
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
                    target: state.target_name,
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

    const handleLaCosabutton = () => {
        setConfirmOpen(false);
        const request = {
            message_type: 'declaración',
            message_content: {},
        };
        state.socket.send(JSON.stringify(request));
    };

    const styles = {
        box: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid grey',
            borderRadius: '30px',
            marginLeft: '1rem',
            fontSize: '18px',
            width: '100%',
        },
        button: {
            backgroundColor: '#515952',
            color: 'white',
            '&:hover': {
                backgroundColor: '#2a2e2b',
            },
        },
        confirmButton: {
            backgroundColor: 'red',
            color: 'white',
            '&:hover': {
                backgroundColor: 'darkred',
            },
        },
        panicButton: {
            backgroundColor: '#973F67',
            color: 'white',
            '&:hover': {
                backgroundColor: '#5D2E39',
            },
        },
        defenseButton: {
            backgroundColor: '#3968B1',
            color: 'white',
            '&:hover': {
                backgroundColor: '#393FA1',
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
                                onClick={handleDiscardCard}
                                sx={styles.button}
                            >
                                Descartar carta
                            </Button>
                            {state.role === 'LA_COSA' && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setConfirmOpen(true)}
                                    sx={styles.confirmButton}
                                >
                                    ¡No quedan más humanos!
                                </Button>
                            )}
                            <ConfirmWindow
                                open={isConfirmOpen}
                                onClose={() => setConfirmOpen(false)}
                                onConfirm={handleLaCosabutton}
                            />
                        </>
                    )}

                    {state.turnState === turnStates.EXCHANGE && (

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleExchange}
                            sx={styles.button}
                        >
                            Intercambiar
                        </Button>)

                    }
                    {state.turnState === turnStates.WAIT_EXCHANGE && (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleExchange}
                                sx={styles.button}
                            >
                                Intercambiar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handlePlayCard}
                                sx={styles.defenseButton}
                            >
                                Jugar carta
                            </Button>
                        </>)
                    }
                    {state.turnState === turnStates.WAIT_DEFENSE && (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handlePlayCard}
                                sx={styles.defenseButton}
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
                        </>)
                    }
                    {(state.turnState === turnStates.PANIC) && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePlayCard}
                            sx={styles.panicButton}
                        >
                            Jugar Carta
                        </Button>
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
