import React, { useState, useEffect } from 'react';
import PlayersHand from '../../components/PlayersHand';
import SnackBar from '../../components/SnackBar';
import Header from "../../components/Header/";
import Deck from "../../components/Deck";
import DiscardDeck from "../../components/DiscardDeck/index.jsx";
import RButton from "../../components/Button"
import {Box, ButtonGroup, Grid} from '@mui/material';

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
};

const Match = () => {
    const [hand, setHand] = useState([]);
    const [inTurn1, setTurn1] = useState(false);
    const [inTurn2, setTurn2] = useState(false);
    const [outOfTurn, setOutofTurn] = useState(false);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [body, setBody] = useState('');
    const [jugadores, setJugadores] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const match_name = localStorage.getItem('match_name');
    const player_name = localStorage.getItem('player_name');

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/${match_name}/${player_name}`);
        socket.onopen = () => {
            console.log("Conectado al socket de la partida");
        };

        const datafromback = {
            hand: ['lanzallama', 'lanzallama', 'lanzallama', 'lanzallama'],
        };
        setHand(datafromback.hand);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message_type === 'jugadores lobby') {
                // Seteo de partida inicial;
                setJugadores(data.message_content);
                setTurn1(true);
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

        if (inTurn1) {
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
            <div>
                {jugadores.map((jugador, index) => (
                    <li key={index}>{jugador}</li>
                ))}
            </div>

            <Grid container spacing={15} style={styles.bottom}>
                <Grid item styles={styles.center}>
                    <Deck onDrawCard={handleDrawCard} />
                    <DiscardDeck />
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                    <PlayersHand cartas={hand} onSelectCard={setSelectedCard} />
                </Grid>
                {inTurn1 && (
                    <ButtonGroup size="large">
                        <RButton text="Jugar carta" action={() => handleplayCard()} />
                        <RButton text="Descartar carta" />
                    </ButtonGroup>
                )}
            </Grid>
            <SnackBar open={open} handleClose={handleClose} severity={severity} body={body} />
        </Box>
    );
};

export default Match;
