import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Lobby from '../../src/screens/Lobby'
import { BrowserRouter as Router } from 'react-router-dom';
import { MatchProvider } from '../../src/screens/Match/matchContext'
import {isHost, leaveLobby, startMatch} from "../../src/utils/api.js";
import FormPartida from "../../src/components/FormPartida/index.jsx";

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
  // Testear las lineas  src/screens/Lobby          |   47.29 |    15.38 |   53.33 |   47.29 |
  //   index.jsx                 |   47.29 |    15.38 |   53.33 |   47.29 | 73,77-113,120,144-150,159-165,170-173,195 del lobby
  test ('leave lobby', async () => {
    render(
      <Router>
        <MatchProvider>
          <Lobby />
        </MatchProvider>
      </Router>
    );
    const leaveButton = screen.getByText('Abandonar Sala');
    leaveButton.click();
    await waitFor(() => {
      expect(leaveLobby).toHaveBeenCalledTimes(1);
    });
  } );
    test ('start match', async () => {
        render(
        <Router>
            <MatchProvider>
            <FormPartida/>
            <Lobby />
            </MatchProvider>
        </Router>
        );
        const createButton = screen.getByText('Crear partida');
        createButton.click();
        await waitFor(() => {
        expect(isHost).toHaveBeenCalled();
        }
        );

        if (isHost) {
        const startButton = screen.getByText('Iniciar Partida');
        startButton.click();
        await waitFor(() => {
        expect(startMatch).toHaveBeenCalledTimes(1);
        }
        );
        }
        } );
    test ('not start match', async () => {
render(
        <Router>
            <MatchProvider>
            <FormPartida/>
            <Lobby />
            </MatchProvider>
        </Router>
        );
        const createButton = screen.getByText('Crear partida');
        createButton.click();
        await waitFor(() => {
        expect(isHost).toHaveBeenCalled();
        }
        );

        if (!isHost) {
        const startButton = screen.getByText('Iniciar Partida');
        startButton.click();
        await waitFor(() => {
        expect(startMatch).toHaveBeenCalledTimes(0);
        expect(screen.getByText('Cantidad insuficiente de jugadores')).toBeInTheDocument();
        }
        );
    }
    } );
} );
