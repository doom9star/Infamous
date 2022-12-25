import { gql } from "@apollo/client";
import FStory from "../fragments/FStory";

export default gql`
  ${FStory}
  query getSearchStories($query: String!) {
    getSearchStories(query: $query) {
      status
      stories {
        ...FStory
      }
    }
  }
`;
