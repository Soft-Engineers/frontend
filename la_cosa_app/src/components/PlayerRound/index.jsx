import Deck from '../../components/Deck/';
import { useMatchC } from '../../screens/Match/matchContext.jsx';
import RoleSign from "../RoleSign/index.jsx";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import RotateRightIcon from '@mui/icons-material/RotateRight';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import quarantineIcon from "../../assets/quarantine.png";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useState } from 'react';


const DoorBtPlayers = ({ angle, radiusX, radiusY, array, index }) => {
    const { state, actions } = useMatchC();
    const offset = Math.PI * 0.5;
    const x = (radiusX - 30) * Math.cos(angle + offset);
    const y = (radiusY - 30) * Math.sin(angle + offset);

    const handleDoorClick = (event) => {
        const id = event.currentTarget.id;
        //console.log(array[id]);
        //console.log(id);
        if (state.isTurn === true && state.targetDoor != id) {
            actions.setTargetDoor(id);
        }
        else {
            actions.setTargetDoor(null);
        }
    }

    const lineStyle = {
        width: '10px',
        height: '120px',
        backgroundColor: '#8b4513', // Color of the door
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `rotate(${angle}rad)`,
        border: state.isTurn == false || state.targetDoor != index ? '0.1px solid black' : '2px solid red',
    };

    const doorStyle = {
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
    };


    const nailStyle1 = {
        width: '6px',
        height: '6px',
        backgroundColor: 'grey', // Color of the nails
        borderRadius: '50%', // Make it circular
        position: 'absolute',
        transform: 'translate(0, 33px)', // Adjust the transform for the first nail
    };

    const nailStyle2 = {
        width: '6px',
        height: '6px',
        backgroundColor: 'grey', // Color of the nails
        borderRadius: '50%', // Make it circular
        position: 'absolute',
        transform: 'translate(0, -33px)', // Adjust the transform for the second nail
    };

    return (
        <div onClick={handleDoorClick} style={doorStyle} id={index}>
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
        width: '60px',
        height: '60px',
        border: (state.target_name === player.player_name && !isThisPlayerDead && (state.turnState === 2 || state.turnState === 7)) ? '2px solid red' : '2px solid transparent',
        backgroundColor: isThisPlayerDead ? 'red' : (state.currentTurn === player.player_name) ? 'green' : '#3498db',
        margin: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
    };

    const cardStyle = {
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
        cursor: isThisPlayerDead ? 'not-allowed' : 'pointer',
        borderRadius: '50%',
    };

    const nameStyle = {
        textDecoration: isThisPlayerDead ? 'line-through' : 'none',
        position: 'absolute',
        textAlign: 'center',
        fontWeight: isCurrentPlayer ? 'bold' : 'normal',
    };

    const cuarentenaStyle = {
        box: {
            position: 'absolute',
            width: '70%',
            height: '65px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid black',
            boxShadow: '0 0 0 5px yellow, 0 0 0 6px black',
            borderRadius: '35%',
        },
        desc: {
            textAlign: 'center',
            fontWeight: 'bolder',
            color: 'black',
            border: '2px solid black',
            backgroundColor: 'yellow',
            height: '20px',
            width: '80%',
            transform: 'translate(10%, -100%)',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
        },
        icon: {
            display: 'flex',
            width: '40px',
            height: '40px',
            transform: 'translate(0%, -70%)',
        }
    };

    const currPlayerStyle = {
        position: 'absolute',
        width: '40px',
        height: '40px',
        transform: inCuarentena ? 'translate( 0, -65px)' : 'translate(0, -40px)',
        rotate: `${angle - 29.85}rad`,
        zIndex: '990',
    }

    useEffect(() => {
        actions.setTargetName(null); // Cuando cambia el turno, se resetea el target
    }, [state.currentTurn]);

    const handleClick = () => {
        if (isThisPlayerDead) {
            return;
        }
        if (state.target_name === player.player_name) {
            actions.setTargetName(null);
        } else {
            actions.setTargetName(player.player_name);
        }
    };

    return (
        <div className="player-card" style={cardStyle} onClick={handleClick}>

            <div style={{ display: 'flex' }}>
                <div className="circle" style={circleStyle}>
                    {inCuarentena &&
                        <>
                            <div style={cuarentenaStyle.box} />
                            <img src={quarantineIcon} alt="Quarantine" style={cuarentenaStyle.icon} />
                        </>

                    }
                    <span className="player-name" style={nameStyle}>
                        {player.player_name}
                    </span>
                    {isCurrentPlayer && (<KeyboardDoubleArrowDownIcon style={currPlayerStyle} />)}
                </div>

            </div>

            {inCuarentena && (

                <div style={cuarentenaStyle.desc}>
                    {Cuarentena[currPlayer]} turnos
                </div>

            )}


        </div>
    );
};

const PlayerRound = () => {
    const { state } = useMatchC();

    const currentPlayerName = sessionStorage.getItem('player_name');
    const currentPlayer = state.posiciones.find((player) => player.player_name === currentPlayerName);
    const totalPlayers = state.posiciones.length;
    const sortedPlayers = state.posiciones.sort((a, b) => a.position - b.position);//state.posiciones;//
    const currentPlayerIndex = sortedPlayers.indexOf(currentPlayer);
    const sortedboolDoors = state.Obstacles.sort((a, b) => a.position - b.position); //state.Obstacles;//
    const radiusX = 200;
    const radiusY = 170;
    const centerX = 0;
    const centerY = 0;

    const handleDrawCard = async () => {
        try {
            const request = { message_type: 'robar carta', message_content: '' };
            state.socket.send(JSON.stringify(request));
        } catch (error) {
            console.log(error);
        }
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        border: '1px solid grey',
        borderRadius: '10px',
        backgroundColor: '#f2f2ff',
        position: 'relative',
    };
    const roleSignStyle = {
        height: '100%',
        width: '100%',
    };
    const iconsContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',

    };

    const rotationStyle = {
        display: 'flex',
        fontSize: 'large',
        marginRight: '1rem',
        width: '100px',
        height: '100px',
    };



    return (
        <Box sx={containerStyle}>
            <div style={roleSignStyle}>
                <RoleSign />
            </div>

            <div
                className="deck"
                style={{
                    position: 'absolute',
                    transform: `translate(${centerX}px, ${centerY}px)`,
                }}
            >
                <Deck onDrawCard={() => handleDrawCard()} />
            </div>

            {sortedPlayers.map((player, index) => (
                <React.Fragment key={index}>
                    <PlayerCard
                        player={player}
                        angle={(2 * Math.PI) * (index + (Math.max(1, (totalPlayers / 12) * 3))) / totalPlayers}
                        radiusX={radiusX}
                        radiusY={radiusY}
                        isCurrentPlayer={player.player_name === currentPlayerName}
                    />
                    {/*sortedboolDoors[index] &&*/ <DoorBtPlayers
                        angle={(2 * Math.PI) * (index + 0.5) / totalPlayers}
                        radiusX={radiusX}
                        radiusY={radiusY}
                        array={sortedboolDoors}
                        index={index}
                    />}
                </React.Fragment>
            ))}
            <div style={iconsContainerStyle}>
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