import React from "react";
import { useApolloClient, useQuery } from "@apollo/client";
import styled from "styled-components";
import getUser from "../graphql/queries/getUser";
import {
  GetUserQuery,
  User,
  GetStoriesQuery,
  GetStoriesQueryVariables,
  StoryType,
} from "../graphql/types";
import "../styles/profile.scss";
import { DefaultImage } from "../styles/scmps";
import { sVars } from "../ts/constants";
import getStories from "../graphql/queries/getStories";
import Spinner from "../components/Spinner";
import { RouteComponentProps } from "react-router-dom";
import Alert from "../components/Alert";
import GridStories from "../components/GridStories";

const Banner = styled(DefaultImage)`
  width: 100%;
  height: 300px;
  border-radius: 0%;
`;

const Avatar = styled(DefaultImage)`
  width: 10rem;
  height: 10rem;
`;

const Title = styled.span`
  font-size: 1.3rem;
  & > i {
    margin-right: 1rem;
    color: ${sVars.sc};
  }
`;

function Profile({
  history,
  location: { state },
}: RouteComponentProps<any, any, { published?: boolean }>) {
  const client = useApolloClient();
  const { loading, data } = useQuery<GetStoriesQuery, GetStoriesQueryVariables>(
    getStories,
    {
      variables: {
        type: StoryType.Private,
      },
    }
  );
  const user = client.readQuery<GetUserQuery>({
    query: getUser,
  })?.getUser.user as User;

  return (
    <div className="profile-container">
      <div
        style={{
          marginBottom: "0.5rem",
        }}
      >
        {state?.published && (
          <Alert
            message="Your story has been successfully published!"
            variant="success"
          />
        )}
      </div>
      <Banner src={user.banner ? user.banner.url! : "/images/noBanner.png"} />
      <div className="profile-container-image">
        <div className="profile-container-image-container">
          <Avatar
            src={user.avatar ? user.avatar.url! : "/images/noAvatar.jpg"}
          />
        </div>
        <span>
          <b style={{ color: sVars.sc }}>@</b>
          {user.name}
        </span>
      </div>
      <p>{user.bio}</p>
      {loading && <Spinner styles={{ left: "47%" }} />}
      {(data?.getStories.unpublished?.length || 0) > 0 && (
        <React.Fragment>
          <Title>
            <i className="fas fa-spinner" />
            UN-PUBLISHED
          </Title>
          <GridStories
            stories={data?.getStories.unpublished!}
            published={false}
          />
        </React.Fragment>
      )}
      {(data?.getStories.published?.length || 0) > 0 && (
        <div
          style={{
            marginTop: "5rem",
          }}
        >
          <Title>
            <i className="fab fa-usps" />
            PUBLISHED
          </Title>
          <GridStories stories={data?.getStories.published!} published={true} />
        </div>
      )}
    </div>
  );
}

export default Profile;
