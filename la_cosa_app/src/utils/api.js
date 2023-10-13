import axios from "axios";
import { useEffect } from "react";
import { useMatchC } from '../screens/Match/matchContext';

// pasar como formdata a name_player
export const createUser = async (name_player) => {
  const formData = new FormData();
  formData.append("name_player", name_player);
  try {
    const response = await axios.post(
      "http://localhost:8000/player/create",
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Crear partida, recibe el nombre de la partida
export const createPartida = async (
  match_name,
  player_name,
  min_players,
  max_players
) => {
  try {
    const response = await axios.post("http://localhost:8000/match/create", {
      match_name,
      player_name,
      min_players,
      max_players,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getJugadores = async (match_name) => {
  try {
    const Url = "http://localhost:8000/match/players";

    const response = await axios.get(Url, {
      params: { match_name: match_name },
    });
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Obtener todas las partidas
export const getPartidas = async () => {
  try {
    const response = await axios.get("http://localhost:8000/match/list");
    if (response.status === 200) {
      return response.data.Matches;
    }
  } catch (error) {
    console.log(error);
  }
};

// Unirse a una partida
export const joinMatch = async (player_name, match_name, password) => {
  try {
    const response = await axios.post("http://localhost:8000/match/join", {
      player_name,
      match_name,
      password,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Obtener el estado de host de un jugador
export const isHost = async (player_name, match_name) => {
  try {
    const response = await axios.get("http://localhost:8000/player/host", {
      params: { player_name, match_name },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Empezar partida
export const startMatch = async (player_name, match_name) => {
  try {
    const response = await axios.post("http://localhost:8000/match/start", {
      player_name,
      match_name,
    });
    console.log("response", response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handle_socket_messages = () => {
  const { state, actions } = useMatchC();

  const match_name = sessionStorage.getItem('match_name');
  const player_name = sessionStorage.getItem('player_name');

  console.log(match_name);
  console.log(player_name);

  useEffect(() => {
    const matchSocket = new WebSocket(`ws://localhost:8000/ws/${match_name}/${player_name}`);
    matchSocket.onopen = () => {
      console.log("Conectado al socket de la partida");
    };


    matchSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.message_type) {
        case "posiciones":
          console.log('content de posiciones:', data.message_content);
          actions.setJugadores(data.message_content);
          break;
        case 'estado inicial':
          actions.setHand(data.message_content.hand);
          if (data.message_content.current_turn === player_name) {
            actions.setIsTurn(true);
          } else {
            actions.setIsTurn(false);
          }
          break;
        case 'datos jugada':
          if (data.message_content.turn === player_name) {
            actions.setIsTurn(true);
          } else {
            actions.setIsTurn(false);
          }
          if (data.message_content.dead_player_name === player_name) {
            actions.setDeadPlayer(true);
          }
          break;
        case 'notificación muerte':
        case 'notificación jugada':
        case 'notificación turno':
          actions.setAvisos([...state.avisos, data.message_content]);
          break;
        case 'partida finalizada':
          actions.setWinners(data.message_content.winners);
          actions.setReason(data.message_content.reason);
          actions.setEndGame(true);
          break;
        case "cards":
          console.log(data.message_content);
          actions.setHand(data.message_content);
          break;
        case 'error':
          actions.setSeverity('error');
          actions.setBody(data.message_content);
          actions.setOpen(true);
          break;
        default:
          // Manejar otros tipos de mensajes si es necesario
          break;
      };
    };
    matchSocket.onclose = () => {
      console.log("Desconectado del socket de la partida");
    };

    // Set the socket state
    actions.setSocket(matchSocket);

    return () => {
      matchSocket.close();
    };
  }, [match_name]);

}
