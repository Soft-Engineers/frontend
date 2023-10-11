import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const EndGameBanner = ({ winners }) => {
    const bannerStyles = {
        position: 'absolute',
        top: '50%',
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
    };

    return (
        <div style={overlayStyles}>
            <Paper style={bannerStyles}>
                <Typography variant="h4" component="div">
                    ¡Fin de la partida!
                </Typography>
                <Typography>
                    Ganadores: {winners.join(', ')}
                </Typography>
            </Paper>
        </div>
    );
};

export default EndGameBanner;