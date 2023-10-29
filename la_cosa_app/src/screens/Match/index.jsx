import { turnStates, useMatchC } from './matchContext';
import { Grid, Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SnackBar from '../../components/SnackBar';
import PlayersHand from "../../components/PlayersHand/";
import ButtonsBox from "../../components/ButtonsBox/index.jsx";
import EndGameBanner from "../../components/EndGameBanner";
import Notifications from "../../components/Notifications";
import PlayerRound from "../../components/PlayerRound/index";
import { handle_socket_messages } from '../../utils/api';
import ShowHandBanner from '../../components/ShowHandBanner';
import RoleSign from "../../components/RoleSign/index.jsx";
import LinearProgress from "@mui/material/LinearProgress";

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
      <Grid container sx={{ minHeight: '95vh' , backgroundColor: '#fafffa' }}>
        {!state.isDeadPlayer && (
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column' }}>
                <PlayerRound>
                    <RoleSign />
                </PlayerRound>
                <LinearProgress
                    variant="determinate"
                    value={(timeoutRemaining / timeoutDuration) * 100}
                    sx={{ minHeight: '1rem', margin: '0.2rem', opacity: state.isTurn && state.turnState === turnStates.WAIT_DEFENSE ? 1 : 0 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '25%'}}>
                    <PlayersHand cartas={state.hand} />
                    <ButtonsBox />
                </Box>
            </Grid>
        )}
            <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' , width: 'calc(100% - 2rem)'}}>
                <Notifications messages={state.avisos} />
                <Box
                    sx={{
                        height: '30%',
                        border: '1px solid grey',
                        borderRadius: '3px',
                        marginLeft: '1.2rem',
                        marginTop: '1.2rem',
                    }}
                >
                    chat
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
        {state.turnState === 3 && <EndGameBanner reason={state.reason} winners={state.winners} />}
        <SnackBar open={state.open} handleClose={handleClose} severity={state.severity} body={state.body} />
        {state.reveal && !state.isDeadPlayer && <ShowHandBanner />}
      </Grid>
  );
};


export default Match;