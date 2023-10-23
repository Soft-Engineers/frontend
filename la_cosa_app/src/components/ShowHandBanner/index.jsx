import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import Carta from '../Carta';
import LinearProgress from '@mui/material/LinearProgress';
import { useMatchC } from '../../screens/Match/matchContext';

const ShowHandBanner = () => {
    const {state} = useMatchC();
    const hand = state.revealCard.cards;
    const player = state.revealCard.cards_owner;
    const trigger_card = state.revealCard.trigger_card;

    const time = 10000;
    const [mostrarMensaje, setMostrarMensaje] = useState(true);
    const [tiempoRestante, setTiempoRestante] = useState(time);// 20000 milisegundos (10 segundos)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTiempoRestante(prevTiempo => {
                if (prevTiempo <= 0) {
                    setMostrarMensaje(false);
                    clearInterval(intervalId);
                    return 0;
                }

                return prevTiempo - 100;
            });
        }, 100); // Actualizar cada 100 milisegundos (0.1 segundos)

        return () => {
            clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
            //actions.setReveal(false);
        };
    }, []);


    const bannerStyles = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    };

    const overlayStyles = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: '999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    };

    return (
        <div>
            {mostrarMensaje && (
                <div style={overlayStyles}>

                    <Paper style={bannerStyles}>
                        <Typography variant="h5" component="div">
                            Efecto {trigger_card}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Esta es la mano de {player}
                        </Typography>

                        <Stack direction="row" spacing={0.2}>
                            {hand.map((carta, index) => (
                                <div key={index} >
                                    <Carta nombre={carta} />
                                </div>
                            ))}
                        </Stack>
                        <Box sx={{ marginTop: '10px' }} >
                            <LinearProgress variant="determinate" value={((tiempoRestante) / time) * 100} sx={{ height: 10 }} />
                        </Box>
                    </Paper>

                </div>
            )}
        </div>
    );
};

export default ShowHandBanner;