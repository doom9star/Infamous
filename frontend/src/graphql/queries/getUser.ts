import { gql } from "@apollo/client";
import FUser from "../fragments/FUser";

export default gql`
  ${FUser}
  query getUser {
    getUser {
      status
      user {
        ...FUser
      }
    }
  }
`;
