import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import RButton from "../Button/index.jsx";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined.js";
import {useNavigate} from "react-router-dom";
import {getPartidas} from "../../utils/api.js";

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

    return (
        <div style={overlayStyles}>
            <Paper style={bannerStyles}>
                <Typography variant="h4" component="div">
                    ¡Fin de la partida!
                </Typography>
                <Typography>
                    {'Ganadores:' + winners.join(', ')}
                </Typography>
                <Typography>
                    {reason}
                </Typography>
                <RButton
                    text="Volver a inicio"
                    action={
                        () => {
                            navigate(`/mainpage/${player_name}`);
                        }
                    }
                />
            </Paper>
        </div>
    );
};

export default EndGameBanner;