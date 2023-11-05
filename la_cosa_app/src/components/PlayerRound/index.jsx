import Deck from '../../components/Deck/';
import { useMatchC } from '../../screens/Match/matchContext.jsx';
import RoleSign from "../RoleSign/index.jsx";
import React from "react";
import Box from "@mui/material/Box";


const DoorBtPlayers = ({ angle, radiusX, radiusY }) => {
    const offset = Math.PI * 0.5;
    const x = radiusX * Math.cos(angle + offset);
    const y = radiusY * Math.sin(angle + offset);


    const lineStyle = {
        width: '8px',
        height: '100px',
        backgroundColor: 'brown',
        margin: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `rotate(${angle}rad)`
    };

    const doorStyle = {
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
    };


    return (
        <div style={doorStyle}>
            <div style={{ display: 'flex' }}>
                <div className="line" style={lineStyle} />
            </div>
        </div>
    );
};




const PlayerCard = ({ player, angle, radiusX, radiusY, isCurrentPlayer }) => {
    const { state, actions } = useMatchC();
    const x = radiusX * Math.cos(angle);
    const y = radiusY * Math.sin(angle);

    const isThisPlayerDead = state.deadPlayerNames.includes(player.player_name);

    const circleStyle = {
        width: '70px',
        height: '70px',
        border: (state.target_name === player.player_name && !isThisPlayerDead && (state.turnState === 2 || state.turnState === 7)) ? '2px solid red' : '2px solid transparent',
        backgroundColor: isThisPlayerDead ? 'red' : (state.currentTurn === player.player_name) ? 'green' : '#3498db',
        margin: '10px',
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
                    <span className="player-name" style={nameStyle}>
                        {player.player_name}
                    </span>
                </div>


            </div>
        </div>
    );
};

const PlayerRound = () => {
    const { state } = useMatchC();
    const currentPlayerName = sessionStorage.getItem('player_name');

    const currentPlayer = state.jugadores.find((player) => player.player_name === currentPlayerName);
    const totalPlayers = state.jugadores.length;
    const sortedPlayers = state.jugadores.sort((a, b) => a.position - b.position);
    const currentPlayerIndex = sortedPlayers.indexOf(currentPlayer);
    const sortedboolDoors = state.Obstacles.sort((a, b) => a.position - b.position);
    const radiusX = 160; // Horizontal radius
    const radiusY = 150; // Vertical radius
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
        position: 'absolute',
        top: '10px',
        left: '10px',
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
                        angle={(2 * Math.PI) * (currentPlayerIndex - index + (Math.max(1, (totalPlayers / 12) * 3))) / totalPlayers}
                        radiusX={radiusX}
                        radiusY={radiusY}
                        isCurrentPlayer={player.player_name === currentPlayerName}
                    />
                    {sortedboolDoors[index] && <DoorBtPlayers
                        angle={(2 * Math.PI) * (currentPlayerIndex - index + 0.5 - 1) / totalPlayers}
                        radiusX={radiusX}
                        radiusY={radiusY}
                    />}
                </React.Fragment>
            ))}
        </Box>
    );
};
export default PlayerRound;