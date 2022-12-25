import { gql } from "@apollo/client";
import FUser from "../fragments/FUser";

export default gql`
  ${FUser}
  mutation login($email: String!, $password: String!) {
    login(args: { email: $email, password: $password }) {
      status
      user {
        ...FUser
      }
    }
  }
`;
