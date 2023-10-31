import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import Carta from '../Carta';
import LinearProgress from '@mui/material/LinearProgress';
import { useMatchC } from '../../screens/Match/matchContext';

const ShowHandBanner = () => {
    const {state, actions} = useMatchC();
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
            actions.setReveal(false);
        };
    }, []);


    const bannerStyles = {
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
    };

    const overlayStyles = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: '999',
    };

    return (
        <div>
            {mostrarMensaje && (
                <div style={overlayStyles}>

                    <Paper style={bannerStyles}>
                        <Typography variant="h5" component="div" style={{borderBottom: '2px solid black'}}>
                            Efecto {trigger_card}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{marginTop: '10px'}}>
                            {`Esta es ${trigger_card === 'Whisky' ? 'la mano' : 'una carta'} de ${player}`}
                        </Typography>

                        <Stack direction="row" sx={{justifyContent:'center', marginTop: '10px'}}>
                            {hand.map((carta, index) => (
                                <div key={index} style={{width:'60%'}}>
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