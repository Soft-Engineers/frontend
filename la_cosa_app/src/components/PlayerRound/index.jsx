import Deck from '../../components/Deck/';
import { useMatchC } from '../../screens/Match/matchContext.jsx';
import RoleSign from "../RoleSign/index.jsx";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import quarantineIcon from "../../assets/quarantine.png";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

const DoorBtPlayers = ({ angle, radiusX, radiusY, index }) => {
  const { state, actions } = useMatchC();
  const offset = Math.PI * 0.5;
  const x = (radiusX - 30) * Math.cos(angle + offset);
  const y = (radiusY - 30) * Math.sin(angle + offset);

  const handleDoorClick = (event) => {
    console.log(state.targetDoor);
    console.log(index);
    const id = event.currentTarget.id;
    console.log(id);
    if (
      state.isTurn === true &&
      state.turnState === 2 &&
      state.targetDoor !== id
    ) {
      actions.setTargetDoor(id);
      actions.setTargetName(null);
    } else {
      actions.setTargetDoor(null);
    }
  };

  useEffect(() => {
    actions.setTargetDoor(null); // Cuando cambia el turno, se resetea el target
  }, [state.currentTurn]);

  const lineStyle = {
    width: "10px",
    height: "120px",
    backgroundColor: "#8b4513",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: `rotate(${angle}rad)`,
    border:
      state.isTurn == false || state.targetDoor != index || state.turnState != 2
        ? "0.1px solid black"
        : "2px solid red",
  };

  const doorStyle = {
    position: "absolute",
    transform: `translate(${x}px, ${y}px)`,
    cursor:
      state.isTurn === true && state.turnState === 2 ? "pointer" : "default",
  };

  const nailStyle1 = {
    width: "6px",
    height: "6px",
    backgroundColor: "grey",
    borderRadius: "50%",
    position: "absolute",
    transform: "translate(0, 33px)",
  };

  const nailStyle2 = {
    width: "6px",
    height: "6px",
    backgroundColor: "grey",
    borderRadius: "50%",
    position: "absolute",
    transform: "translate(0, -33px)",
  };

  return (
    <div onClick={handleDoorClick} style={doorStyle} id={index} data-testid="player-cards">
      <div style={lineStyle}>
        <div style={nailStyle1} /> {/* Left nail */}
        <div style={nailStyle2} /> {/* Right nail */}
      </div>
    </div>
  );
};

