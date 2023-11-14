import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Carta from "../../components/Carta";
import { useMatchC } from "../../screens/Match/matchContext.jsx";
import { mapaCartas } from "../Carta/index.jsx";
import { styled } from "@mui/system";
import { tooltipClasses } from "@mui/material";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
  },
}));

const styles = {
  cartaHovered: {
    transform: "translateY(-1cm)",
    transition: "transform 0.2s",
  },
};

const PlayersHand = () => {
  const { state, actions } = useMatchC();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardHover = (card) => {
    if (state.selectedCard === null) {
      setHoveredCard(card);
    }
  };

  const handleHandLeave = () => {
    if (state.selectedCard === null) {
      setHoveredCard(null);
    }
  };

  const handleCardClick = (card) => {
    if (card === state.selectedCard) {
      actions.setSelectedCard(null);
      setHoveredCard(null);
    } else {
      actions.setSelectedCard(card);
      setHoveredCard(card);
    }
  };

  useEffect(() => {
    actions.setSelectedCard(null);
    setHoveredCard(null);
  }, [state.currentTurn, state.hand]);

  const renderTooltipContent = (carta) => (
    <img
      src={mapaCartas[carta.card_name]}
      alt={`Tooltip for ${carta.card_name}`}
      style={{ width: "80%", height: "90%" }}
    />
  );

  return (
    <Stack
      direction="row"
      spacing={-0.1}
      onMouseLeave={handleHandLeave}
      data-testid="playersHand"
    >
      {state.hand.map((objCarta, index) => (
        <CustomTooltip
          key={index}
          title={renderTooltipContent(objCarta)}
          placement="top"
          open={state.inspect && hoveredCard === objCarta}
        >
          <div
            onMouseEnter={() => handleCardHover(objCarta)}
            onClick={() => handleCardClick(objCarta)}
            style={hoveredCard === objCarta ? styles.cartaHovered : {}}
          >
            <Carta nombre={objCarta.card_name} />
          </div>
        </CustomTooltip>
      ))}
    </Stack>
  );
};

export default PlayersHand;
