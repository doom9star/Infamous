import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import produce from "immer";
import React, { ChangeEvent } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { RouteComponentProps } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Spinner from "../components/Spinner";
import updateStory from "../graphql/mutations/updateStory";
import getStory from "../graphql/queries/getStory";
import {
  GetStoryQuery,
  GetStoryQueryVariables,
  UpdateImageState,
  UpdateStoryMutation,
  UpdateStoryMutationVariables,
} from "../graphql/types";
import "../styles/read&editStory.scss";
import { DefaultImage } from "../styles/scmps";
import { sVars } from "../ts/constants";
import { Utils } from "../ts/utils";

const ThumbnailContainer = styled.div`
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  padding: 3px;
  position: relative;
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

const EditIcon = styled.i`
  position: absolute;
  left: -20%;
  top: -5%;
`;

const PageOptionsContainer = styled.div`
  animation: slideLeft 200ms linear;
`;

function EditStory({
  history,
  match: {
    params: { sid },
    url,
  },
}: RouteComponentProps<{ sid: string }>) {
  const client = useApolloClient();
  const { loading, data } = useQuery<GetStoryQuery, GetStoryQueryVariables>(
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

  const EditorRef = React.useRef<object | null>(null);
  const [editorStates, setEditorStates] = React.useState<EditorState[]>([]);
  const [saved, setSaved] = React.useState(true);
  const [showPageOptions, setShowPageOptions] = React.useState(false);
  const titleRef = React.useRef<HTMLDivElement | null>(null);
  const [details, setDetails] = React.useState({
    curPage: 1,
  });

  const [thumbnail, setThumbnail] = React.useState<{
    file: File | null;
    uri: string | null;
    state: UpdateImageState;
  }>({
    file: null,
    uri: null,
    state: UpdateImageState.None,
  });
  const thumbnailRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (story) {
      titleRef.current!.innerText = story.title;
      setThumbnail((prev) => ({ ...prev, uri: story.thumbnail?.url || null }));
      setEditorStates(
        story!.pages.map((p) =>
          EditorState.createWithContent(
            ContentState.createFromBlockArray(htmlToDraft(p).contentBlocks)
          )
        )
      );
    }
  }, [story]);

  const getEditorString = React.useCallback((state: EditorState) => {
    return draftToHtml(convertToRaw(state.getCurrentContent()));
  }, []);

  const handleThumbnailChange = React.useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setSaved(false);
      const image = e.target.files![0];
      const dataURI = await Utils.readFile(image);
      setThumbnail({
        file: image,
        uri: dataURI,
        state: UpdateImageState.Update,
      });
    },
    []
  );

  const handleThumbnailRemove = React.useCallback(() => {
    setSaved(false);
    setThumbnail({
      file: null,
      uri: null,
      state: UpdateImageState.Remove,
    });
  }, []);

  const handleSave = () => {
    uStory({
      variables: {
        sid,
        ...story!,
        title: titleRef.current!.innerText,
        pages: editorStates.map((s) => getEditorString(s)),
        thumbnail: thumbnail.file,
        thumbnailState: thumbnail.state,
      },
    }).then(() => {
      client.writeQuery({
        query: getStory,
        variables: {
          sid,
        },
        data: {
          getStory: {
            story: produce(story!, (draft) => {
              draft.thumbnail = thumbnail.uri ? { url: thumbnail.uri } : null;
              draft.title = titleRef.current!.innerText;
              draft.pages = editorStates.map((s) => getEditorString(s));
            }),
          },
        },
      });
      setSaved(true);
    });
  };

  const thumbnailItems = [
    {
      label: "Change",
      icon: "fas fa-plus",
      click: () => thumbnailRef.current!.click(),
    },
    thumbnail.uri
      ? {
          label: "Remove",
          icon: "fas fa-minus",
          click: handleThumbnailRemove,
        }
      : null,
  ];

  if (loading) return <Spinner />;

  if (!story) {
    history.push("/home/profile");
    return null;
  }

  return (
    <React.Fragment>
      <ReactTooltip place="top" backgroundColor={sVars.mc!} effect="solid" />
      <Dropdown items={thumbnailItems} offset={[0, 5]}>
        {({ ref }) => {
          return (
            <div className="edit-story-container">
              <input
                type="file"
                hidden
                ref={thumbnailRef}
                onChange={handleThumbnailChange}
                accept="image/*"
              />
              <div className="edit-story-container-header">
                <ThumbnailContainer
                  style={{
                    border: `2px inset ${
                      saved ? "rgb(0, 200, 0)" : "rgb(200, 0, 0)"
                    }`,
                  }}
                >
                  <EditIcon className="fas fa-pencil-alt" ref={ref} />
                  <Thumbnail
                    src={thumbnail.uri ? thumbnail.uri : "/images/noBanner.png"}
                  />
                </ThumbnailContainer>
                <Title
                  contentEditable
                  ref={titleRef}
                  spellCheck={false}
                  onInput={(e) => {
                    setSaved(false);
                  }}
                />
              </div>
              <div className="edit-story-container-mainbar">
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
                {showPageOptions && (
                  <PageOptionsContainer>
                    <Button
                      icon="fas fa-trash-alt"
                      color={sVars.mc!}
                      fill="outlined"
                      buttonProps={{
                        style: {
                          padding: "0.8em 1em",
                          marginRight: "10px",
                          borderRadius: "100%",
                        },
                        "data-tip": "Delete",
                        onClick: () => {
                          if (editorStates.length > 1) {
                            setEditorStates(
                              editorStates.filter(
                                (_, idx) => idx !== details.curPage - 1
                              )
                            );
                            setDetails({
                              ...details,
                              curPage:
                                details.curPage > 1
                                  ? details.curPage - 1
                                  : details.curPage === 1
                                  ? details.curPage
                                  : details.curPage + 1,
                            });
                          }
                        },
                      }}
                      hasToolTip={true}
                    />
                    <Button
                      icon="fas fa-file"
                      color={sVars.mc!}
                      fill="outlined"
                      buttonProps={{
                        style: {
                          padding: "0.8em 1em",
                          borderRadius: "100%",
                        },
                        "data-tip": "New",
                        onClick: () => {
                          new Promise<void>((res) => {
                            setEditorStates([
                              ...editorStates,
                              EditorState.createEmpty(),
                            ]);
                            res();
                          }).then(() => {
                            setDetails({
                              ...details,
                              curPage: editorStates.length + 1,
                            });
                            (EditorRef.current as any).focus();
                          });
                        },
                      }}
                      hasToolTip={true}
                    />
                  </PageOptionsContainer>
                )}
                <Button
                  icon="fas fa-chevron-left"
                  color={sVars.mc!}
                  fill="contained"
                  buttonProps={{
                    style: {
                      marginRight: "10px",
                    },
                    onClick: () => setShowPageOptions(!showPageOptions),
                  }}
                />
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
                    onClick: () => history.push("/home/profile"),
                  }}
                />
                <Button
                  label="&nbsp;Save"
                  icon="fas fa-save"
                  color={sVars.mc!}
                  fill="outlined"
                  buttonProps={{
                    style: {
                      padding: "0.8em 1em",
                      marginRight: "10px",
                    },
                    onClick: handleSave,
                  }}
                  loading={uLoading}
                />
                <Button
                  label="&nbsp;Publish"
                  icon="fa fa-product-hunt"
                  color="white"
                  bgColor={sVars.mc!}
                  buttonProps={{
                    style: { padding: "0.8em 1em" },
                    onClick: () => history.push(`${url}/publish`),
                  }}
                />
              </div>
              <div
                onKeyDown={(e) => {
                  if (e.key.length === 1 || e.keyCode === 8 || e.keyCode === 13)
                    setSaved(false);
                }}
              >
                <Editor
                  editorState={editorStates[details.curPage - 1]}
                  editorClassName="edit-story-container-editor"
                  onEditorStateChange={(state) => {
                    setEditorStates(
                      produce(editorStates, (draft) => {
                        draft[details.curPage - 1] = state;
                      })
                    );
                  }}
                  editorRef={(ref) => (EditorRef.current = ref)}
                />
              </div>
            </div>
          );
        }}
      </Dropdown>
    </React.Fragment>
  );
}

export default EditStory;
