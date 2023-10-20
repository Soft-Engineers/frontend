import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useMatchC } from '../../screens/Match/matchContext.jsx';

const ActionBox = () => {
    const { state, actions } = useMatchC();

    const handleplayCard = () => {
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
            console.log('target_name es:', state.target_name);
            state.socket.send(JSON.stringify(request));
        } else {
            actions.setSeverity('error');
            actions.setBody('Elige una carta para jugar.');
            actions.setOpen(true);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                border: '1px solid black',
                borderRadius: '3%',
                backgroundColor : '#f2f2ff',
            }}
        >
            {state.isTurn ? (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleplayCard}
                        sx={{
                            backgroundColor: '#515952',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#2a2e2b',
                            },
                        }}
                    >
                        Jugar carta
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            backgroundColor: '#515952',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#2a2e2b',
                            },
                        }}
                    >
                        Descartar carta
                    </Button>
                </>
            ) : (
                <p>Esperando tu turno...</p>
            )}
        </Box>
    );
};

export default ActionBox;
