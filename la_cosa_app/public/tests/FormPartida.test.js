import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import FormPartida from './../../src/components/FormPartida';

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: 'success' })),
}));

describe('FormPartida', () => {
    it('Renderiza sin errores', () => {
        const { getByLabelText, getByPlaceholderText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<FormPartida />} />
                </Routes>
            </MemoryRouter>
        );

        expect(getByLabelText('Ingrese nombre de la partida')).toBeInTheDocument();
        expect(getByPlaceholderText('Nombre de la partida')).toBeInTheDocument();
        // Add additional assertions for other form elements as needed
    });
    /*
    it('Envio exitoso', async () => {
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<FormPartida />} />
                </Routes>
            </MemoryRouter>
        );

        const nombrePartidaInput = getByPlaceholderText('Nombre de la partida');
        const minJugadoresInput = getByPlaceholderText('Minimo de jugadores');
        const maxJugadoresInput = getByPlaceholderText('Maximo de jugadores');
        const createPartidaButton = getByText('Crear partida');

        fireEvent.change(nombrePartidaInput, { target: { value: 'TestPartida' } });
        fireEvent.change(minJugadoresInput, { target: { value: '2' } });
        fireEvent.change(maxJugadoresInput, { target: { value: '4' } });

        fireEvent.click(createPartidaButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8000/partida/crear',
                expect.objectContaining({
                    nombre: 'TestPartida',
                    id: undefined,
                    min: '2',
                    max: '4',
                })
                // Checkeo que el post se haga con los argumentos correctos
            );
        });
    }); // Tiene errores
     */
});
