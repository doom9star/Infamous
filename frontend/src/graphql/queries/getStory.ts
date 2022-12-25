import { gql } from "@apollo/client";
import FStory from "../fragments/FStory";

export default gql`
  ${FStory}
  query getStory($sid: String!) {
    getStory(sid: $sid) {
      status
      story {
        ...FStory
      }
    }
  }
`;
