import React from "react";
import { Paper, Typography } from "@mui/material";
import RButton from "../Button/index.jsx";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const EndGameBanner = ({ winners, reason }) => {
  const navigate = useNavigate();
  const player_name = sessionStorage.getItem("player_name");

  const bannerStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  };

  const overlayStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: "999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const list = {
    fontSize: "1.2rem",
    marginRight: "1rem",
    padding: "0",
  };

  const container = {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "10px",
  };

  return (
    <div style={overlayStyles}>
      <Paper style={bannerStyles}>
        <Typography
          variant="h2"
          component="div"
          style={{ textAlign: "center" }}
        >
          ¡Fin de partida!
        </Typography>
        <div style={container}>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            {reason}
          </Typography>
          {winners.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderTop: "0.6px solid grey",
                paddingTop: "1rem",
              }}
            >
              <Typography variant="h6">Ganadores:</Typography>
              <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
                {winners.map((winner, index) => (
                  <li style={list} key={index}>
                    {winner}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "3rem",
          }}
        >
          <RButton
            text="Volver a inicio"
            action={() => {
              navigate(`/mainpage/${player_name}`);
            }}
            icon={<ExitToAppIcon />}
          />
        </div>
      </Paper>
    </div>
  );
};

export default EndGameBanner;
