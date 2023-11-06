import { turnStates, useMatchC } from './matchContext';
import { Grid, Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SnackBar from '../../components/SnackBar';
import PlayersHand from "../../components/PlayersHand";
import ButtonsBox from "../../components/ButtonsBox";
import EndGameBanner from "../../components/EndGameBanner";
import Notifications from "../../components/Notifications";
import PlayerRound from "../../components/PlayerRound";
import { handle_socket_messages } from '../../utils/api';
import ShowHandBanner from '../../components/ShowHandBanner';
import RoleSign from "../../components/RoleSign";
import LinearProgress from "@mui/material/LinearProgress";
import Chat from "../../components/Chat";

const Match = () => {
  // States
  const { state, actions } = useMatchC();
  const timeoutDuration = 20000; // Set the timeout duration in milliseconds
  const [timeoutRemaining, setTimeoutRemaining] = useState(timeoutDuration);

  useEffect(() => {
    let timeoutId;

    if (state.turnState === turnStates.WAIT_DEFENSE && timeoutRemaining > 0) {
      timeoutId = setInterval(() => {
        setTimeoutRemaining((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timeoutId);
            actions.setDTimeoutEnded(true);
            return 0;
          }
          return prevTime - 100;
        });
      }, 100);
    } else {
      clearInterval(timeoutId);
      setTimeoutRemaining(timeoutDuration);
    }

    return () => {
      clearInterval(timeoutId); // Cleanup on unmount
    };
  }, [state.turnState]);



  handle_socket_messages();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    actions.setOpen(false);
  };

  return (
    <Grid container sx={{ minHeight: '95vh', backgroundColor: '#fafffa' }}>

      {/* First half */}
      {/* TODO: probar */}
      {!state.isDeadPlayer &&
        <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column' }}>
          <PlayerRound>
            <RoleSign />
          </PlayerRound>
          <LinearProgress
            variant="determinate"
            value={(timeoutRemaining / timeoutDuration) * 100}
            data-testid="progressBar"
            sx={{ height: '12px', marginTop: '4px', marginBottom: '4px', opacity: state.isTurn && state.turnState === turnStates.WAIT_DEFENSE ? 1 : 0 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '180px', maxHeight: '180px' }} >
            <PlayersHand cartas={state.hand} />
            <ButtonsBox />
          </Box>

        </Grid>}
      {/* Second half */}
      <Grid item xs={4} sx={{ height: '95vh', display: 'flex', flexDirection: 'column', width: '95%' }}>
        <Box sx={{ minHeight: 'calc(100%-180px)', maxHeight: 'calc(100%-180px)', overflow: 'auto', marginLeft: '20px', marginBottom: '16.1px', border: '1px solid grey', borderRadius: '30px', flex: '1' }}>
          <Notifications messages={state.avisos} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', border: '1px solid grey', borderRadius: '3px', maxHeight: '178px', minHeight: '178px', marginLeft: '1.4rem', }}>
          <Chat />
        </Box>
      </Grid>
      {state.isDeadPlayer && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60%',
            marginLeft: '5rem',
            marginTop: '5rem',

            height: '100%',
          }}
        >
          {state.isDeadPlayer && <h1 style={{ fontSize: '8rem', color: 'red' }}> Has muerto...</h1>}
        </Box>
      )}
      {(state.turnState === 3) && <EndGameBanner reason={state.reason} winners={state.winners} />}
      <SnackBar open={state.open} handleClose={handleClose} severity={state.severity} body={state.body} />
      {(state.reveal && !state.isDeadPlayer) && <ShowHandBanner />}
    </Grid>
  );
};

export default Match;