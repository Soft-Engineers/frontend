import React from 'react';
import '@testing-library/jest-dom';
import {render, fireEvent, waitFor, waitForElementToBeRemoved,} from '@testing-library/react';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SelectName from '../../src/screens/SelectName/index.jsx';
import Main from '../../src/screens/MainPage/index.jsx';
import axios from 'axios';

jest.mock('axios');
beforeEach(() => {
    jest.clearAllMocks();
});
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(), // Mock de useNavigate
}));

describe('FormUser', () => {

    it('Renderiza sin errores', () => {
        const { getByText, getByPlaceholderText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<SelectName />} />
                    <Route path="/mainpage/:user_name" element={<Main />} />
                </Routes>
            </MemoryRouter>
        );

        expect(getByText('Elija un nombre!')).toBeInTheDocument();
        expect(getByPlaceholderText('Ingrese su nombre aquí')).toBeInTheDocument();
        expect(getByText('Crear usuario')).toBeInTheDocument();
        // Checkeo que ciertos elementos se renderizen correctamente
    });

    it('Envio exitoso', async () => {

        axios.post.mockResolvedValueOnce({
            status: 200,
            data: 'success',
        });

        const navigateMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock);

        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<SelectName />} />
                    <Route path="/mainpage/:user_name" element={<Main />} />
                </Routes>
            </MemoryRouter>
        );

        const input = getByPlaceholderText('Ingrese su nombre aquí');
        fireEvent.change(input, { target: { value: 'Juanito' } });
        fireEvent.click(getByText('Crear usuario'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'http://localhost:8000/player/create',
                expect.any(FormData) // Checkeo que el post se haga con los argumentos correctos
            );

            expect(navigateMock).toHaveBeenCalledWith('/mainpage/Juanito'); // Si el envio fue exitoso se pasa a la pagina principal
        });
    });

    it('Caso: Invalid fields', async () => {

        const navigateMock = jest.fn();
        useNavigate.mockReturnValue(navigateMock);

        axios.post.mockRejectedValueOnce({
            response: {
                data: {
                    detail: 'Invalid fields',
                },
            },
        });

        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<SelectName />} />
                    <Route path="/mainpage/:user_name" element={<Main />} />
                </Routes>
            </MemoryRouter>
        );

        const input = getByPlaceholderText('Ingrese su nombre aquí');
        fireEvent.change(input, { target: { value: 'bd' } });
        fireEvent.click(getByText('Crear usuario'));

        await waitFor(() => {
            expect(navigateMock).not.toHaveBeenCalled(); // En caso de error no se llama la funcion navigate
            expect(getByText('Invalid fields')).toBeInTheDocument();
        });

        //Testeo si hago click en cualquier lado se cierra el mensaje de error y si hago click en el mensaje no se cierra
        fireEvent.click(getByText('Invalid fields'))
        expect(getByText('Invalid fields')).toBeInTheDocument();
        fireEvent.click(document)
        await waitForElementToBeRemoved(() => getByText('Invalid fields'));
    });

    it('Caso: Input vacio', async () => {

        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<SelectName />} />
                    <Route path="/mainpage/:user_name" element={<Main />} />
                </Routes>
            </MemoryRouter>
        );

        const input = getByPlaceholderText('Ingrese su nombre aquí');
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.click(getByText('Crear usuario'));

        await waitFor(() => {
            expect(axios.post).not.toHaveBeenCalled();
        });
    });

});
