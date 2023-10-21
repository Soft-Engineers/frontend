import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import RButton from '../Button/index.jsx';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined.js';
import { useNavigate } from 'react-router-dom';
import { getPartidas } from '../../utils/api.js';

const EndGameBanner = ({ winners, reason }) => {
    const navigate = useNavigate();
    const player_name = sessionStorage.getItem('player_name');

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

    const listStyles = {
        fontSize: '1.2rem', // Adjust the font size as needed
        margin: '0',
        padding: '0',
    };

    return (
        <div style={overlayStyles}>
            <Paper style={bannerStyles}>
                <Typography variant="h2" component="div">
                    ¡Fin de la partida!
                </Typography>
                {winners.length > 0 ? (
                    <div style={{marginTop: '1rem', display: 'flex' }}>
                        <Typography variant="h6" >Ganadores:</Typography>
                        <ul>
                            {winners.map((winner, index) => (
                                <li style={listStyles} key={index}>{winner}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
                <Typography variant="h6" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    {reason}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                    <RButton
                        text="Volver a inicio"
                        action={() => {
                            navigate(`/mainpage/${player_name}`);
                        }}
                    />
                </div>
            </Paper>
        </div>
    );
};

export default EndGameBanner;