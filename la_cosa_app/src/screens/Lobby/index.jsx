import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PlayerList from "../../components/PlayersList";
import Header from "../../components/Header";
import RButton from "../../components/Button";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { isHost  as checkIsHost, startMatch, leaveLobby } from '../../utils/api';
import SnackBar from '../../components/SnackBar';

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
};

const Lobby = () => {
    // State
    const navigate = useNavigate();
    const [jugadores, setJugadores] = useState([]);
    const [isHost, setIsHost] = useState(false);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [body, setBody] = useState('');
    const [waitmsg, setWaitmsg] = useState('Esperando que el host inicie la partida...');

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
                setWaitmsg(data.message_content)
                navigate(`/match/${match_name}`);
                console.log(waitmsg);
            }
            else if (data.message_type === "player_left") {
                setJugadores(data.message_content.players);
            }
            else if (data.message_type === "match_deleted") {
                setSeverity("error");
                setBody(data.message_content);
                setOpen(true);
                navigate(`/mainpage/${player_name}`);
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
      const response = checkIsHost (player_name, match_name);
      response.then((data) => {
        setIsHost(data.data.is_host);
        console.log(isHost);
      });

    }, [player_name, match_name]);

    // Funcion para iniciar la partida
    const handleStartMatch = async (player_name, match_name) => {
        try {
            const response = await startMatch(player_name, match_name);
            console.log("response", response);
        } catch (error) {
            setSeverity("error");
            setBody("Ha ocurrido un error");
            setOpen(true);
        }
    };

    // Funcion para salir de la partida
    const handleLeaveMatch = async (player_name, match_name) => {
        try{
            const response = await leaveLobby(player_name, match_name);
            if(response.status === 200){
                setSeverity("success");
                setBody(response.data.message);
                setOpen(true);
                navigate(`/mainpage/${player_name}`);
            }
        }catch(error){
            setSeverity("error");
            setBody("Ha ocurrido un error");
            setOpen(true);
        }
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container >
            <Header/>
            <Grid container spacing={2} sx={styles.container}>
                {/* Primera mitad */}
                <Grid item xs={6}>
                    <PlayerList
                        jugadores={jugadores}
                    />
                </Grid>
                {/* Segunda mitad */}
                <Grid item xs={6} container sx={styles.container}>
                  {isHost ? (
                    <RButton
                        text="Iniciar Partida"
                        action={() => handleStartMatch(player_name, match_name)}
                        icon={<VideogameAssetOutlinedIcon />}
                    /> 
                  ) : (
                    <h2>Esperando que el host inicie la partida...</h2>
                  )}
                  <RButton
                    text="Salir"
                    action={() => handleLeaveMatch(player_name, match_name)}
                    icon={<VideogameAssetOutlinedIcon />}
                    />
                </Grid>
            </Grid>
            <SnackBar
                open={open}
                body={body}
                severity={severity}
                handleClose={handleClose}
            />
        </Container>
    );
}

export default Lobby;