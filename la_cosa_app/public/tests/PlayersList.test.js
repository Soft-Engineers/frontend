import React from 'react';
import ListaJugadores from './../../src/components/PlayersList';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {getJugadores} from "../../src/utils/api.js";
import {getByLabelText, getByPlaceholderText, render} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import FormPartida from "../../src/components/FormPartida/index.jsx";

const mock = new MockAdapter(axios);

mock.onGet('http://localhost:8000/match/players', { params: { match_name: 'PartidaTest' } }).reply(200, { players: ["Jugador1", "Que_feo_lobby", "HOLAA"] });

describe('getJugadores', () => {
        it('retorna lista de jugadores si match_id es válido', async () => {
            const response = await getJugadores('PartidaTest');
            const jugadores = response.data.players;
            expect(jugadores).toEqual(["Jugador1", "Que_feo_lobby", "HOLAA"]);
        });

        it('manejar error si match_id es inválido', async () => {
            const jugadores= await getJugadores('456');
            expect(jugadores).toEqual([]);
        });
});

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

    // pruebas de representación visual: otra biblioteca
});