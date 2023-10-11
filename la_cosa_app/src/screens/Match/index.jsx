import React, { useState, useEffect } from 'react';
import PlayersHand from '../../components/PlayersHand';
import PlayerList from "../../components/PlayersList";
import SnackBar from '../../components/SnackBar';
import Header from "../../components/Header/";
import Deck from "../../components/Deck";
import DiscardDeck from "../../components/DiscardDeck/index.jsx";
import RButton from "../../components/Button"
import { Box, Grid } from '@mui/material';
import Container from "@mui/material/Container";

const styles = {
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    center: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bottom: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
};

const Match = () => {
    const [hand, setHand] = useState([]);
    const [gameState, setGameState] = useState('');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [body, setBody] = useState('');
    const [jugadores, setJugadores] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const match_name = sessionStorage.getItem('match_name');
    const player_name = sessionStorage.getItem('player_name');

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/${match_name}/${player_name}`);
        socket.onopen = () => {
            console.log("Conectado al socket de la partida");
        };

        const datafromback = {
            hand: ['lanzallama', 'lanzallama', 'lanzallama', 'lanzallama'],
            state: 'InTurn'
        };
        setHand(datafromback.hand);
        setGameState(datafromback.state);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message_type === 1) {
                // Seteo de partida inicial;
                setJugadores(data.message_content);
            } else if (data.message_type === 3) {
                console.log(data.message_content);
            }
        };
        // Otros event handlers

        socket.onclose = () => {
            console.log("Desconectado del socket de la partida");
        };

        return () => {
            socket.close();
        };
    }, [match_name]);

    const mockDrawCard = async () => {
        return {
            status: 200,
            data: {
               nombre: 'lanzallama',
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
            const response = await mockDrawCard();
            if (response.status === 200) {
                const { nombre } = response.data;
                setHand([...hand, nombre]);
            }
        } catch (err) {
            setSeverity('error');
            setBody(err.response.data.detail);
            setOpen(true);
        }
    };

    const handleplayCard = () => {
        if (selectedCard !== null) {
            console.log(selectedCard);
            setSelectedCard(null);
        } else {
        setSeverity('error');
        setBody('Please select a card to play.');
        setOpen(true);
    }
    };

    return (
        <Box style={styles.root}>
            <Header />
            <Grid container spacing={1} style={styles.center}>
                <div>
                    {jugadores.map((jugador, index) => (
                       <li key={index}>{jugador}</li>
                    ))}
                </div>
                <Deck onDrawCard={handleDrawCard} />
                <DiscardDeck />
            </Grid>
            <Grid container spacing={1} style={styles.bottom}>
                <Grid item xs={12} sm={6} md={5}>
                    <PlayersHand cartas={hand} onSelectCard={setSelectedCard} />
                </Grid>
                {(gameState === 'InTurn') && (
                    <Box style={styles.buttons}>
                        <RButton text="Jugar carta" action={() => handleplayCard()} />
                        <RButton text="Descartar carta" />
                    </Box>
                )}
            </Grid>
            <SnackBar open={open} handleClose={handleClose} severity={severity} body={body} />
        </Box>
    );
};

export default Match;
