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
    DOMAIN,
    PORT,
} = require("../../src/utils/api");

// Mock de axios para simular llamadas HTTP
const mock = new MockAdapter(axios);

describe("API Functions", () => {
    afterEach(() => {
        mock.reset(); // Reiniciar el mock después de cada prueba
    });

    it("deberia crear un usuario", async () => {
        // Simular una llamada HTTP exitosa
        mock.onPost("http://" + DOMAIN + ":" + PORT + "/player/create").reply(200, { player_id: 1 });

        const response = await createUser("Juan");
        expect(response.status).toBe(200);
        expect(response.data.player_id).toBe(1);
    });

    it("deberia crear una partida", async () => {
        // Simular una llamada HTTP exitosa
        mock.onPost("http://" + DOMAIN + ":" + PORT + "/match/create").reply(200, { detail: "Game1" });

        const response = await createPartida("Game1", "John", 4, 12);
        expect(response.status).toBe(200);
        expect(response.data.detail).toBe("Game1");
    });

    it("deberia obtener jugadores", async () => {
        const matchName = "Game1";
        mock.onGet("http://" + DOMAIN + ":" + PORT + "/match/players").reply(200, { players: ["Juan", "Ramon", "Raul", "Pepe"] });

        const response = await getJugadores("Game1");
        expect(response.status).toBe(200);
        expect(response.data.players).toEqual(["Juan", "Ramon", "Raul", "Pepe"]);
    });

    it("deberia obtener partidas", async () => {
        mock.onGet("http://" + DOMAIN + ":" + PORT + "/match/list").reply(200, { Matches: ["Game1", "Game2", "Game3"] });

        const response = await getPartidas();
        expect(response).toEqual(["Game1", "Game2", "Game3"]);
    });

    it("deberia unirse a una partida", async () => {
        mock.onPost("http://" + DOMAIN + ":" + PORT + "/match/join").reply(200, { detail: "Game1" });

        const response = await joinMatch("Juan", "Game1", "1234");
        expect(response.status).toBe(200);
        expect(response.data.detail).toBe("Game1");
    });

    it("deberia obtener el estado de host de un jugador", async () => {
        mock.onGet("http://" + DOMAIN + ":" + PORT + "/player/host").reply(200, { is_host: true });

        const response = await isHost("Juan", "Game1");
        expect(response.status).toBe(200);
        expect(response.data.is_host).toBe(true);
    });

    it("deberia iniciar una partida", async () => {
        mock.onPost("http://" + DOMAIN + ":" + PORT + "/match/start").reply(200, { detail: "Game1" });

        const response = await startMatch("Game1");
        expect(response.status).toBe(200);
        expect(response.data.detail).toBe("Game1");
    });

    it("deberia salir de un lobby", async () => {
        mock.onPut("http://" + DOMAIN + ":" + PORT + "/match/leave").reply(200, { detail: "Juan abandono el lobby" });

        const response = await leaveLobby("Juan", "Game1");
        expect(response.status).toBe(200);
        expect(response.data.detail).toBe("Juan abandono el lobby");
    });

    it("deberia obtener el estado de host de un jugador", async () => {
        mock.onGet("http://" + DOMAIN + ":" + PORT + "/player/host").reply(200, { is_host: true });

        const response = await isHost("Juan", "Game1");
        expect(response.status).toBe(200);
        expect(response.data.is_host).toBe(true);
    });

    //it("deberia manejar los mensajes de socket", async () => {
    //});
});
