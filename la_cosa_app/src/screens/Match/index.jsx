import { useMatchC } from './matchContext';
import { useParams } from "react-router-dom";
import { Grid, Box } from '@mui/material';
import { useEffect } from 'react';
import SnackBar from '../../components/SnackBar';
import PlayersHand from "../../components/PlayersHand/";
import RButton from '../../components/Button/'

import EndGameBanner from "../../components/EndGameBanner";
import Notifications from "../../components/Notifications";
import PlayerRound from "../../components/PlayerRound/index";

const Match = () => {
  // States
  const { state, actions } = useMatchC();


  const { match_name } = useParams();
  const player_name = sessionStorage.getItem('player_name');

  useEffect(() => {
    const matchSocket = new WebSocket(`ws://localhost:8000/ws/${match_name}/${player_name}`);
    matchSocket.onopen = () => {
      console.log("Conectado al socket de la partida");
    };

    matchSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.message_type) {
        case "posiciones":
          console.log('content de posiciones:', data.message_content);
          actions.setJugadores(data.message_content);
          break;
        case 'estado inicial':
          actions.setHand(data.message_content.hand);
          if (data.message_content.current_turn === player_name) {
            actions.setIsTurn(true);
          } else {
            actions.setIsTurn(false);
          }
          break;
        case 'datos jugada':
          if (data.message_content.turn === player_name) {
            actions.setIsTurn(true);
          } else {
            actions.setIsTurn(false);
          }
          if (data.message_content.dead_player_name === player_name) {
            actions.setDeadPlayer(true);
          }
          break;
        case 'notificación muerte':
        case 'notificación jugada':
        case 'notificación turno':
          actions.setAvisos([...state.avisos, data.message_content]);
          break;
        case 'partida finalizada':
          actions.setWinners(data.message_content.winners);
          actions.setReason(data.message_content.reason);
          actions.setEndGame(true);
          break;
        case "cards":
          console.log(data.message_content);
          actions.setHand(data.message_content);
          break;
        case 'error':
          actions.setSeverity('error');
          actions.setBody(data.message_content);
          actions.setOpen(true);
          break;
        default:
          // Manejar otros tipos de mensajes si es necesario
          break;
      };
    };
    matchSocket.onclose = () => {
      console.log("Desconectado del socket de la partida");
    };

    // Set the socket state
    actions.setSocket(matchSocket);

    return () => {
      matchSocket.close();
    };
  }, [match_name]);


  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    actions.setOpen(false);
  };


  const handleplayCard = () => {
    if (state.selectedCard !== null) {
      console.log({
        hand: state.hand,
      });
      const request = {
        message_type: 'jugar carta',
        message_content: {
          card_name: state.selectedCard.card_name,
          card_id: state.selectedCard.card_id,
          target: state.target_name
        },
      };
      console.log('target_name es:', state.target_name);
      state.socket.send(JSON.stringify(request));
    } else {
      actions.setSeverity('error');
      actions.setBody('Elige una carta para jugar.');
      actions.setOpen(true);
    }
  };


  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* First half */}
      {/* TODO: probar */}
      {state.deadPlayer && <h1>Has muerto...</h1>}
      {!state.deadPlayer &&
        <Grid xs={8} sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box>
            <PlayerRound players={state.jugadores} socket={state.socket} onTarget={actions.setTargetName} isTurn={state.isTurn} />
          </Box>
          <Box sx={{ width: '80%', display: 'flex', flexDirection: 'row' }}>
            <Box>
              <PlayersHand cartas={state.hand} onSelectCard={actions.setSelectedCard} />
            </Box>
            {state.isTurn &&
              <Box>
                <Box>
                  <RButton text="Jugar carta" action={() => handleplayCard()} />
                </Box>
                <Box>
                  <RButton text="Descartar carta" />
                </Box>
              </Box>}
          </Box>
        </Grid>}
      {/* Second half */}
      <Grid xs={4} sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Box>
          <Notifications messages={state.avisos} />
        </Box>
      </Grid>
      {state.endGame && <EndGameBanner reason={state.reason} winners={state.winners} />}
      <SnackBar open={state.open} handleClose={handleClose} severity={state.severity} body={state.body} />
    </Grid>
  );
};


export default Match;