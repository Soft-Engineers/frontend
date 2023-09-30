import axios from "axios";
import mockResponsePlayers from '../../mocks/mockResponsePlayers'
import { getJugadores } from '../../../src/utils/api'


describe('getJugadores', () => {
    it('retorna lista de jugadores si match_id es válido', async () => {
        const jugadores = await getJugadores(123);
        expect(jugadores).toEqual(["Jugador1", "Que_feo_lobby", "HOLAA"]);
    });

    it('manejar error si match_id es inválido', async () => {
        const jugadores = await getJugadores(456);
        expect(jugadores).toEqual([]);
    });
}
);
