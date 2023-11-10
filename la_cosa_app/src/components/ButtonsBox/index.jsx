import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useMatchC, turnStates } from '../../screens/Match/matchContext.jsx';
import ConfirmWindow from "../ConfirmWindow/index.jsx";

const ButtonsBox = () => {
    const { state, actions } = useMatchC();
    const [isConfirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        if (state.defenseTimeoutEnded && state.isTurn) {
            handleSkip();
            actions.setDefenseTimeoutEnded(false);
        }
    }, [state.defenseTimeoutEnded]);

    const handleDiscardCard = () => {
        if (state.selectedCard !== null) {
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
            let card_target = null;
            if (state.selectedCard.card_name === 'Hacha') {
                card_target = state.targetDoor;
            } else {
                card_target = state.target_name;
            }

            const request = {
                message_type: 'jugar carta',
                message_content: {
                    card_name: state.selectedCard.card_name,
                    card_id: state.selectedCard.card_id,
                    target: card_target
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

    const handleShowHand = () => {
        const request = {
            message_type: 'revelaciones',
            message_content: {
                'decision': 'revelar mano',
            },
        };
        state.socket.send(JSON.stringify(request));
    };

    const handleShowInfectedCard = () => {
        const request = {
            message_type: 'revelaciones',
            message_content: {
                'decision': 'revelar carta',
            },
        };
        state.socket.send(JSON.stringify(request));
    };

    const handleSkipRevelaciones = () => {
        const request = {
            message_type: 'revelaciones',
            message_content: {
                'decision': 'omitir revelaciones',
            },
        };
        state.socket.send(JSON.stringify(request));
    };

    const hasInfectedCard = (hand) => {
        for (let i = 0; i < hand.length; i++) {
            if (hand[i].card_name === '¡Infectado!') {
                return true;
            }
        }
    };

    const styles = {
        box: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            textAlign: 'center',
            border: '1px solid grey',
            borderRadius: '10px',
            marginLeft: '1rem',
            fontSize: '18px',
            minWidth: '40%',
            maxWidth: '40%',
            flex: '1',
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
                        <p>Antes de jugar tenés que robar una carta del mazo.</p>
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
                    {(state.turnState === turnStates.REVELACIONES) && (
                        <>
                            {hasInfectedCard(state.hand) && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleShowInfectedCard}
                                    sx={styles.button}
                                >
                                    Revelar carta ¡Infectado!
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleShowHand}
                                sx={styles.button}
                            >
                                Revelar mano
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSkipRevelaciones}
                                sx={styles.button}
                            >
                                Pasar
                            </Button>
                        </>)
                    }
                    {state.turnState === turnStates.DISCARD && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleDiscardCard}
                            sx={styles.button}
                        >
                            Descartar carta
                        </Button>
                    )}
                </>
            )}
            {state.turnState === turnStates.VUELTA_Y_VUELTA && state.alreadySelected ? (
                <p>Esperando a los demás jugadores...</p>
            ) : (
                state.turnState === turnStates.VUELTA_Y_VUELTA && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleExchange}
                        sx={styles.button}
                    >
                        Intercambiar
                    </Button>
                )
            )
            }
            {!state.isTurn && (
                <>
                    {state.turnState === turnStates.WAIT_EXCHANGE ? (
                        <p>Esperando intercambio....</p>
                    ) : state.turnState === turnStates.WAIT_DEFENSE ? (
                        <p>Esperando defensa...</p>
                    ) : state.turnState === turnStates.VUELTA_Y_VUELTA ? null : (
                        <p>Esperando turno...</p>
                    )}
                </>
            )}
        </Box>
    );
};

export default ButtonsBox;
