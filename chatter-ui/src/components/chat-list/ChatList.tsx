import List from "@mui/material/List";
import { ChatListItem } from "./chat-list-item/ChatListItem";
import { ChatListHeader } from "./chat-list-header/ChatListHeader";
import { Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ChatListAdd } from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import { usePath } from "../../hooks/usePath";

export default function ChatList() {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const { data } = useGetChats();
  const { path } = usePath();

  const [selectedChatId, setSelectedChatId] = useState("");

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.chats
            .map((chat) => (
              <ChatListItem
                chat={chat}
                selected={selectedChatId === chat._id}
              />
            ))
            .reverse()}
        </List>
      </Stack>
    </>
  );
}
