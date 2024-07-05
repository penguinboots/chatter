import { useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import { Divider, IconButton, InputBase, Paper, Stack } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useState } from "react";

export function Chat() {
  const params = useParams();
  const { data } = useGetChat({ _id: params.id! });
  const [createMessage] = useCreateMessage();

  const chatId = params.id!;

  const [message, setMessage] = useState("");

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat.name}</h1>
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
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
}
