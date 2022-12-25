import { gql } from "@apollo/client";

export default gql`
  mutation updateStory(
    $sid: ID!
    $title: String!
    $pages: [String!]!
    $thumbnailState: UpdateImageState!
    $thumbnail: Upload
    $published: Boolean!
    $description: String
    $genre: String
  ) {
    updateStory(
      args: {
        sid: $sid
        title: $title
        pages: $pages
        thumbnailState: $thumbnailState
        thumbnail: $thumbnail
        published: $published
        description: $description
        genre: $genre
      }
    ) {
      status
    }
  }
`;
