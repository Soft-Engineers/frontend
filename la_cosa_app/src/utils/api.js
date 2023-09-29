import axios from "axios";

// Crear partida, recibe el nombre de la partida
export const createPartida = async (nombre) => {
  try {
    const response = await axios.post("http://localhost:8000/partida/crear", {
      nombre,
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
