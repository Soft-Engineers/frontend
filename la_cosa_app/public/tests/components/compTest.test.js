import React from 'react';
import ListaJugadores from './../../../src/components/ListaJugadores';

describe('ListaJugadores', () => {
    it('props cuando no hay jugadores', () => {
        const jugadores = [];
        const component = <ListaJugadores jugadores={jugadores} />;

        expect(component.props.jugadores).toEqual(jugadores);
        expect(component.props.jugadores.length).toBe(0);
    });

    it('props cuando se proporciona una lista de 12 jugadores', () => {
        const jugadores = [];
        for (let i = 1; i <= 12; i++) {
            jugadores.push(`Jugador ${i}`);
        }
        const component = <ListaJugadores jugadores={jugadores} />;


        expect(component.props.jugadores).toEqual(jugadores);
        expect(component.props.jugadores.length).toBe(12);
    });


    it('props al manejar una lista vacía', () => {
        expect(() => {
            const component = <ListaJugadores jugadores={[]} />;
        }).not.toThrow();
    });

    // pruebas de representación visual: otra biblioteca?

});