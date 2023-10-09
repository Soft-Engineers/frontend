import PlayerList from "../../components/PlayersList";
import Header from "../../components/Header";
import RButton from "../../components/Button";
import Container from '@mui/material/Container';
import React, { useEffect, useState } from "react";
import { getJugadores } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import { useParams } from "react-router-dom";


const Lobby = () => {
    const navigate = useNavigate();
    const [jugadores, setJugadores] = useState([]);
    const { match_name } = useParams();

    // Conectarse al socket
    useEffect(() => {
      const socket = new WebSocket(`ws://localhost:8000/ws/${match_name}`);
      socket.onopen = () => {
        console.log("Conectado al socket");
      };
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.message_type === 1) {
          console.log("DATA", data)
          console.log(data);
          setJugadores(data.message_content);
        } else if (data.message_type === 3){
          console.log(data.message_content);
        }
      }

      socket.onclose = () => {
        console.log("Desconectado del socket");
      }

      return () => {
        socket.close();
      }
    }, [match_name]);
    

    return (
      <Container >
        <Header/>
        {/* Habra 2 mitades iguales divididas con Grid */}
        <Grid container spacing={2}>
          {/* Primera mitad */}
          <Grid item xs={6}>
            <PlayerList // TODO: Cambiar por la lista de jugadores de la partida
              jugadores={jugadores}
            />
          </Grid>
          {/* Segunda mitad */}
          <Grid item xs={6} container justifyContent="center" alignItems="center">
            <RButton
              text="Iniciar Partida"
              action={() => navigate("/Partida_iniciada")}
              icon={<VideogameAssetOutlinedIcon />}
            />
          </Grid>
        </Grid>
      </Container>
    );
}

export default Lobby;