import axios from "axios";
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onGet('http://localhost:8000/match/players').reply((config) => {
    const { params } = config;

    // Comprueba si se pasó el parámetro 'match_id' con un valor específico
    if (params && params.match_id === "123") {
        // Si coincide con el valor esperado, devuelve una respuesta exitosa
        return [200, { players: ["Jugador1", "Que_feo_lobby", "HOLAA"] }];
    } else {
        // Si no coincide, devuelve un error 400 con un mensaje
        return [404, { error: "Match not found" }];
    }
});

export default mock;