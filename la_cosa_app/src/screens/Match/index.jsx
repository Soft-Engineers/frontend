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
  const [socket, setSocket] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  const [isTurn, setIsTurn] = useState(false);
  const [hand, setHand] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [body, setBody] = useState('');
  const [avisos, setAvisos] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [winners, setWinners] = useState([]);
  const [reason, setReason] = useState('');
  const [deadPlayer, setDeadPlayer] = useState(false);
  const [target_name, setTargetName] = useState('');


  const { match_name } = useParams();
  const player_name = sessionStorage.getItem('player_name');

  useEffect(() => {
    const matchSocket = new WebSocket(`ws://localhost:8000/ws/${match_name}/${player_name}`);
    matchSocket.onopen = () => {
      console.log("Conectado al socket de la partida");
    };

    matchSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message_type === "posiciones") {
        console.log('content de posiciones:', data.message_content);
        setJugadores(data.message_content);
      }
      if (data.message_type === 'estado inicial') {
        setHand(data.message_content.hand);
        if (data.message_content.current_turn === player_name) {
          setIsTurn(true);
        }else{
          setIsTurn(false);
        }
      }
      if (data.message_type === 'datos jugada') {
        if (data.message_content.turn === player_name) {
          setIsTurn(true);
        }else{
          setIsTurn(false);
        }
        if (data.message_content.dead_player_name === player_name){
          setDeadPlayer(true);
        }
      }
      if (data.message_type === 'notificación muerte') {
        setAvisos([...avisos, data.message_content]);
      }
      if (data.message_type === 'notificación jugada') {
        setAvisos([...avisos, data.message_content]);
      }
      if (data.message_type === 'notificación turno') {
        setAvisos([...avisos, data.message_content]);
      }
      if (data.message_type === 'partida finalizada') {
        setWinners(data.message_content.winners);
        setReason(data.message_content.reason);
        setEndGame(true);
      }
      if (data.message_type === "cards"){
        console.log(data.message_content);
        setHand(data.message_content);
      }
      if (data.message_type === 'error') {
        setSeverity('error');
        setBody(data.message_content);
        setOpen(true);
      }
    };

    matchSocket.onclose = () => {
      console.log("Desconectado del socket de la partida");
    };

    // Set the socket state
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


  const handleplayCard = () => {
    if (selectedCard !== null) {
      console.log({
        hand
      });
      const request = {
        message_type: 'jugar carta',
        message_content: {
          card_name: selectedCard.card_name,
          card_id: selectedCard.card_id,
          target: target_name
        },
      };
      console.log('target_name es:', target_name),
      socket.send(JSON.stringify(request));
    } else {
      setSeverity('error');
      setBody('Elige una carta para jugar.');
      setOpen(true);
    }
  };


  return (
  <Grid container sx={{minHeight:'100vh'}}>
    {/* First half */}
    {/* TODO: probar */}
    {deadPlayer && <EndGameBanner reason="Has muerto" /> } 
    {!deadPlayer && 
    <Grid xs={8} sx={{ minHeight: '100%', border: '1px solid red', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box>
        <PlayerRound players={jugadores} socket={socket} onTarget={setTargetName} isTurn={isTurn}/>
      </Box>
      <Box sx={{ width:'80%',display:'flex', flexDirection:'row'}}>
        <Box>
          <PlayersHand cartas={hand} onSelectCard={setSelectedCard} />
        </Box>
        {isTurn &&
          <Box>
            <Box>
              <RButton text="Jugar carta" action={() => handleplayCard()} />
            </Box>
            <Box>
              <RButton text="Descartar carta" />
            </Box>
          </Box> }
      </Box> 
    </Grid> }
    {/* Second half */}
    <Grid xs={4} sx={{ minHeight: '100%', border: '1px solid blue', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box>
        <Notifications messages={avisos} />
      </Box>
    </Grid> 
    {endGame && <EndGameBanner reason={reason} winners={winners}/>}
    <SnackBar open={open} handleClose={handleClose} severity={severity} body={body} />
  </Grid>
  );
};


/////////////////////////// Funcion 
import './PlayerRound.css';

const PlayerCard = ({ player, angle, radius, onSelectCard, style}) => {
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

const PlayerRound = ({ players, socket, onTarget, isTurn}) => {
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
    try{
      const request = { message_type: 'robar carta' , message_content: ''};
      socket.send(JSON.stringify(request));
      
    }catch(error){
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
