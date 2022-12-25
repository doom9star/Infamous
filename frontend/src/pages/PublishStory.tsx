import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import produce from "immer";
import React from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import updateStory from "../graphql/mutations/updateStory";
import getStories from "../graphql/queries/getStories";
import getStory from "../graphql/queries/getStory";
import {
  GetStoryQuery,
  GetStoryQueryVariables,
  UpdateImageState,
  UpdateStoryMutation,
  UpdateStoryMutationVariables,
} from "../graphql/types";
import "../styles/publishStory.scss";
import { DefaultImage } from "../styles/scmps";
import { genres, sVars } from "../ts/constants";

const Thumbnail = styled(DefaultImage)`
  width: 100%;
  height: 300px;
  border-radius: 0%;
  margin: 2rem 0rem;
  box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.2);
`;

function PublishStory({
  match: {
    params: { sid },
    url,
  },
  history,
}: RouteComponentProps<{ sid: string }>) {
  const client = useApolloClient();
  const { data, loading } = useQuery<GetStoryQuery, GetStoryQueryVariables>(
    getStory,
    {
      variables: {
        sid,
      },
    }
  );
  const story = data?.getStory.story;
  const [uStory, { loading: uLoading }] = useMutation<
    UpdateStoryMutation,
    UpdateStoryMutationVariables
  >(updateStory);

  const [info, setInfo] = React.useState({
    genre: "",
    description: "",
  });

  const handlePublish = () => {
    const cleanedGenre =
      info.genre === ""
        ? "Unknown"
        : [...info.genre.matchAll(/\w+/g)].map((m) => m[0]).join(" ");
    uStory({
      variables: {
        sid,
        ...story!,
        thumbnail: null,
        thumbnailState: UpdateImageState.None,
        published: true,
        description: info.description,
        genre: cleanedGenre,
      },
      refetchQueries: [getStories],
    }).then(() => {
      client.writeQuery({
        query: getStory,
        variables: {
          sid,
        },
        data: {
          getStory: {
            story: produce(story!, (draft) => {
              draft.published = true;
              draft.description = info.description;
              draft.genre = cleanedGenre;
            }),
            status: 200,
          },
        },
      });
    });
    history.push({
      pathname: "/home/profile",
    });
  };

  if (loading || !data) return <Spinner />;
  if (!story) {
    history.push("/home/profile");
    return null;
  }
  return (
    <div className="publish-story-container">
      <span className="publish-story-container-header">
        <i className="fa fa-product-hunt" />
        ublish Story
      </span>
      <Thumbnail
        src={
          story.thumbnail?.url ? story.thumbnail.url : "/images/noBanner.png"
        }
      />
      <span className="publish-story-container-title">{story.title}</span>
      <div className="publish-story-container-genre">
        <Input
          icon="fas fa-dna"
          inputProps={{
            type: "text",
            placeholder: "Genre(s) eg: Horror, Comedy",
            name: "genre",
            value: info.genre,
            style: {
              padding: "0.5rem",
              width: "50%",
              marginLeft: "1rem",
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setInfo({ ...info, genre: e.target.value }),
            list: "genres",
          }}
        />
        <datalist id="genres">
          {genres.map((g) => (
            <option value={g}></option>
          ))}
        </datalist>
      </div>
      <div className="publish-story-container-description">
        <i className="fas fa-mortar-pestle" />
        <textarea
          value={info.description}
          placeholder="Write some meta description..."
          onChange={(e) => setInfo({ ...info, description: e.target.value })}
        ></textarea>
      </div>
      <div
        style={{
          padding: "2rem 0rem",
        }}
      >
        <Button
          label="&nbsp;Cancel"
          icon="fa fa-times"
          color={sVars.mc!}
          fill="outlined"
          buttonProps={{
            style: {
              padding: "0.7em 1em",
              marginRight: "1rem",
            },
            onClick: () => history.push(url.split("/").slice(0, -1).join("/")),
          }}
        />
        <Button
          label="&nbsp;Publish"
          icon="fa fa-product-hunt"
          color="white"
          bgColor={sVars.mc!}
          buttonProps={{
            style: { padding: "0.8em 1em" },
            onClick: handlePublish,
          }}
          loading={uLoading}
        />
      </div>
    </div>
  );
}

export default PublishStory;
