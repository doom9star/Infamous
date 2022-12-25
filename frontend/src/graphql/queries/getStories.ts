import { gql } from "@apollo/client";
import FStory from "../fragments/FStory";

export default gql`
  ${FStory}
  query getStories($type: StoryType!, $genre: String, $uid: String) {
    getStories(type: $type, genre: $genre, uid: $uid) {
      status
      public {
        ...FStory
      }
      published {
        ...FStory
      }
      unpublished {
        ...FStory
      }
    }
  }
`;
