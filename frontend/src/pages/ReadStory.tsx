import { useQuery } from "@apollo/client";
import { ContentState, EditorState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { RouteComponentProps } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import getStory from "../graphql/queries/getStory";
import { GetStoryQuery, GetStoryQueryVariables } from "../graphql/types";
import { DefaultImage } from "../styles/scmps";
import "../styles/read&editStory.scss";
import { sVars } from "../ts/constants";

const ThumbnailContainer = styled.div`
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  padding: 5px;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

const Thumbnail = styled(DefaultImage)`
  width: 100%;
  height: 100%;
`;

const Title = styled.p`
  padding: 1rem;
  &:focus {
    outline: none;
  }
`;

function ReadStory({
  history,
  match: {
    params: { sid },
    url,
  },
}: RouteComponentProps<{ sid: string }>) {
  const { loading, data } = useQuery<GetStoryQuery, GetStoryQueryVariables>(
    getStory,
    {
      variables: {
        sid,
      },
    }
  );
  const story = data?.getStory.story;

  const [editorStates, setEditorStates] = React.useState<EditorState[]>([]);
  const [details, setDetails] = React.useState({
    curPage: 1,
  });

  React.useEffect(() => {
    if (story) {
      setEditorStates(
        story!.pages.map((p) =>
          EditorState.createWithContent(
            ContentState.createFromBlockArray(htmlToDraft(p).contentBlocks)
          )
        )
      );
    }
  }, [story]);

  if (loading) return <Spinner />;

  if (!story) {
    history.push("/home/profile");
    return null;
  }

  return (
    <React.Fragment>
      <ReactTooltip place="top" backgroundColor={sVars.mc!} effect="solid" />
      <div className="read-story-container">
        <div className="read-story-container-header">
          <ThumbnailContainer>
            <Thumbnail
              src={
                story.thumbnail?.url
                  ? story.thumbnail.url
                  : "/images/noBanner.png"
              }
            />
          </ThumbnailContainer>
          <Title spellCheck={false}>{story.title}</Title>
        </div>
        <div className="read-story-container-mainbar">
          <i
            className="fas fa-arrow-left"
            onClick={() => {
              if (details.curPage > 1)
                setDetails({ ...details, curPage: details.curPage - 1 });
            }}
          ></i>
          <span>
            {details.curPage}/{editorStates.length}
          </span>
          <i
            className="fas fa-arrow-right"
            style={{ marginRight: "auto" }}
            onClick={() => {
              if (details.curPage < editorStates.length)
                setDetails({ ...details, curPage: details.curPage + 1 });
            }}
          ></i>
          <Button
            label="&nbsp;Back"
            icon="fas fa-arrow-left"
            color={sVars.mc!}
            fill="outlined"
            buttonProps={{
              style: {
                padding: "0.8em 1em",
                marginRight: "10px",
              },
              onClick: () => history.push(url.replace("read", "view")),
            }}
          />
        </div>
        <Editor
          editorState={editorStates[details.curPage - 1]}
          editorClassName="read-story-container-editor"
          readOnly={true}
          toolbarHidden={true}
        />
      </div>
    </React.Fragment>
  );
}

export default ReadStory;
