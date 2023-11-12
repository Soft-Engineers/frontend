// api.test.js
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter"); // Usado para simular llamadas HTTP

const {
    createUser,
    createPartida,
    getJugadores,
    getPartidas,
    joinMatch,
    isHost,
    startMatch,
    leaveLobby,
} = require("../../src/utils/api");

// Mock de axios para simular llamadas HTTP
const mock = new MockAdapter(axios);

describe("API Functions", () => {
    afterEach(() => {
        mock.reset(); // Reiniciar el mock después de cada prueba
    });

    it("deberia crear un usuario", async () => {
        // Simular una llamada HTTP exitosa
        mock.onPost("http://localhost:8000/player/create").reply(200, { player_id: 1 });

        const response = await createUser("Juan");
        expect(response.status).toBe(200);
        expect(response.data.player_id).toBe(1);
    });

    it("deberia crear una partida", async () => {
        // Simular una llamada HTTP exitosa
        mock.onPost("http://localhost:8000/match/create").reply(200, { detail: "Game1" });

        const response = await createPartida("Game1", "John", 4, 12);
        expect(response.status).toBe(200);
        expect(response.data.detail).toBe("Game1");
    });

    it("should get jugadores", async () => {
        // Simular una llamada HTTP exitosa
        const matchName = "Game1";
        mock.onGet(`http://localhost:8000/match/players?match_name=${matchName}`).reply({ players: ["Juan", "Ramon"] });

        const response = await getJugadores("Game1");
        //expect(response.status).toBe(200);
        expect(response.data.players).toEqual(["Juan", "Ramon"]);
    });

    // Agrega pruebas para las demás funciones
});
