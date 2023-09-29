import axios from "axios";
import mock from "../../public/mocks/mock_1"; //para testear

export const getJugadores = async (match_id) => {
    try {
        const Url = 'http://localhost:8000/match/players';

        const response = await axios.get(Url, { params: { match_id: match_id.toString() } });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};