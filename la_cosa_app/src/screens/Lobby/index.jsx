import PlayerList from "../../components/PlayersList";
import Header from "../../components/Header";
import RButton from "../../components/Button";
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import { getJugadores } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import { useParams } from "react-router-dom";


const Lobby = () => {
    const navigate = useNavigate();
    const [jugadores, setJugadores] = useState([]);
    const { match_name } = useParams();


    useEffect(() => {
      const fetchJugadores = async () => {
        const response = await getJugadores(match_name);
        setJugadores(response.data.players);
      }
      fetchJugadores();
    }, []);

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