/////////////////////////// Funcion 
import './PlayerRound.css';
import Deck from '../../components/Deck/';
import { useState } from 'react';

export const PlayerCard = ({ player, angle, radius, onSelectCard, style }) => {
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    const cardStyle = {
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
        cursor: 'pointer',
    };

    const handleClick = () => {
        onSelectCard(player.player_name);

    }

    return (
        <div className="player-card" style={cardStyle} onClick={handleClick}>
            <div className="circle"></div>
            <span className="player-name">{player.player_name}</span>
        </div>
    );
};

const PlayerRound = ({ players, socket, onTarget, isTurn }) => {
    const currentPlayerName = sessionStorage.getItem('player_name');
    const [selectedPlayer, setSelectedPlayer] = useState(null); // Change color target


    const currentPlayer = players.find(player => player.player_name === currentPlayerName);

    if (!currentPlayer) {
        console.log('El jugador actual no está en la lista de jugadores');
        return null;
    }


    const sortedPlayers = players.sort((a, b) => a.position - b.position);

    const angle = (2 * Math.PI) / sortedPlayers.length;
    const currentPlayerIndex = sortedPlayers.indexOf(currentPlayer);
    const radius = 200;

    // Center the deck in the middle of the circle
    const centerX = 0;
    const centerY = 0;

    const handleDrawCard = async () => {
        try {
            const request = { message_type: 'robar carta', message_content: '' };
            socket.send(JSON.stringify(request));

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="player-round">
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
                <PlayerCard
                    key={index}
                    player={player}
                    angle={(angle * (index - currentPlayerIndex)) + Math.PI / 2}
                    radius={radius}
                    onSelectCard={onTarget}
                />
            ))}
        </div>
    );
};

export default PlayerRound;