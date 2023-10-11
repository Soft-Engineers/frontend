import React from 'react';
import Box from "@mui/material/Box";

const styles = {
    discard: {
        width: '148px',
        height: '100px',
        border: '2px solid black',
    },
};

const DiscardDeck = () => {
    return <Box style={styles.discard}></Box>;
}

export default DiscardDeck;