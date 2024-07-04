import List from "@mui/material/List";
import { ChatListItem } from "./chat-list-item/ChatListItem";
import { ChatListHeader } from "./chat-list-header/ChatListHeader";
import { Divider, Stack } from "@mui/material";

export default function ChatList() {
  return (
    <Stack>
      <ChatListHeader />
      <Divider />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          maxHeight: "80vh",
          overflow: "auto,",
        }}
      >
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </List>
    </Stack>
  );
}
