import { gql } from "@apollo/client";
import FUser from "../fragments/FUser";

export default gql`
  ${FUser}
  mutation register($name: String!, $email: String!, $password: String!) {
    register(args: { name: $name, email: $email, password: $password }) {
      status
      user {
        ...FUser
      }
    }
  }
`;
