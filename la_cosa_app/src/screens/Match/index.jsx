import { useState, useEffect } from 'react';
import PlayerRound from "../../components/PlayerRound/";
import { useParams } from "react-router-dom";
import { Box } from '@mui/material';

const Match = () => {
  const { match_name } = useParams();
  const player_name = sessionStorage.getItem('player_name');
  const [socket, setSocket] = useState(null);
  const [jugadores, setJugadores] = useState([]);

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

  return (
    <Box>
      <PlayerRound players={jugadores} />
    </Box>
  );
};

export default Match;
