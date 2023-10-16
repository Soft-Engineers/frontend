import { useMatchC } from './matchContext';
import { useParams } from "react-router-dom";
import {Grid, Box, Paper} from '@mui/material';
import React, { useEffect } from 'react';
import SnackBar from '../../components/SnackBar';
import PlayersHand from "../../components/PlayersHand/";
import ButtonsBox from "../../components/ButtonsBox/index.jsx";
import EndGameBanner from "../../components/EndGameBanner";
import Notifications from "../../components/Notifications";
import PlayerRound from "../../components/PlayerRound/index";
import { handle_socket_messages } from '../../utils/api';

const Match = () => {
  // States
  const { state, actions } = useMatchC();

  const { match_name } = useParams();
  const player_name = sessionStorage.getItem('player_name');

  handle_socket_messages();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    actions.setOpen(false);
  };

  return (
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* First half */}
        {/* TODO: probar */}
        {state.deadPlayer && <h1>Has muerto...</h1>}
        {!state.deadPlayer &&
            <Grid xs={8} sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', border: '2px solid black' }}>
              <Box>
                <PlayerRound/>
              </Box>
              <Paper sx={{ width: '100%', display: 'flex', flexDirection: 'row'}} elevation={10}>
                <PlayersHand cartas={state.hand} onSelectCard={actions.setSelectedCard} />
                <ButtonsBox/>
              </Paper>
            </Grid>}
        {/* Second half */}
        <Grid xs={4} sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px solid black' }}>
          <Box sx={{ border: '2px solid red', width: '100%', height: '50%', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Notifications messages={state.avisos} />
          </Box>
          <Box sx={{ width: '100%', height: '50%' }}>
            chat
          </Box>
        </Grid>
        {state.endGame && <EndGameBanner reason={state.reason} winners={state.winners} />}
        <SnackBar open={state.open} handleClose={handleClose} severity={state.severity} body={state.body} />
      </Grid>
  );
};


export default Match;