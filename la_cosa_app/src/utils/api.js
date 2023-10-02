import axios from "axios";

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

// pasar como formdata a name_player
export const createUser = async (name_player) => {
  const formData = new FormData();
  formData.append("name_player", name_player);
  try {
    const response = await axios.post(
      "http://localhost:8000/player/create",
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// unirse a una partida
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
  }
};
