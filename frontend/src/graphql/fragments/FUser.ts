import gql from "graphql-tag";
import FImage from "./FImage";

const FUser = gql`
  ${FImage}
  fragment FUser on User {
    id
    name
    bio
    anonymous
    avatar {
      ...FImage
    }
    banner {
      ...FImage
    }
  }
`;
export default FUser;
