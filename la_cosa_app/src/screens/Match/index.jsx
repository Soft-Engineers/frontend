import {turnStates, useMatchC} from './matchContext';
import {Grid, Box} from '@mui/material';
import React, {useEffect, useState} from 'react';
import SnackBar from '../../components/SnackBar';
import PlayersHand from "../../components/PlayersHand";
import ButtonsBox from "../../components/ButtonsBox";
import EndGameBanner from "../../components/EndGameBanner";
import Notifications from "../../components/Notifications";
import PlayerRound from "../../components/PlayerRound";
import {handle_socket_messages} from '../../utils/api';
import ShowHandBanner from '../../components/ShowHandBanner';
import RoleSign from "../../components/RoleSign";
import LinearProgress from "@mui/material/LinearProgress";
import Chat from "../../components/Chat";

const Match = () => {
    const {state, actions} = useMatchC();
    const timeoutDuration = 20000;
    const [timeoutRemaining, setTimeoutRemaining] = useState(timeoutDuration);

    useEffect(() => {
        actions.setMessages([]);
        actions.setChatHistory([]);
        const newMessage = {
            author: '', // Replace with the actual author's name
            message: (
                <span>
                ¡Bienvenido al Juego de la Cosa! Lee las reglas <a
                    href="https://famaf.aulavirtual.unc.edu.ar/pluginfile.php/27371/mod_resource/content/1/Reglas%20del%20Juego_%20La%20Cosa.pdf"
                    target="_blank" rel="noopener noreferrer">
                    acá
                </a>
            </span>
            ),
            timestamp: new Date().getTime(),
        };
        actions.setMessages([...state.messages, newMessage]);
    }, []);

    useEffect(() => {
        let timeoutId;

        if (
            state.turnState === turnStates.WAIT_DEFENSE &&
            state.defenseTimestamp &&
            timeoutRemaining > 0
        ) {
            const currentTime = new Date().getTime();
            const defenseTimestamp = state.defenseTimestamp * 1000;
            const remainingTime = timeoutDuration - (currentTime - defenseTimestamp); // Calculo el tiempo restante

            if (remainingTime <= 0) {
                actions.setDefenseTimeoutEnded(true);
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
    }, [state.turnState, state.defenseTimestamp, timeoutRemaining]);


    handle_socket_messages();

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        actions.setOpen(false);
    };

    return (
        <Grid container sx={{minHeight: '95vh', backgroundColor: '#fafffa'}}>

            {!state.isDeadPlayer &&
                <Grid item xs={8} sx={{display: 'flex', flexDirection: 'column'}}>
                    <PlayerRound>
                        <RoleSign/>
                    </PlayerRound>
                    <LinearProgress
                        variant="determinate"
                        value={(timeoutRemaining / timeoutDuration) * 100}
                        sx={{
                            height: '12px',
                            marginTop: '4px',
                            marginBottom: '4px',
                            opacity: state.isTurn && state.turnState === turnStates.WAIT_DEFENSE ? 1 : 0
                        }}
                    />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        minHeight: '160px',
                        maxHeight: '160px',
                        height: '160px',
                        justifyContent: 'space-between'
                    }}>
                        <PlayersHand/>
                        <ButtonsBox/>
                    </Box>

                </Grid>}
            {/* Second half */}
            <Grid item xs={4} sx={{height: '95vh', display: 'flex', flexDirection: 'column', width: '95%'}}>
                <Notifications/>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid grey',
                    borderRadius: '10px',
                    marginLeft: '1.4rem',
                    minHeight: '158px',
                    flex: '1'
                }}>
                    <Chat socket={state.socket}/>
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
                    {state.isDeadPlayer && <h1 style={{fontSize: '8rem', color: 'red'}}> Has muerto...</h1>}
                </Box>
            )}
            {(state.turnState === 3) && <EndGameBanner reason={state.reason} winners={state.winners}/>}
            <SnackBar open={state.open} handleClose={handleClose} severity={state.severity} body={state.body}/>
            {(state.reveal && !state.isDeadPlayer) && <ShowHandBanner/>}
        </Grid>
    );
};

export default Match;