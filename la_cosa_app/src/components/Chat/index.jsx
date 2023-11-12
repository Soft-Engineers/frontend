import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMatchC } from "../../screens/Match/matchContext.jsx";
import ListItem from "@mui/material/ListItem";

const Chat = ({ socket }) => {
  const { state, actions } = useMatchC();
  const scrollRef = useRef(null);
  const [messagesList, setMessagesList] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    actions.setMessages([]);
    setMessagesList([]);
  }, []);

  useEffect(() => {
    if (state.chatHistory.length > 0) {
      setMessagesList([...state.messages, ...state.chatHistory]);
    }
  }, [state.chatHistory]);

  useEffect(() => {
    setMessagesList((prevMessages) => {
      return [...prevMessages, ...state.messages];
    });
  }, [state.messages]);

  useEffect(() => {
    if (scrollRef.current) {
      const notificationBody = scrollRef.current;
      notificationBody.scrollTop =
        notificationBody.scrollHeight - notificationBody.clientHeight;
    }
  }, [messagesList]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const request = {
        message_type: "chat",
        message_content: {
          message: inputMessage,
        },
      };
      socket.send(JSON.stringify(request));

      setInputMessage("");
    }
  };

  const renderMessage = (message, index) => {
    const isMainUser = message.author === sessionStorage.getItem("player_name");
    return (
      <ListItem
        key={index}
        sx={
          isMainUser
            ? { justifyContent: "flex-end" }
            : { justifyContent: "flex-start" }
        }
      >
        {isMainUser && (
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ marginRight: "1rem" }}
          >
            {message.timestamp !== ""
              ? new Date(message.timestamp * 1000).toLocaleTimeString()
              : ""}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: isMainUser ? "flex-end" : "flex-start",
            backgroundColor: isMainUser ? "#3498db" : "#f2f2ff",
            padding: "5px 10px",
            borderRadius: "10px",
          }}
        >
          {!isMainUser && (
            <Typography
              variant="caption"
              color="blue"
              sx={{ fontWeight: "bold", alignSelf: "flex-start" }}
            >
              {message.author}
            </Typography>
          )}
          <Typography variant={message.author === "" ? "caption" : "body1"}>
            {message.message}
          </Typography>
        </Box>
        {!isMainUser && (
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ marginLeft: "1rem" }}
          >
            {message.timestamp !== ""
              ? new Date(message.timestamp * 1000).toLocaleTimeString()
              : ""}
          </Typography>
        )}
      </ListItem>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
        maxHeight: "100%",
      }}
      data-testid="chat"
    >
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          minWidth: "100%",
          flexGrow: 1,
        }}
        ref={scrollRef}
      >
        {messagesList.map((message, index) => renderMessage(message, index))}
      </div>
      <TextField
        label="Escribe un mensaje"
        variant="outlined"
        fullWidth
        size="small"
        value={inputMessage}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />
    </Box>
  );
};

export default Chat;
