import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Lobby from '../../src/screens/Lobby'
import { BrowserRouter as Router } from 'react-router-dom';
import { MatchProvider } from '../../src/screens/Match/matchContext'

// Mock para las funciones y APIs que se utilizan en el componente
jest.mock('../../src/utils/api.js', () => ({
  isHost: jest.fn(() => Promise.resolve({ data: { is_host: true } })),
  startMatch: jest.fn(() => Promise.resolve(true)),
  leaveLobby: jest.fn(() => Promise.resolve(true)),
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
global.WebSocket = jest.fn();

describe('<Lobby />', () => {
  beforeEach(() => {
    WebSocket.mockClear();
  });

  test('renders correctly', async () => {
    render(
      <Router>
        <MatchProvider>
          <Lobby />
        </MatchProvider>
      </Router>
    );

    // Espera a que ciertos elementos estén en el documento
    await waitFor(() => {
      expect(screen.getByText('Esperando que el host inicie la partida...')).toBeInTheDocument();
      expect(screen.getByText('Abandonar Sala')).toBeInTheDocument();
    });

    // Puedes agregar más aserciones para verificar que los componentes se renderizan correctamente
  });

  // Aquí puedes añadir más tests, por ejemplo, para probar interacciones del usuario o cambios de estado
});
