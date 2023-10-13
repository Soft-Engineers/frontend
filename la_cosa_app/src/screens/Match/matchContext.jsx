import React, { createContext, useContext, useState } from 'react';

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
    const [deadPlayer, setDeadPlayer] = useState(false);
    const [target_name, setTargetName] = useState('');

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
        deadPlayer,
        target_name,
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
        setDeadPlayer,
        setTargetName,
    };

    return (
        <MatchContext.Provider value={{ state, actions }}>
            {children}
        </MatchContext.Provider>
    );
};
