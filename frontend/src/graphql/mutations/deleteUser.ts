import { gql } from "@apollo/client";

export default gql`
  mutation deleteUser {
    deleteUser {
      status
    }
  }
`;
