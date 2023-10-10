import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PlayerList from "../../components/PlayersList";
import Header from "../../components/Header";
import RButton from "../../components/Button";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { isHost  as checkIsHost } from '../../utils/api'

const Lobby = () => {
    // State
    const navigate = useNavigate();
    const [jugadores, setJugadores] = useState([]);
    const [isHost, setIsHost] = useState(false);

    const { match_name } = useParams();
    const player_name = localStorage.getItem('player_name');

    //Conectarse al socket
    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/${match_name}/${player_name}`);
        socket.onopen = () => {
            console.log("Conectado al socket del lobby");
        };
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message_type === 1) {
                setJugadores(data.message_content);
            } else if (data.message_type === 3){
                console.log(data.message_content);
            }
        }

        socket.onclose = () => {
            console.log("Desconectado del socket del lobby");
        }
        return () => {
            socket.close();
        }
    }, [match_name]);


    // Verificar si es el host
    useEffect(() => {
      const reponse = checkIsHost (player_name, match_name);
      reponse.then((data) => {
        setIsHost(data.data.is_host);
      });
      
    }, []);

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
                        action={() => navigate("/match")}
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