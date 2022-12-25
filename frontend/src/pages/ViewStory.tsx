import { useQuery } from "@apollo/client";
import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import { DefaultImage } from "../styles/scmps";
import { GetStoryQuery, GetStoryQueryVariables } from "../graphql/types";
import Spinner from "../components/Spinner";
import getStory from "../graphql/queries/getStory";
import Button from "../components/Button";
import { sVars } from "../ts/constants";
import "../styles/viewStory.scss";

const Thumbnail = styled(DefaultImage)`
  height: 300px;
  width: 100%;
  border-radius: 0%;
  box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.2);
`;

const AvatarContainer = styled.div`
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  padding: 3px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const Avatar = styled(DefaultImage)`
  width: 100%;
  height: 100%;
`;

function ViewStory({
  match: {
    params: { sid },
  },
  location: { state },
  history,
}: RouteComponentProps<{ sid: string }, any, { from?: string }>) {
  console.log(sid);
  const { data, loading } = useQuery<GetStoryQuery, GetStoryQueryVariables>(
    getStory,
    {
      variables: {
        sid,
      },
    }
  );
  const story = data?.getStory.story;

  if (loading || !data) return <Spinner />;
  console.log(data);
  if (!story) {
    //   history.push("/home/profile");
    return null;
  }
  return (
    <div className="view-story-container">
      <div className="view-story-container-header">
        <AvatarContainer>
          <Avatar
            src={
              story.user?.avatar?.url && !story.user.anonymous
                ? story.user.avatar.url
                : "/images/noAvatar.jpg"
            }
          />
        </AvatarContainer>
        <span style={{ marginLeft: "1rem" }}>
          {story.user?.anonymous ? "Anonymous" : story.user?.name}
        </span>
        <div className="view-story-container-btns">
          <Button
            label="&nbsp;Back"
            icon="fa fa-arrow-left"
            color={sVars.mc!}
            fill="outlined"
            buttonProps={{
              style: {
                padding: "0.7em 1em",
                marginRight: "1rem",
              },
              onClick: () =>
                history.push(state?.from ? state.from : "/home/stories"),
            }}
          />
          <Button
            label="&nbsp;Read"
            icon="fa fa-book-open"
            color="white"
            bgColor={sVars.mc!}
            buttonProps={{
              style: { padding: "0.8em 1em" },
              onClick: () => history.push(`/home/stories/read/${sid}`),
            }}
          />
        </div>
      </div>
      {story.thumbnail?.url && <Thumbnail src={story.thumbnail.url} />}
      <p className="view-story-container-title">{story.title}</p>
      {story.description && (
        <p style={{ margin: "2rem 0rem" }}>{story.description}</p>
      )}
      {story.genre && (
        <p className="view-story-container-genre">
          <i className="fas fa-dna" style={{ color: sVars.sc }} /> &nbsp;
          {story.genre}
        </p>
      )}
    </div>
  );
}

export default ViewStory;
