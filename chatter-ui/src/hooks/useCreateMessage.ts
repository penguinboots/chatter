import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { getMessagesDocument } from "./useGetMessages";

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

export const useCreateMessage = (chatId: string) => {
  return useMutation(createMessageDocument, {
    // Fetch the exact query for the chat matching this id
    update(cache, { data }) {
      const messagesQueryOptions = {
        query: getMessagesDocument,
        variables: {
          chatId,
        },
      };

      const messages = cache.readQuery({
        ...messagesQueryOptions,
      });

      if (!messages || !data?.createMessage) {
        return;
      }

      cache.writeQuery({
        ...messagesQueryOptions,
        data: {
          messages: messages.messages.concat(data?.createMessage),
        },
      });
    },
  });
};
