import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const styles = {
  paper: {
    padding: "10px",
    margin: "10px",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafffa",
    opacity: '0.8',
  },
  box: {
    maxHeight: "100%",
    minHeight: "100%",
    height: "100%",
    overflow: "auto",
    width: "100%",
  },
};

function PlayersList({ jugadores }) {
  const player = sessionStorage.getItem("player_name");

  return (
    <Box sx={styles.box}>
      <List>
        {jugadores &&
          jugadores.map((jugador, index) => (
            <ListItem key={index}>
              <Paper
                sx={{
                  ...styles.paper,
                  backgroundColor:
                    jugador === player
                      ? "lightblue"
                      : styles.paper.backgroundColor,
                }}
                elevation={3}
              >
                <Typography variant="h6">{jugador}</Typography>
              </Paper>
            </ListItem>
          ))}
      </List>
    </Box>
  );
}

export default PlayersList;
