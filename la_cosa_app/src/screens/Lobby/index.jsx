import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PlayerList from "../../components/PlayersList";
import Header from "../../components/Header";
import RButton from "../../components/Button";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { isHost as checkIsHost, startMatch, leaveLobby, DOMAIN, PORT } from "../../utils/api";
import SnackBar from "../../components/SnackBar";
import React from "react";
import Chat from "../../components/Chat/index.jsx";
import { Box } from "@mui/material";
import { useMatchC } from "../Match/matchContext.jsx";

const styles = {
  container: {
    height: "100vh",
  },
  list: {
    maxHeight: "calc(100% - 82px)",
    minHeight: "calc(100% - 82px)",
    height: "calc(100% - 82px)",
  },
  buttonsAndChat: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    maxHeight: "85%",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    height: "20vh",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "10px",
    backgroundColor: "rgba(255,255,255,0.90)"
  },
  chatBox: {
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "10px",
    height: "70%",
    backgroundColor: "rgba(255,255,255,0.90)"
  },
};

const Lobby = () => {
  const { state, actions } = useMatchC();
  const navigate = useNavigate();
  const [jugadores, setJugadores] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [body, setBody] = useState("");
  const [socket, setSocket] = useState(null);
  const { match_name } = useParams();
  const player_name = sessionStorage.getItem("player_name");

  // Conectarse al socket
  useEffect(() => {
    const lobbySocket = new WebSocket(
      `ws://` + DOMAIN + `:` + PORT + `/ws/${match_name}/${player_name}`,
    );
    lobbySocket.onopen = () => {
      console.log("Conectado al socket del lobby");
    };

    lobbySocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.message_type) {
        case "jugadores lobby":
          setJugadores(data.message_content);
          break;

        case "start_match":
          actions.setMessages([]);
          navigate(`/match/${match_name}`);
          break;

        case "player_left":
          const newMessage = {
            author: "", // Replace with the actual author's name
            message: data.message_content.message,
            timestamp: new Date(data.message_content.timestamp * 1000).toLocaleTimeString(),
          };
          actions.setMessages([...state.messages, newMessage]);
          setJugadores(data.message_content.players);
          break;

        case "match_deleted":
          setSeverity("error");
          setBody(data.message_content.message_content);
          setOpen(true);
          actions.setMessages([]);
          // Agregar un tiempo de espera para que se vea el mensaje de error: 3 segundos
          setTimeout(() => {
            navigate(`/mainpage/${player_name}`);
          }, 2000);
          break;
        case "notificación chat":
          actions.setMessages([...state.messages, data.message_content]);
          break;
        case "historial":
          actions.setChatHistory(data.message_content);
          break;
        default:
        //console.log("Mensaje no reconocido");
      }
    };

    lobbySocket.onclose = () => {
      console.log("Desconectado del socket del lobby");
    };
    setSocket(lobbySocket);
    return () => {
      // lobbySocket.close();
    };
  }, [match_name, player_name]);

  useEffect(() => {
    actions.setMessages([]);
    actions.setChatHistory([]);
    setJugadores([]);
  }, []);

  // Verificar si es el host
  useEffect(() => {
    const response = checkIsHost(player_name, match_name);
    response.then((data) => {
      setIsHost(data.data.is_host);
    });
  }, [player_name, match_name]);

  // Funcion para iniciar la partida
  const handleStartMatch = async (player_name, match_name) => {
    try {
      const response = await startMatch(player_name, match_name);
      console.log("response", response);
    } catch (error) {
      setSeverity("error");
      setBody(error.response.data.detail);
      setOpen(true);
    }
  };

  // Function para salir del lobby
  const handleLeaveMatch = async (player_name, match_name) => {
    try {
      const response = await leaveLobby(player_name, match_name);
      if (response.status === 200) {
        actions.setMessages([]);
        navigate(`/mainpage/${player_name}`);
      }
    } catch (error) {
      setSeverity("error");
      setBody(error.response.data.detail);
      setOpen(true);
    }
  };

  const handleClose = (reason) => {
    setOpen(false);
  };

  return (
    <Container>
      <Grid container spacing={2} sx={styles.container}>
        {/* Header */}
        <Grid item xs={12}>
          <Header />
        </Grid>

        {/* Players List */}
        <Grid item xs={12} sm={6} md={5} sx={styles.list}>
          <PlayerList jugadores={jugadores} />
        </Grid>

        {/* Buttons and Chat */}
        <Grid item xs={12} sm={6} md={7} sx={styles.buttonsAndChat}>
          <Box sx={styles.buttons}>
            {isHost ? (
              <RButton
                text="Iniciar Partida"
                action={() => handleStartMatch(player_name, match_name)}
                icon={<VideogameAssetOutlinedIcon />}
              />
            ) : (
              <h3>
                Esperando que el host inicie la partida...
              </h3>
            )}
            <RButton
              text="Abandonar Sala"
              action={() => handleLeaveMatch(player_name, match_name)}
              icon={<ExitToAppIcon />}
            />
          </Box>

          {/* Chat */}
          <Box sx={styles.chatBox}>
            <Chat socket={socket} />
          </Box>
        </Grid>

        <SnackBar
          open={open}
          body={body}
          severity={severity}
          handleClose={handleClose}
        />
      </Grid>
    </Container>
  );
};

export default Lobby;
