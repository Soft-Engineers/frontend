import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Grid, Box } from '@mui/material';
import PlayerRound from "../../components/PlayerRound/";
import PlayersHand from "../../components/PlayersHand/";
import RButton from '../../components/Button/'

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
    <Grid container>
  {/* First half */}
  <Grid xs={8} sx={{ minHeight: '100%', border: '1px solid red', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <Box>
      <PlayerRound players={jugadores} />
    </Box>
    <Box sx={{ width:'80%',display:'flex', flexDirection:'row'}}>
      <Box>
        <PlayersHand cartas={['A', 'B', 'C', 'D']} />
      </Box>
      <Box>
        <RButton text='Jugar'/>
      </Box>
      <Box>
        <RButton text='Descartarse'/>
      </Box>
    </Box>
  </Grid>

  {/* Second half */}
  <Grid xs={4} sx={{ minHeight: '100%', border: '1px solid blue', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <Box>
      <p>chat</p>
    </Box>
  </Grid>
</Grid>

  );
};

export default Match;
