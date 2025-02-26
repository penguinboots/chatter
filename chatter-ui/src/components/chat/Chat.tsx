import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";

export function Chat() {
  const params = useParams();
  const chatId = params.id!;
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage(chatId);
  const { data: messages } = useGetMessages({ chatId: chatId });
  const divRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [message, setMessage] = useState("");

  const scrollToBottom = () => {
    divRef.current?.scrollIntoView();
  };

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: {
          chatId: chatId,
          content: message,
        },
      },
    });
    setMessage("");
    scrollToBottom();
  };

  useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [location, messages]);

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat.name}</h1>
      <Box flexGrow={1} sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {messages?.messages.map((message) => (
          <Grid container alignItems="center" marginBottom="1rem">
            <Grid item xs={2} lg={1}>
              <Avatar src="" sx={{ width: 52, height: 52 }} />
            </Grid>
            <Grid item xs={10} lg={11}>
              <Stack>
                <Paper sx={{ width: "fit-content" }}>
                  <Typography sx={{ padding: "0.9rem" }}>
                    {message.content}
                  </Typography>
                </Paper>
                <Typography variant="caption" sx={{ marginLeft: "0.25rem" }}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}
        <div ref={divRef} />
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          placeholder="Message"
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={async () => await handleCreateMessage()}
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
