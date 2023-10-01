import axios from "axios";

export const getJugadores = async (match_id) => {
  try {
    const Url = "http://localhost:8000/match/players";

    const response = await axios.get(Url, {
      params: { match_id: match_id },
    });
    console.log("ACA ESTA EL RESPONSE: ", response.data.players); // TODO: Borrar esto

    if (response.status === 200) {
      return response.data.players;
    }
  } catch (error) {
    console.log(error);
    return []; // se puede cambiar para que se rompa todo ante un error.
  }
};
