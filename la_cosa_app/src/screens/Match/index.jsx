import React, { useState, useEffect } from 'react';
import PlayersHand from '../../components/PlayersHand';
import SnackBar from '../../components/SnackBar';
import Header from "../../components/Header/";
import Deck from "../../components/Deck";
import DiscardDeck from "../../components/DiscardDeck/index.jsx";
import RButton from "../../components/Button"
import {Box, ButtonGroup, Grid} from '@mui/material';
import {useParams} from "react-router-dom";

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
    const [deadPlayer, setDeadPlayer] = useState(false);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [body, setBody] = useState('');
    const [jugadores, setJugadores] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const {match_name} = useParams();
    const player_name = sessionStorage.getItem('player_name');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const matchSocket = new WebSocket(`ws://localhost:8000/ws/${match_name}/${player_name}`);
        matchSocket.onopen = () => {
            console.log("Conectado al socket de la partida");
        };



        matchSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message_type === 'error') {
                setSeverity('error');
                setBody(data.message_content);
                setOpen(true);
            }
            if (data.message_type === 'jugadores lobby') {
                setJugadores(data.message_content);
            }
            if (data.message_type === 'estado inicial') {
                setHand(data.message_content.hand);
                if (data.message_content.turno_actual === player_name) {
                    setTurn1(true);
                }
                else{
                    setOutofTurn(true);
                }
            }
            if (data.message_type === 'carta robada') {
                console.log(hand);
                console.log(data.message_content);
                setHand([...hand, data.message_content]);
            }
            if (data.message_type === 'datos jugada') {
                if (data.message_content.turn === player_name) {
                    setTurn1(true);
                }
                else{
                    setOutofTurn(true);
                }
                if (data.message_content.dead_player_name === player_name){
                    setDeadPlayer(true);
                }
                const updatedHand = hand.filter(card => card.card_id !== selectedCard.card_id);
                setHand(updatedHand);
            }
            if (data.message_type === 'notificacion') {
                //TODO: Mensaje en componente "jugadas"
            }
            if (data.message_type === 'partida finalizada') {
                //TODO: Mensaje en componente "partida finalizada"
            }

        };

        matchSocket.onclose = () => {
            console.log("Desconectado del socket de la partida");
        };

        setSocket(matchSocket);

        return () => {
            matchSocket.close();
        };
    }, [match_name]);


    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleDrawCard = async () => {
        const request = { message_type: 'robar carta' , message_content: ''};
        socket.send(JSON.stringify(request));
    };

    const handleplayCard = () => {
        if (selectedCard !== null) {
            console.log({
                card_name: selectedCard.card_name,
                card_id: selectedCard.card_id,
                target: ''
            });
            const request = {
                message_type: 'jugar carta',
                message_content: {
                    card_name: selectedCard.card_name,
                    card_id: selectedCard.card_id,
                    target: '' //TODO elegir target_id tampoco se donde poner que esta fuera de turno
                },
            };
            socket.send(JSON.stringify(request));
        } else {
        setSeverity('error');
        setBody('Elige una carta para jugar.');
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
            {!deadPlayer &&
            <Grid container spacing={15} style={styles.bottom}>
                <Grid item styles={styles.center}>
                    <Deck onDrawCard={handleDrawCard} />
                    <DiscardDeck />
                </Grid>
                <Grid item xs={12} sm={6} md={5}>
                    <PlayersHand cartas={hand} onSelectCard={setSelectedCard} />
                </Grid>
                {inTurn1 &&
                    <ButtonGroup size="large">
                        <RButton text="Jugar carta" action={() => handleplayCard()} />
                        <RButton text="Descartar carta" />
                    </ButtonGroup>
                }
            </Grid>
            }
            {deadPlayer &&  <h1>Te han matado...</h1>}
            <SnackBar open={open} handleClose={handleClose} severity={severity} body={body} />
        </Box>
    );
};

export default Match;
