import { gql } from "@apollo/client";

export default gql`
  mutation updateUser(
    $bio: String
    $anonymous: Boolean!
    $avatar: Upload
    $avatarState: UpdateImageState!
    $banner: Upload
    $bannerState: UpdateImageState!
  ) {
    updateUser(
      args: {
        bio: $bio
        anonymous: $anonymous
        avatar: $avatar
        avatarState: $avatarState
        banner: $banner
        bannerState: $bannerState
      }
    ) {
      status
    }
  }
`;