const PlayerCard = ({ player, angle, radiusX, radiusY, isCurrentPlayer }) => {
  const { state, actions } = useMatchC();
  const x = radiusX * Math.cos(angle);
  const y = radiusY * Math.sin(angle);
  const Cuarentena = state.Cuarentena;
  const currPlayer = player.player_name;
  const inCuarentena = Cuarentena && Cuarentena[currPlayer] > 0;
  const isThisPlayerDead = state.deadPlayerNames.includes(player.player_name);

  const circleStyle = {
    width: "60px",
    height: "60px",
    border:
      state.target_name === player.player_name &&
        !isThisPlayerDead &&
        (state.turnState === 2 || state.turnState === 7)
        ? "2px solid red"
        : "2px solid transparent",
    backgroundColor: isThisPlayerDead
      ? "red"
      : state.currentTurn === player.player_name
        ? "green"
        : "#3498db",
    margin: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    boxShadow: isCurrentPlayer
      ? "0 0 0px 3px black"
      : "0 0 0px 4px transparent",
  };

  const cardStyle = {
    position: "absolute",
    transform: `translate(${x}px, ${y}px)`,
    cursor: isThisPlayerDead
      ? "not-allowed"
      : (state.turnState === 2 || state.turnState === 7) &&
        state.isTurn === true
        ? "pointer"
        : "default",
    borderRadius: "50%",
  };

  const nameStyle = {
    textDecoration: isThisPlayerDead ? "line-through" : "none",
    position: "absolute",
    textAlign: "center",
    fontWeight: isCurrentPlayer ? "bold" : "normal",
  };

  const cuarentenaStyle = {
    box: {
      position: "absolute",
      width: "70%",
      height: "65px",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      border: "1px solid black",
      boxShadow: "0 0 0 5px yellow, 0 0 0 6px black",
      borderRadius: "35%",
    },
    desc: {
      textAlign: "center",
      fontWeight: "bolder",
      color: "black",
      border: "2px solid black",
      backgroundColor: "yellow",
      height: "20px",
      width: "80%",
      transform: "translate(10%, -100%)",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
    icon: {
      display: "flex",
      width: "40px",
      height: "40px",
      transform: "translate(0%, -70%)",
    },
  };

  const currPlayerStyle = {
    position: "absolute",
    width: "60px",
    height: "60px",
    transform: inCuarentena ? "translate( 0, -90px)" : "translate(0, -80px)",
    rotate: `${angle + 29.85}rad`,
    zIndex: "990",
  };

  useEffect(() => {
    actions.setTargetName(null); // Cuando cambia el turno, se resetea el target
  }, [state.currentTurn]);

  const handleClick = () => {
    if (
      (state.turnState === 2 || state.turnState === 7) &&
      !isThisPlayerDead &&
      state.isTurn === true &&
      state.target_name !== player.player_name
    ) {
      actions.setTargetName(player.player_name);
      actions.setTargetDoor(null);
    } else {
      actions.setTargetName(null);
    }
  };

  return (
    <div className="player-card" style={cardStyle} onClick={handleClick} data-testid="player-cards">
      <div style={{ display: "flex" }}>
        <div className="circle" style={circleStyle}>
          {inCuarentena && (
            <>
              <div style={cuarentenaStyle.box} />
              <img
                src={quarantineIcon}
                alt="Quarantine"
                style={cuarentenaStyle.icon}
              />
            </>
          )}
          <span className="player-name" style={nameStyle}>
            {player.player_name}
          </span>
          {isCurrentPlayer && (
            <KeyboardDoubleArrowDownIcon style={currPlayerStyle} />
          )}
        </div>
      </div>

      {inCuarentena && (
        <div style={cuarentenaStyle.desc}>{Cuarentena[currPlayer]} turnos</div>
      )}
    </div>
  );
};

const PlayerRound = () => {
  const { state, actions } = useMatchC();

  const currentPlayerName = sessionStorage.getItem("player_name");
  const currentPlayer = state.posiciones.find(
    (player) => player.player_name === currentPlayerName,
  );
  const totalPlayers = state.posiciones.length;
  const sortedPlayers = state.posiciones.sort(
    (a, b) => a.position - b.position,
  ); //state.posiciones;//
  const currentPlayerIndex = sortedPlayers.indexOf(currentPlayer);
  const sortedboolDoors = state.Obstacles.sort(
    (a, b) => a.position - b.position,
  ); //state.Obstacles;//
  const radiusX = 200;
  const radiusY = 170;
  const centerX = 0;
  const centerY = 0;

  const handleDrawCard = async () => {
    try {
      const request = { message_type: "robar carta", message_content: "" };
      state.socket.send(JSON.stringify(request));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleInspectMode = () => {
    actions.setInspect(!state.inspect);
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    border: "1px solid grey",
    borderRadius: "10px",
    backgroundColor: "#f2f2ff",
    position: "relative",
  };
  const roleSignStyle = {
    marginTop: "6px",
    height: "100%",
    width: "100%",
  };
  const iconsContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  };

  const rotationStyle = {
    display: "flex",
    fontSize: "large",
    marginRight: "1rem",
    width: "80px",
    height: "80px",
  };

  const zoomStyle = {
    marginTop: "1rem",
    marginLeft: "1rem",
    backgroundColor: "#515952",
    color: "white",
    "&:hover": {
      backgroundColor: "#2a2e2b",
    },
  };

  return (
    <Box sx={containerStyle} >
      <div style={roleSignStyle} data-testid="player-cards">
        <RoleSign />
      </div>

      <div
        data-testid="player-cards"
        className="deck"
        style={{
          position: "absolute",
          transform: `translate(${centerX}px, ${centerY}px)`,
        }}
      >
        <Deck onDrawCard={() => handleDrawCard()} />
      </div>

      {sortedPlayers.map((player, index) => (
        <React.Fragment key={index}>
          <PlayerCard
            data-testid="player-cards"
            player={player}
            angle={
              (2 *
                Math.PI *
                (totalPlayers - index + Math.max(1, (totalPlayers / 12) * 3))) /
              totalPlayers
            }
            radiusX={radiusX}
            radiusY={radiusY}
            isCurrentPlayer={player.player_name === currentPlayerName}
          />
          {sortedboolDoors[index] && (
            <DoorBtPlayers
              data-testid="player-cards"
              angle={
                (2 * Math.PI * (totalPlayers - index + 0.5 - 1)) / totalPlayers
              }
              radiusX={radiusX}
              radiusY={radiusY}
              array={sortedboolDoors}
              index={index}
            />
          )}
        </React.Fragment>
      ))}
      <div style={iconsContainerStyle}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SearchIcon />}
          onClick={toggleInspectMode}
          sx={zoomStyle}
        >
          {!state.inspect ? "Inspeccionar Cartas" : "Dejar de inspeccionar"}
        </Button>
        {state.isClockwise ? (
          <RotateRightIcon sx={rotationStyle} />
        ) : (
          <RotateLeftIcon sx={rotationStyle} />
        )}
      </div>
    </Box>
  );
};
export default PlayerRound;
