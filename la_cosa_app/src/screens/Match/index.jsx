import { useMatchC } from './matchContext';
import { useParams } from "react-router-dom";
import { Grid, Box, Paper } from '@mui/material';
import React from 'react';
import SnackBar from '../../components/SnackBar';
import PlayersHand from "../../components/PlayersHand/";
import ButtonsBox from "../../components/ButtonsBox/index.jsx";
import EndGameBanner from "../../components/EndGameBanner";
import Notifications from "../../components/Notifications";
import PlayerRound from "../../components/PlayerRound/index";
import { handle_socket_messages } from '../../utils/api';
import ShowHandBanner from '../../components/ShowHandBanner';
import RoleSign from "../../components/RoleSign/index.jsx";

const Match = () => {
  // States
  const { state, actions } = useMatchC();

  handle_socket_messages();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    actions.setOpen(false);
  };

  return (
    <Grid container sx={{ minHeight: '95vh', overflow: 'auto', backgroundColor: '#fafffa' }}>

      {/* First half */}
      {/* TODO: probar */}
      {state.isDeadPlayer && <h1>Has muerto...</h1>}
      {!state.isDeadPlayer &&
        <Grid xs={8} sx={{ display: 'flex', flexDirection: 'column'}}>
          <PlayerRound>
            <RoleSign/>
          </PlayerRound>

          <Paper sx={{ display: 'flex', flexDirection: 'row' , marginTop : '1rem'}} >
            <PlayersHand cartas={state.hand}/>
            <ButtonsBox />
          </Paper>
        </Grid>}
      {/* Second half */}
      <Grid xs={4} sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Notifications messages={state.avisos} />
        </Box>
        <Box sx={{ width: '95%', height: '45%' , border: '1px solid grey', marginTop: '1rem',borderRadius: '3%',
        }}>
          chat
        </Box>
      </Grid>
      {(state.turnState === 3) && <EndGameBanner reason={state.reason} winners={state.winners} />}
      <SnackBar open={state.open} handleClose={handleClose} severity={state.severity} body={state.body} />
      {state.reveal && <ShowHandBanner />}
    </Grid>
  );
};


export default Match;