import axios from "axios";


export const getJugadores = async (match_id) => {
    try {
        const Url = "http://localhost:8000/match/players"
        const params = {
            match_id: match_id
        }

        const response = await axios.get(Url, params);

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};