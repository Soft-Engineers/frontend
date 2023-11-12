import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import rev from "../../assets/cartas_recortadas/rev.png";

const styles = {
  deck: {
    maxWidth: "80px",
    maxHeight: "130px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
  card: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
};
const Deck = ({ onDrawCard }) => {
  const handleDeckClick = () => {
    onDrawCard();
  };

  return (
    <Card style={styles.deck}>
      <CardActionArea onClick={handleDeckClick}>
        <img src={rev} alt="Card Back" style={styles.card} />
      </CardActionArea>
    </Card>
  );
};
export default Deck;
