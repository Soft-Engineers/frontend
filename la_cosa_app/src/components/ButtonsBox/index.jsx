import React from 'react';
import Box from '@mui/material/Box';
import RButton from '../Button';
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
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
            }}
        >
            {state.isTurn ? (
                <>
                    <RButton text="Jugar carta" action={handleplayCard} />
                    <RButton text="Descartar carta" />
                </>
            ) : (
                <p>Esperando tu turno...</p>
            )}
        </Box>
    );
};

export default ActionBox;