import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Carta from './../../src/components/Carta';

// Supongamos que tienes una matriz de nombres de cartas
const nombresDeCartas = [
    'rev',
    'La Cosa',
    '¡Infectado!',
    'Lanzallamas',
    'Análisis',
    'Hacha',
    'Sospecha',
    'Determinación',
    'Vigila tus espaldas',
    '!Cambio de Lugar!',
    '!Más vale que corras!',
    'Seducción',
    'Puerta atrancada',
    'Aquí estoy bien',
    'Aterrador',
    'Cuarentena',
    '!No, gracias!',
    '!Fallaste!',
    '!Nada de barbacoas!',
    'Revelaciones',
    'Cuerdas podridas',
    '!Sal de aquí!',
    'Olvidadizo',
    'Uno, dos..',
    'Tres, cuatro..',
    '!Es aquí la fiesta?',
    'Que quede entre nosotros...',
    'Vuelta y vuelta',
    '!No podemos ser amigos?',
    'Cita a ciegas',
    '!Ups!',
    'Whisky'
];

describe('Pruebas para cartas', () => {
    nombresDeCartas.forEach((nombre) => {
        it(`debería mostrar la carta "${nombre}"`, () => {
            const { getByAltText } = render(<Carta nombre={nombre} />);
            const cartaImage = getByAltText(`Carta ${nombre}`);
            expect(cartaImage).toBeInTheDocument();
        });
    });
});