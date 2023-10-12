import './PlayerRound.css';

const PlayerCard = ({ player, angle }) => {
  const radius = 200; // Radio del círculo
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  const cardStyle = {
    position: 'absolute',
    transform: `translate(${x}px, ${y}px)`,
  };

  return (
    <div className="player-card" style={cardStyle}>
      <div className="circle"></div>
      <span className="player-name">{player.player_name}</span>
    </div>
  );
};

const PlayerRound = ({ players }) => {
  const currentPlayerName = sessionStorage.getItem('player_name');

  // Encontrar la información del jugador actual
  const currentPlayer = players.find(player => player.player_name === currentPlayerName);

  if (!currentPlayer) {
    console.log('El jugador actual no está en la lista de jugadores'); //TODO: manejar bien el error
    return null;
  }

  // Ordenar a los jugadores según su posición en la mesa
  const sortedPlayers = players.sort((a, b) => a.position - b.position);

  const angle = (2 * Math.PI) / sortedPlayers.length;
  const currentPlayerIndex = sortedPlayers.indexOf(currentPlayer);

  return (
    <div className="player-round">
      {sortedPlayers.map((player, index) => (
        <PlayerCard
          key={index}
          player={player}
          angle={(angle * (index - currentPlayerIndex)) + Math.PI / 2} 
        />
      ))}
    </div>
  );
};

export default PlayerRound;
