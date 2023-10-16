import './PlayerRound.css';
import Deck from '../../components/Deck/';
import { useMatchC } from '../../screens/Match/matchContext.jsx';

const PlayerCard = ({ player, angle, radius, isCurrentPlayer  }) => {
    const { state, actions } = useMatchC();
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    const isDeadPlayer = state.deadPlayerName === player.player_name;

    const circleStyle = {
        width: '60px',
        height: '60px',
        border: (state.target_name === player.player_name && !isDeadPlayer) ? '2px solid red' : '2px solid transparent',
        backgroundColor: isDeadPlayer ? 'black' : isCurrentPlayer ? 'green' : '#3498db',
        borderRadius: '50%',
        margin: '20px',
    };

    const cardStyle = {
        position: 'absolute',
        transform: `translate(${x}px, ${y}px)`,
        cursor: isDeadPlayer ? 'not-allowed' : 'pointer',
    };

    const nameStyle = {
        textDecoration: isDeadPlayer ? 'line-through' : 'none',
    };

    const handleClick = () => {
        if (isDeadPlayer) {
            return;
        }
        if (state.target_name === player.player_name) {
            actions.setTargetName(null);
        } else {
            actions.setTargetName(player.player_name);
        }
    }

    return (
        <div className="player-card" style={cardStyle} onClick={handleClick}>
            <div className="circle" style={circleStyle}></div>
            <span className="player-name" style={nameStyle}>{player.player_name}</span>
        </div>
    );
};

const PlayerRound = () => {
    const {state} = useMatchC();
    const currentPlayerName = sessionStorage.getItem('player_name');

    const currentPlayer = state.jugadores.find(player => player.player_name === currentPlayerName);

    if (!currentPlayer) {
        console.log('El jugador actual no está en la lista de jugadores');
        return null;
    }

    const totalPlayers = state.jugadores.length;
    const sortedPlayers = state.jugadores.sort((a, b) => a.position - b.position);
    const currentPlayerIndex = sortedPlayers.indexOf(currentPlayer);
    const radius = 200;
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
                    angle={(2 * Math.PI) * (currentPlayerIndex - index) / totalPlayers}
                    radius={radius}
                    isCurrentPlayer={player.player_name === currentPlayerName}
                />
            ))}
        </div>
    );
};

export default PlayerRound;
