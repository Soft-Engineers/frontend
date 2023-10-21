import { createContext, useContext, useState } from 'react';

const MatchContext = createContext();

export const useMatchC = () => {
    return useContext(MatchContext);
};

export const roles = {
    HUMAN: 'HUMANO',
    LA_COSA: 'LA COSA',
    INFECTADO: 'INFECTADO',
};

export const turnStates = {
    OUT_OF_TURN: 0,
    PLAY_TURN: 1,
    DEFENSE: 2,
    EXCHANGE: 3,
    EXCHANGE_WAIT: 4,
};


export const MatchProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [jugadores, setJugadores] = useState([]);
    const [isTurn, setIsTurn] = useState(false);
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
    const [role, setRole] = useState(null);
    const [turnState, setTurnState] = useState(turnStates.OUT_OF_TURN);


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
    };

    return (
        <MatchContext.Provider value={{ state, actions }}>
            {children}
        </MatchContext.Provider>
    );
};
