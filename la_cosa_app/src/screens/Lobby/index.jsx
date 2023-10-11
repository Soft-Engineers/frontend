import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PlayerList from "../../components/PlayersList";
import Header from "../../components/Header";
import RButton from "../../components/Button";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { isHost  as checkIsHost, startMatch } from '../../utils/api'

const Lobby = () => {
    // State
    const navigate = useNavigate();
    const [jugadores, setJugadores] = useState([]);
    const [isHost, setIsHost] = useState(false);

    const { match_name } = useParams();
    const player_name = sessionStorage.getItem('player_name');

    //Conectarse al socket
    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/${match_name}/${player_name}`);
        socket.onopen = () => {
            console.log("Conectado al socket del lobby");
            console.log('Yo soy ', player_name)
        };
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message_type === "jugadores lobby") {
                setJugadores(data.message_content);
            }
            else if (data.message_type === "start_match") {
                navigate(`/match/${match_name}`);
            } 
            else {
                console.log('Mensaje no reconocido');
            }
        }

        socket.onclose = () => {
            console.log("Desconectado del socket del lobby");
        }
        return () => {
            socket.close();
        }
    }, [match_name, player_name]);


    // Verificar si es el host
    useEffect(() => {
      const reponse = checkIsHost (player_name, match_name);
      reponse.then((data) => {
        setIsHost(data.data.is_host);
        console.log(isHost);
      });
      
    }, [player_name, match_name]);

    // Funcion para iniciar la partida
    const handleStartMatch = (player_name, match_name) => {
      const response = startMatch(player_name,match_name);
      response.then((data) => {
        console.log('DATA de startmatch',data.data);
      });
    }

    return (
        <Container >
            <Header/>
            {/* Habra 2 mitades iguales divididas con Grid */}
            <Grid container spacing={2}>
                {/* Primera mitad */}
                <Grid item xs={6}>
                    <PlayerList
                        jugadores={jugadores}
                    />
                </Grid>
                {/* Segunda mitad */}
                <Grid item xs={6} container justifyContent="center" alignItems="center">
                  {isHost ? (
                    <RButton
                        text="Iniciar Partida"
                        action={() => handleStartMatch(player_name, match_name)}
                        icon={<VideogameAssetOutlinedIcon />}
                    /> 
                  ) : (
                    <h1>Esperando que el host inicie la partida...</h1>
                  )}
                </Grid>
            </Grid>
        </Container>
    );
}

export default Lobby;