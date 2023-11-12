import React, { useEffect, useState, useRef } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { List, tooltipClasses } from "@mui/material";
import { useMatchC, turnStates } from "../../screens/Match/matchContext.jsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import ExpandLessSharpIcon from "@mui/icons-material/ExpandLessSharp";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { mapaCartas, typeCard } from "../Carta/index.jsx";
import { styled } from "@mui/system";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
  },
}));

const BoxStyle = {
  display: "flex",
  flexDirection: "column",
  maxHeight: "100%",
  overflow: "hidden",
  marginLeft: "20px",
  marginBottom: "16.1px",
  border: "1px solid grey",
  borderRadius: "10px",
};

const buttonStyle = {
  position: "absolute",
  top: "10px",
  right: "15px",
};

const Notifications = () => {
  const { state, actions } = useMatchC();
  const [notificationsList, setNotificationsList] = useState([]);
  const [minimized, setMinimized] = useState();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [selectedTooltip, setSelectedTooltip] = useState(null);
  const tooltipContainerRef = useRef(null);

  useEffect(() => {
    actions.setLogs([]);
    setNotificationsList([]);
  }, []);

  useEffect(() => {
    if (state.logs.length > 0 && state.notifications.length === 0) {
      setNotificationsList([...state.logs.reverse()]);
    }
  }, [state.logs]);

  useEffect(() => {
    setNotificationsList((prevNotifications) => {
      return [...state.notifications, ...prevNotifications];
    });
  }, [state.notifications]);

  const handleTooltipClick = (index) => {
    setSelectedTooltip(index);
    setTooltipOpen(!tooltipOpen);
  };

  const closeTooltip = () => {
    setTooltipOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipContainerRef.current) {
        closeTooltip();
      }
    };

    const handleWheel = () => {
      closeTooltip();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("wheel", handleWheel); // Use wheel event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("wheel", handleWheel); // Remove wheel event listener on cleanup
    };
  }, [tooltipContainerRef, tooltipOpen]);

  const renderNotificationWithTooltips = (notification, index) => {
    const isInfected = notification.includes("LA COSA TE INFECTÓ!!");
    const notificationStyle = {
      color: isInfected ? "red" : "black",
      overflow: "hidden",
    };

    const typeColors = {
      normal: "black",
      action: "#9ecb60",
      defense: "#039fe9",
      obstacle: "#ffde19",
      panic: "#fd62aa",
    };

    const renderTextWithTooltips = (text) => {
      const cartaKeys = Object.keys(mapaCartas);
      let regexPattern = cartaKeys
        .map((key) => `(${escapeRegExp(key)})`)
        .join("|");
      regexPattern = new RegExp(regexPattern, "g");

      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }

      const words = text.split(regexPattern).filter(Boolean);

      return words.map((word, i) => {
        const type = determineNotificationType(word);
        const hasTooltip = type !== "normal";

        if (hasTooltip) {
          const tooltipContent = mapaCartas[word] ? (
            <img
              src={mapaCartas[word]}
              alt={`Tooltip for ${type}`}
              style={{ width: "70%", height: "80%" }}
            />
          ) : null;

          return (
            <React.Fragment key={i}>
              <CustomTooltip
                title={tooltipContent}
                open={tooltipOpen && selectedTooltip === index}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                placement="left"
                PopperProps={{
                  container: tooltipContainerRef.current,
                }}
              >
                <span>
                  <span
                    style={{
                      color: typeColors[type],
                      padding: "2px",
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleTooltipClick(index)}
                  >
                    {word}
                  </span>
                </span>
              </CustomTooltip>
            </React.Fragment>
          );
        }

        return <span key={i}>{word} </span>;
      });
    };

    return (
      <ListItem
        key={index}
        style={{ borderTop: index === 0 ? "none" : "1px dashed black" }}
      >
        <ListItemText
          primary={renderTextWithTooltips(notification)}
          style={notificationStyle}
        />
      </ListItem>
    );
  };

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  const determineNotificationType = (word) => {
    const cardTypes = Object.keys(typeCard);

    for (const type of cardTypes) {
      const cardsInType = typeCard[type];
      if (cardsInType.some((cardName) => word.includes(cardName))) {
        return type;
      }
    }

    return "normal";
  };

  return (
    <Box style={BoxStyle} data-testid="notifications">
      <ListItem
        sx={{
          flexDirection: "column",
          alignItems: "center",
          borderBottom: "0.1px solid grey",
        }}
      >
        <ListItemText
          primary={
            <Typography variant="h5" style={{ color: "green" }}>
              {`Es ${state.isTurn ? "tu turno" : "el turno de " + state.currentTurn
                }`}
            </Typography>
          }
        />
        {state.isTurn && (
          <Typography
            variant="h6"
            style={{ color: "#3968B1", marginTop: "12px" }}
          >
            {state.turnState === turnStates.WAIT_DEFENSE
              ? "Te estas defendiendo"
              : state.turnState === turnStates.WAIT_EXCHANGE ||
                state.turnState === turnStates.EXCHANGE
                ? "Tenés que intercambiar una carta"
                : state.turnState === turnStates.DRAW_CARD
                  ? "Tenés que robar una carta"
                  : state.turnState === turnStates.PLAY_TURN
                    ? "Tenés que jugar o descartar una carta"
                    : state.turnState === turnStates.PANIC
                      ? "Tenés que jugar la carta de pánico"
                      : state.turnState === turnStates.VUELTA_Y_VUELTA &&
                        !state.alreadySelected
                        ? "Tenés que intercambiar con el siguiente"
                        : state.turnState === turnStates.VUELTA_Y_VUELTA &&
                          state.alreadySelected
                          ? 'Esperando el efecto "Vuelta y vuelta"'
                          : state.turnState === turnStates.REVELACIONES
                            ? "Elegí si revelar o no las cartas de tu mano"
                            : state.turnState === turnStates.DISCARD
                              ? "Tenés que descartar"
                              : null}
          </Typography>
        )}
        {!state.isTurn && (
          <Typography
            variant="h6"
            style={{ color: "#3968B1", marginTop: "12px" }}
          >
            {(state.turnState === turnStates.WAIT_EXCHANGE ||
              state.turnState === turnStates.WAIT_DEFENSE ||
              state.turnState === turnStates.VUELTA_Y_VUELTA ||
              state.turnState === turnStates.REVELACIONES) &&
              state.waitMessage !== ""
              ? state.waitMessage
              : state.turnState === turnStates.WAIT_EXCHANGE
                ? "Esperando intercambio"
                : state.turnState === turnStates.WAIT_DEFENSE
                  ? "Esperando defensa"
                  : state.turnState === turnStates.VUELTA_Y_VUELTA &&
                    !state.alreadySelected
                    ? "Tenés que intercambiar con el siguiente"
                    : state.turnState === turnStates.VUELTA_Y_VUELTA
                      ? 'Esperando el efecto "Vuelta y vuelta"'
                      : state.turnState === turnStates.REVELACIONES
                        ? 'Esperando el efecto "Revelaciones"'
                        : state.turnState === turnStates.DISCARD
                          ? "Esperando que " + state.currentTurn + " descarte"
                          : "Esperando tu turno..."}
          </Typography>
        )}
      </ListItem>
      <IconButton variant="sharp" onClick={toggleMinimized} style={buttonStyle}>
        {minimized ? <ExpandMoreSharpIcon /> : <ExpandLessSharpIcon />}
      </IconButton>
      {!minimized && notificationsList.length !== 0 && (
        <div
          style={{
            maxHeight: "100%",
            overflowY: "auto",
            display: minimized ? "none" : "block",
            resize: "vertical",
            scrollbarColor: "gray white",
          }}
        >
          <List>
            {notificationsList.map((notification, index) =>
              renderNotificationWithTooltips(notification, index),
            )}
          </List>
        </div>
      )}
    </Box>
  );
};

export default Notifications;
