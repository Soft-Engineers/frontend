import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import { MatchProvider } from '../../src/screens/Match/matchContext'
import Chat from "../../src/components/Chat/index.jsx";
import { BrowserRouter as Router } from 'react-router-dom';
import { getMessages, sendMessage } from "../../src/utils/api.js";
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMatch } from '../../src/screens/Match/matchContext';

// Mock para las funciones y APIs que se utilizan en el componente
jest.mock('../../src/utils/api.js', () => ({
  getMessages: jest.fn(() => Promise.resolve({ data: { messages: [] } })),
  sendMessage: jest.fn(() => Promise.resolve(true)),
}));

// Mock para useParams y useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    match_name: 'test-match',
    player_name: 'test-player'
  }),
  useNavigate: () => jest.fn()
}));

// Mock para WebSocket
const mockSocket = {
    send: jest.fn(),
};

const renderChatWithProvider = (socket) => {
    return render(
        <MatchProvider>
            <Chat socket={socket} />
        </MatchProvider>
    );
};


afterEach(() => {
    jest.clearAllMocks();
});

describe('<Chat />', () => {
    test('renders correctly', async () => {
        renderChatWithProvider(mockSocket);

        // Espera a que ciertos elementos estén en el documento
        await waitFor(() => {
        expect(screen.getByLabelText('Escribe un mensaje')).toBeInTheDocument();
        });
        const input = screen.getByLabelText('Escribe un mensaje');

        await userEvent.type(input, 'test message');
        await userEvent.type(input, '{enter}');
    });
    it("should allow users to type and send a message", () => {
        renderChatWithProvider(mockSocket);

        // Simula la entrada de texto y el evento de envío
        fireEvent.change(screen.getByLabelText("Escribe un mensaje"), {
            target: { value: "Hello World" },
        });
        fireEvent.keyDown(screen.getByLabelText("Escribe un mensaje"), {
            key: "Enter",
            code: "Enter",
        });

        // Verifica si el socket.send ha sido llamado
        expect(mockSocket.send).toHaveBeenCalled();

    });

    beforeEach(() => {
        jest.clearAllMocks(); // Restablece todas las implementaciones de mock
    });


    it("should not send empty messages", () => {
        renderChatWithProvider(mockSocket);

        // Intenta enviar un mensaje vacío
        fireEvent.change(screen.getByLabelText("Escribe un mensaje"), {
            target: { value: "   " }, // Solo espacios
        });
        fireEvent.keyDown(screen.getByLabelText("Escribe un mensaje"), {
            key: "Enter",
            code: "Enter",
        });

        // Verifica que socket.send no haya sido llamado
        expect(mockSocket.send).not.toHaveBeenCalled();
    });
} );
