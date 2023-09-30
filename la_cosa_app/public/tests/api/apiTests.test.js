import axios from "axios";
import mockResponsePlayers from '../../mocks/mockResponsePlayers'
import { getJugadores } from '../../../src/utils/api'


describe('getJugadores', () => {
    it('debería retornar la lista de jugadores si el match_id es válido', async () => {
        const jugadores = await getJugadores(123);
        expect(jugadores).toEqual(["Jugador1", "Que_feo_lobby", "HOLAA"]);
    });

    it('debería manejar un error si el match_id es inválido', async () => {
        const jugadores = await getJugadores(456);
        expect(jugadores).toEqual([]);
    });
});
