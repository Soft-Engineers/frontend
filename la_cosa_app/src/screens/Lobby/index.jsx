import PlayerList from "../../components/PlayersList";
import Header from "../../components/Header";
import RButton from "../../components/Button";
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import { getJugadores } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';

const Lobby = () => {
    const navigate = useNavigate();
    const [jugadores, setJugadores] = useState([]);
    const match_id = 1;

    useEffect(() => {
      getJugadores(match_id)
        .then((res) => {
          console.log('JUGADORES:', res.data) // TODO: Borrar
          setJugadores(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    return (
      <Container >
        <Header/>
        {/* Habra 2 mitades iguales divididas con Grid */}
        <Grid container spacing={2}>
          {/* Primera mitad */}
          <Grid item xs={6}>
            <PlayerList // TODO: Cambiar por la lista de jugadores de la partida
                jugadores={["Jugador 1", "Jugador 2", "Jugador 3", "Jugador 4", "Jugador 5", "Jugador 6", "Jugador 7", "Jugador 8", "Jugador 9", "Jugador 10"]}
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