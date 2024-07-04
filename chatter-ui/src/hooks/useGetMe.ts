import { useQuery } from "@apollo/client";
import { User } from "../models/User";
import { graphql } from "../gql";

const getMeDocument = graphql(`
  query Me {
    me {
      _id
      email
    }
  }
`);

export const useGetMe = () => {
  return useQuery<{ me: User }>(getMeDocument);
};
