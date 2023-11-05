import axios from "axios";
import { useEffect } from "react";
import { useMatchC, turnStates } from '../screens/Match/matchContext';

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

export const leaveLobby = async (player_name, match_name) => {
  try {
    const response = await axios.put("http://localhost:8000/match/leave", {
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

  useEffect(() => {
    try {
      const matchSocket = new WebSocket(`ws://localhost:8000/ws/${match_name}/${player_name}`);
      matchSocket.onopen = () => {
        console.log("Conectado al socket de la partida");
      };


      matchSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch (data.message_type) {
          case "posiciones":
            actions.setJugadores(data.message_content);
            break;
          case "muertes":
            actions.setDeadPlayerNames(data.message_content);
            const isCurrentUserDead = data.message_content.includes(player_name);
            actions.setIsDeadPlayer(isCurrentUserDead);
            break;
          case 'estado inicial':
            actions.setHand(data.message_content.hand);
            actions.setCurrentTurn(data.message_content.current_turn);
            actions.setRole(data.message_content.role);
            break;
          case 'datos jugada':
            break;
          case 'notificación muerte':
          case 'notificación jugada':
            actions.setAvisos([...state.avisos, data.message_content]);
            break;
          case 'partida finalizada':
            actions.setWinners(data.message_content.winners);
            actions.setReason(data.message_content.reason);
            actions.setIsFinished(true);
            break;
          case "cards":
            actions.setHand(data.message_content);
            break;
          case 'error':
            actions.setSeverity('error');
            actions.setBody(data.message_content);
            actions.setOpen(true);
            break;
          case 'revelar cartas':
            console.log(data.message_content);
            actions.setRevealCard(data.message_content);
            actions.setReveal(true);
            break;
          case 'estado partida':
            console.log(state.reveal + " REVELAR " + state.revealCard);
            actions.setCurrentTurn(data.message_content.turn);
            if (data.message_content.turn === player_name) {
              actions.setIsTurn(true);
            }
            else {
              actions.setIsTurn(false);
            }
            actions.setTurnState(data.message_content.game_state);
            break;
          case 'infectado':
            if (state.role !== 'INFECTADO') {
              actions.setAvisos([...state.avisos, 'LA COSA TE INFECTÓ!!']);
            }
            actions.setRole('INFECTADO')
            break;
          case 'obstáculos':
            actions.setObstacles(data.message_content);
            break;
          case 'cuarentena':
            actions.setCuarentena(data.message_content);
            break;
          default:
            //console.log("Mensaje no reconocido:" + data.message_content)
            break;
        }
      };
      matchSocket.onclose = () => {
        console.log("Desconectado del socket de la partida");
      };

      // Set the socket state
      actions.setSocket(matchSocket);

      return () => {
        matchSocket.close();
      };
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  }, [match_name]);

}
