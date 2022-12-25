import { gql } from "@apollo/client";

export default gql`
  mutation createStory($title: String!, $thumbnail: Upload) {
    createStory(args: { title: $title, thumbnail: $thumbnail }) {
      status
      id
    }
  }
`;
