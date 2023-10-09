import React, { useState, useEffect } from 'react';
import Carta from '../../components/Carta';
import PlayersHand from '../../components/PlayersHand';
import { drawCard } from '../../utils/api.js';
import SnackBar from '../../components/SnackBar';
import Header from "../../components/Header/";
import Deck from "../../components/Deck";
import RButton from "../../components/Button"
import { Box, Grid } from '@mui/material';


const styles = {
    root: {
        minHeight: '100vh',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    bottom: {
        marginTop: '1rem', // Adjust the margin to control the spacing between elements
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttons: {
        marginTop: '1rem', // Adjust the margin to control the spacing between elements
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
};

const Partida_iniciada = () => {
    const [hand, setHand] = useState([]);
    const [gameState, setGameState] = useState('');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [body, setBody] = useState('');
    // Websockets (Segundo Sprint)

    useEffect(() => {

        // test data del back
        const datafromback = {
            hand: [1, 1, 1, 1],
            state: 'InTurn'
        }
        setHand(datafromback.hand);
        setGameState(datafromback.state);

        const webSocket = new WebSocket('ws://your-websocket-url');

        webSocket.onopen = () => {
            webSocket.send(JSON.stringify({ action: 'get_game_state', player_name: 'player_name' }));
        };

        webSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'initial_hand') {
                setHand(data.hand);
            } else if (data.type === 'game_state') {
                setGameState(data.state);
            }
        };
        webSocket.onclose = () => {
        };

        return () => {
            webSocket.close();
        };
    }, []);


    const mockDrawCard = async () => {
        return {
            status: 200,
            data: {
                card_id: 1,
            },
        };
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleDrawCard = async () => {

        if (hand.length >= 5) {
            setSeverity('error');
            setBody('You can only draw one card per turn.');
            setOpen(true);
            return;
        }

        if (gameState !== 'InTurn') {
            setSeverity('error');
            setBody('You can only draw a card in your turn.');
            setOpen(true);
            return;
        }

        try {
            const response = await mockDrawCard(); // Replace 'your_player_name' with the actual player name or identifier

            if (response.status === 200) {
                const { card_id } = response.data;
                setHand([...hand, card_id]);
            }
        } catch (err) {
            setSeverity('error');
            setBody(err.response.data.detail);
            setOpen(true);
        }
    };
    return (
        <Box>
            <Header />
            <Grid container spacing={1} sx={styles.center}>
                <Grid item xs={12} sm={6} md={5} sx={styles.bottom}>
                    <Deck onDrawCard={handleDrawCard} />
                </Grid>
                <Grid item xs={12} sm={6} md={5} sx={styles.bottom}>
                    <PlayersHand cartas={hand} />
                </Grid>
            </Grid>
            {(gameState === 'InTurn') && (
                <Grid container spacing={1} sx={styles.buttons}>
                    <Grid item xs={12} sm={6} md={5} sx={styles.bottom}>
                        <RButton text="Jugar carta" />
                        <RButton text="Intercambiar carta" />
                        <RButton text="Descartar carta" />
                    </Grid>
                </Grid>
            )}
            <SnackBar open={open} handleClose={handleClose} severity={severity} body={body} />
        </Box>
    );
};

export default Partida_iniciada;
