import React from 'react';
import Box from "@mui/material/Box";

const styles = {
   chat: {
       display : 'flex',
       flexDirection: 'column',
       border: '1px solid grey',
       borderRadius: '3px',
       marginLeft: '1.4rem',
   },
};

const Chat = () => {
    return <Box style={styles.chat}> chat </Box>;
}

export default Chat;