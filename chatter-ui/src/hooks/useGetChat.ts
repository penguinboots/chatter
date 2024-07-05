import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { ChatsQueryVariables } from "../gql/graphql";

const getChatDocument = graphql(`
  query Chat($_id: String!) {
    chat(_id: $_id) {
      ...ChatFragment
    }
  }
`);

export const useGetChat = (variables: ChatsQueryVariables) => {
  return useQuery(getChatDocument, {
    variables,
  } as unknown as ChatsQueryVariables);
};
