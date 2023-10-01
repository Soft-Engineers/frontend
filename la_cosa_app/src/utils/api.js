import axios from "axios";

// Crear partida, recibe el nombre de la partida
export const createPartida = async (nombre, id, min, max) => {
  try {
    const response = await axios.post("http://localhost:8000/partida/crear", {
      nombre,
      id,
      min,
      max,
    });
    if (response.status === 200) {
      return response.data;
    }
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
