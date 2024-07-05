import { useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";

export function Chat() {
  const params = useParams();
  const chatId = params.id!;
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage(chatId);
  const { data: messages } = useGetMessages({ chatId: chatId });

  const [message, setMessage] = useState("");

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat.name}</h1>
      <Box>
        {messages?.messages.map((message) => (
          <p>{message.content}</p>
        ))}
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          placeholder="Message"
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={() => {
            setMessage("");
            createMessage({
              variables: {
                createMessageInput: {
                  chatId: chatId,
                  content: message,
                },
              },
            });
          }}
          color="primary"
          sx={{ p: "10px" }}
          disabled={message.length === 0}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
}
