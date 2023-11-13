import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { mapaCartas } from "../Carta";
import LinearProgress from "@mui/material/LinearProgress";
import CloseIcon from "@mui/icons-material/Close";
import { useMatchC } from "../../screens/Match/matchContext";
import IconButton from "@mui/material/IconButton";

const ShowHandBanner = () => {
  const { state, actions } = useMatchC();
  const hand = state.revealCard.cards;
  const player = state.revealCard.cards_owner;
  const trigger_card = state.revealCard.trigger_card;
  const timestamp = state.revealCard.timestamp;

  const timeoutDuration = 10000;
  const [timeoutRemaining, setTimeoutRemaining] = useState(timeoutDuration);

  useEffect(() => {
    let timeoutId;

    if (timestamp && timeoutRemaining > 0) {
      const currentTime = new Date().getTime();
      const defenseTimestamp = timestamp * 1000;
      const remainingTime = timeoutDuration - (currentTime - defenseTimestamp); // Calculo el tiempo restante

      if (remainingTime <= 0) {
        actions.setReveal(false);
      } else {
        timeoutId = setInterval(() => {
          setTimeoutRemaining(remainingTime);
        }, 100);
      }
    } else {
      clearInterval(timeoutId);
    }

    return () => {
      clearInterval(timeoutId);
    };
  }, [timestamp, timeoutRemaining]);

  const handleCloseBanner = () => {
    // Handler para cerrar el banner
    actions.setReveal(false);
  };

  const bannerStyles = {
    position: "absolute",
    top: "36%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    flexDirection: "column",
    minWidth: hand.length === 1 ? "15%" : "60%",
    width: hand.length === 1 ? "20%" : "60%",
  };

  const overlayStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: "999",
  };

  return (
    <div>
      <div style={overlayStyles}>
        <Paper style={bannerStyles} data-testid="banner">
          <Typography
            variant="h5"
            component="div"
            style={{ borderBottom: "2px solid black" }}
          >
            Efecto {trigger_card}
          </Typography>
          <Typography variant="h6" component="div" sx={{ marginTop: "10px" }}>
            {`Esta es ${
              trigger_card === "Sospecha" ? "una carta" : "la mano"
            } de ${player}`}
          </Typography>
          <IconButton
            onClick={handleCloseBanner}
            variant="sharp"
            sx={{ position: "absolute", top: "0", right: "0", color: "black" }}
            data-testid="close-button"
          >
            <CloseIcon />
          </IconButton>
          <Stack
            direction="row"
            sx={{
              justifyContent: "center",
              marginTop: "10px",
              marginLeft: hand.length === 1 ? "25px" : "0px",
              width: hand.length === 1 ? "80%" : "100%",
            }}
          >
            {hand.map((carta, index) => (
              <div key={index}>
                <img
                  src={mapaCartas[carta]}
                  alt={carta}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            ))}
          </Stack>
          <Box sx={{ marginTop: "10px" }}>
            <LinearProgress
              variant="determinate"
              value={(timeoutRemaining / timeoutDuration) * 100}
              sx={{ height: 10 }}
            />
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default ShowHandBanner;
