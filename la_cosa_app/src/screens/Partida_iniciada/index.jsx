import React, { useState, useEffect } from 'react';
import Carta from '../../components/Carta';
import PlayersHand from '../../components/PlayersHand/index.jsx';
import { drawCard } from '../../utils/api.js';
import SnackBar from '../../components/SnackBar/index.jsx';
import Header from "../../components/Header/index.jsx";
import { Box, Grid } from '@mui/material';


const styles = {
    root: {
        minHeight: '100vh',
        height: 'auto',
    },
    right: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    bottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
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
        const datadelback = {
            hand: [1, 1, 1, 1],
            state: 'Turn_1'
        }
        setHand(datadelback.hand);
        setGameState(datadelback.state);

        const webSocket = new WebSocket('ws://your-websocket-url');

        webSocket.onopen = () => {
            webSocket.send(JSON.stringify({ action: 'get_game_state', player_name: 'your_player_name' }));
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


    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const mockDrawCard = async () => {
        // Simulate a delay (e.g., API request) for demonstration purposes
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Return a mock response with card ID "1"
        return {
            status: 200,
            data: {
                card_id: 1,
            },
        };
    };

    const handleDrawCard = async () => {
        try {
            const response = await mockDrawCard(); // Replace 'your_player_name' with the actual player name or identifier

            if (response.status === 200) {
                const { card_id } = response.data;
                setHand([...hand, card_id]);
                setSeverity('success');
                setBody('You drew a card.');
                setOpen(true);
            }
        } catch (err) {
            setSeverity('error');
            setBody(err.response.data.detail);
            setOpen(true);
        }
    };


    let gameContent;
    if (gameState === 'Turn_1') {
        gameContent = (
            <Grid container spacing={1} sx={styles.root}>
                <Grid item xs={12} sm={6} md={5} sx={styles.bottom}>
                    <PlayersHand cartas={hand} />
                </Grid>
                <Grid item xs={12} sm={6} md={5} sx={styles.bottom}>
                    <button onClick={handleDrawCard}>Draw Card</button>
                </Grid>
            </Grid>
        );
    } else if (gameState === 'OutOfTurn') {
        gameContent = (
            <>
            </>
        );
    }

    return (
        <Box sx={styles.root}>
            <Header/>
            {gameContent}
            <SnackBar open={open} handleClose={handleClose} severity={severity} body={body} />
        </Box>
    );
};

export default Partida_iniciada;
