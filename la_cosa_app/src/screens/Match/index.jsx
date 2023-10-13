import { MatchProvider, useMatchC } from './matchContext';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Grid, Box } from '@mui/material';
import SnackBar from '../../components/SnackBar';
import PlayersHand from "../../components/PlayersHand/";
import RButton from '../../components/Button/'
import Deck from '../../components/Deck/';
import EndGameBanner from "../../components/EndGameBanner";
import Notifications from "../../components/Notifications";

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


/////////////////////////// Funcion 
import './PlayerRound.css';

const PlayerCard = ({ player, angle, radius, onSelectCard, style }) => {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  const cardStyle = {
    position: 'absolute',
    transform: `translate(${x}px, ${y}px)`,
    cursor: 'pointer',
  };

  const handleClick = () => {
    onSelectCard(player.player_name);

  }

  return (
    <div className="player-card" style={cardStyle} onClick={handleClick}>
      <div className="circle"></div>
      <span className="player-name">{player.player_name}</span>
    </div>
  );
};

const PlayerRound = ({ players, socket, onTarget, isTurn }) => {
  const currentPlayerName = sessionStorage.getItem('player_name');
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Change color target


  const currentPlayer = players.find(player => player.player_name === currentPlayerName);

  if (!currentPlayer) {
    console.log('El jugador actual no está en la lista de jugadores');
    return null;
  }


  const sortedPlayers = players.sort((a, b) => a.position - b.position);

  const angle = (2 * Math.PI) / sortedPlayers.length;
  const currentPlayerIndex = sortedPlayers.indexOf(currentPlayer);
  const radius = 200;

  // Center the deck in the middle of the circle
  const centerX = 0;
  const centerY = 0;

  const handleDrawCard = async () => {
    try {
      const request = { message_type: 'robar carta', message_content: '' };
      socket.send(JSON.stringify(request));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="player-round">
      <div
        className="deck"
        style={{
          position: 'absolute',
          transform: `translate(${centerX}px, ${centerY}px)`,
        }}
      >
        <Deck onDrawCard={() => handleDrawCard()} />
      </div>

      {sortedPlayers.map((player, index) => (
        <PlayerCard
          key={index}
          player={player}
          angle={(angle * (index - currentPlayerIndex)) + Math.PI / 2}
          radius={radius}
          onSelectCard={onTarget}
        />
      ))}
    </div>
  );
};

///////////////////////////


export default Match;