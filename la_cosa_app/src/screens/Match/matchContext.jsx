import React from "react";
import { createContext, useContext, useState } from "react";

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
  VUELTA_Y_VUELTA: 8,
  REVELACIONES: 9,
  DISCARD: 10,
};

export const MatchProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [posiciones, setPosiciones] = useState([]);
  const [currentTurn, setCurrentTurn] = useState("");
  const [hand, setHand] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [body, setBody] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [waitMessage, setWaitMessage] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [winners, setWinners] = useState([]);
  const [reason, setReason] = useState("");
  const [target_name, setTargetName] = useState("");
  const [isDeadPlayer, setIsDeadPlayer] = useState(false);
  const [deadPlayerNames, setDeadPlayerNames] = useState("");
  const [revealCard, setRevealCard] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [role, setRole] = useState("");
  const [turnState, setTurnState] = useState(null);
  const [isTurn, setIsTurn] = useState(false);
  const [defenseTimestamp, setDefenseTimestamp] = useState(0);
  const [defenseTimeoutEnded, setDefenseTimeoutEnded] = useState(false);
  const [isClockwise, setIsClockwise] = useState(false);
  const [Obstacles, setObstacles] = useState([]);
  const [Cuarentena, setCuarentena] = useState(null);
  const [alreadySelected, setAlreadySelected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [logs, setLogs] = useState([]);
  const [targetDoor, setTargetDoor] = useState(null);
  const [inspect, setInspect] = useState(false);

  const state = {
    socket,
    posiciones,
    currentTurn,
    hand,
    selectedCard,
    open,
    severity,
    body,
    waitMessage,
    notifications,
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
    defenseTimestamp,
    defenseTimeoutEnded,
    isClockwise,
    Obstacles,
    Cuarentena,
    messages,
    chatHistory,
    logs,
    alreadySelected,
    targetDoor,
    inspect,
  };

  const actions = {
    setSocket,
    setPosiciones,
    setHand,
    setSelectedCard,
    setOpen,
    setSeverity,
    setBody,
    setWaitMessage,
    setNotifications,
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
    setDefenseTimestamp,
    setDefenseTimeoutEnded,
    setIsClockwise,
    setObstacles,
    setCuarentena,
    setMessages,
    setChatHistory,
    setLogs,
    setAlreadySelected,
    setTargetDoor,
    setInspect,
  };

  return (
    <MatchContext.Provider value={{ state, actions }}>
      {children}
    </MatchContext.Provider>
  );
};
