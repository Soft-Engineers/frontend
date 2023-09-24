import axios from "axios";

export const getPartidas = async () => {
  try {
    const response = await axios.get("http://localhost:8000/partidas");
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
