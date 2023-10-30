import React from 'react';
import { createContext, useContext, useState } from 'react';

const MatchContext = createContext();

export const useMatchC = () => {
    return useContext(MatchContext);
};

export const turnStates = {
    DRAW_CARD: 1,
    PLAY_TURN: 2,
    FINISHED: 3,
    EXCHANGE: 4,
    WAIT_EXCHANGE: 5,
    WAIT_DEFENSE: 6,
    PANIC: 7,
};


export const MatchProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [jugadores, setJugadores] = useState([]);
    const [currentTurn, setCurrentTurn] = useState('');
    const [hand, setHand] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [body, setBody] = useState('');
    const [avisos, setAvisos] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [winners, setWinners] = useState([]);
    const [reason, setReason] = useState('');
    const [target_name, setTargetName] = useState('');
    const [isDeadPlayer, setIsDeadPlayer] = useState(false);
    const [deadPlayerNames, setDeadPlayerNames] = useState('');
    const [revealCard, setRevealCard] = useState(false);
    const [reveal, setReveal] = useState(false);
    const [role, setRole] = useState('');
    const [turnState, setTurnState] = useState(null);
    const [isTurn, setIsTurn] = useState(false);
    const [DtimeoutEnded, setDTimeoutEnded] = useState(false);

    const state = {
        socket,
        jugadores,
        currentTurn,
        hand,
        selectedCard,
        open,
        severity,
        body,
        avisos,
        isFinished,
        winners,
        reason,
        target_name,
        isDeadPlayer,
        deadPlayerNames,
        reveal,
        revealCard,
        role,
        turnState,
        isTurn,
        DtimeoutEnded,
    };

    const actions = {
        setSocket,
        setJugadores,
        setHand,
        setSelectedCard,
        setOpen,
        setSeverity,
        setBody,
        setAvisos,
        setIsFinished,
        setWinners,
        setReason,
        setTargetName,
        setIsDeadPlayer,
        setDeadPlayerNames,
        setCurrentTurn,
        setRevealCard,
        setReveal,
        setRole,
        setTurnState,
        setIsTurn,
        setDTimeoutEnded,
    };

    return (
        <MatchContext.Provider value={{ state, actions }}>
            {children}
        </MatchContext.Provider>
    );
};
