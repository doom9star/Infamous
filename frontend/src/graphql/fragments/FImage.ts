import gql from "graphql-tag";

const FImage = gql`
  fragment FImage on Image {
    url
    filename
  }
`;
export default FImage;
