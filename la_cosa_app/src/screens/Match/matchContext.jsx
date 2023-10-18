import { createContext, useContext, useState } from 'react';

// Crear el contexto
const MatchContext = createContext();

export const useMatchC = () => {
    return useContext(MatchContext);
};

export const MatchProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [jugadores, setJugadores] = useState([]);
    const [isTurn, setIsTurn] = useState(false);
    const [hand, setHand] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [body, setBody] = useState('');
    const [avisos, setAvisos] = useState([]);
    const [endGame, setEndGame] = useState(false);
    const [winners, setWinners] = useState([]);
    const [reason, setReason] = useState('');
    const [target_name, setTargetName] = useState('');
    const [isDeadPlayer, setIsDeadPlayer] = useState(false);
    const [deadPlayerNames, setDeadPlayerNames] = useState('');
    const [currentTurn, setCurrentTurn] = useState('');



    const state = {
        socket,
        jugadores,
        isTurn,
        hand,
        selectedCard,
        open,
        severity,
        body,
        avisos,
        endGame,
        winners,
        reason,
        target_name,
        isDeadPlayer,
        deadPlayerNames,
        currentTurn
    };

    const actions = {
        setSocket,
        setJugadores,
        setIsTurn,
        setHand,
        setSelectedCard,
        setOpen,
        setSeverity,
        setBody,
        setAvisos,
        setEndGame,
        setWinners,
        setReason,
        setTargetName,
        setIsDeadPlayer,
        setDeadPlayerNames,
        setCurrentTurn,
    };

    return (
        <MatchContext.Provider value={{ state, actions }}>
            {children}
        </MatchContext.Provider>
    );
};
