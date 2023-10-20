import './PlayerRound.css';
import Deck from '../../components/Deck/';
import { useMatchC } from '../../screens/Match/matchContext.jsx';

const PlayerCard = ({ player, angle, radiusX, radiusY, isCurrentPlayer }) => {
    const { state, actions } = useMatchC();
    const x = radiusX * Math.cos(angle);
    const y = radiusY * Math.sin(angle);

    const isThisPlayerDead = state.deadPlayerNames.includes(player.player_name);

    const circleStyle = {
        width: '80px',
        height: '80px',
        border: (state.target_name === player.player_name && !isThisPlayerDead) ? '2px solid red' : '2px solid transparent',
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
            <div className="circle" style={circleStyle}>
                <span className="player-name" style={nameStyle}>
                    {player.player_name}
                </span>
            </div>
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
    const radiusX = 170; // Horizontal radius
    const radiusY = 160; // Vertical radius
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
                    angle={(2 * Math.PI) * (currentPlayerIndex - index + (Math.max(1, (totalPlayers / 12) * 3)) ) / totalPlayers}
                    radiusX={radiusX}
                    radiusY={radiusY}
                    isCurrentPlayer={player.player_name === currentPlayerName}
                />
            ))}
        </div>
    );
};

export default PlayerRound;
