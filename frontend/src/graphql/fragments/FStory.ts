import gql from "graphql-tag";
import FImage from "./FImage";
import FUser from "./FUser";

const FStory = gql`
  ${FImage}
  ${FUser}
  fragment FStory on Story {
    id
    title
    thumbnail {
      ...FImage
    }
    pages
    published
    description
    genre
    user {
      ...FUser
    }
  }
`;
export default FStory;
