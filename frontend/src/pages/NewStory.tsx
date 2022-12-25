import { useMutation } from "@apollo/client";
import React, { ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import Logo from "../components/Logo";
import createStory from "../graphql/mutations/createStory";
import getStories from "../graphql/queries/getStories";
import {
  CreateStoryArgs,
  CreateStoryMutation,
  CreateStoryMutationVariables,
} from "../graphql/types";
import { DefaultEditIcon, DefaultImage } from "../styles/scmps";
import { sVars } from "../ts/constants";
import { Utils } from "../ts/utils";

const Thumbnail = styled(DefaultImage)`
  width: 100%;
  height: 200px;
  border-radius: 0%;
`;

const ThumbnailEditIcon = styled(DefaultEditIcon)`
  right: 10%;
  top: 45%;
`;

function NewStory({
  history,
  location: { state },
}: RouteComponentProps<any, any, { from?: string }>) {
  const thumbnailRef = React.useRef<HTMLInputElement | null>(null);
  const [thumbnail, setThumbnail] = React.useState<{
    file: File | null;
    uri: string | null;
  }>({
    file: null,
    uri: null,
  });
  const handleThumbnailChange = React.useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const image = e.target.files![0];
      const dataURI = await Utils.readFile(image);
      setThumbnail({
        file: image,
        uri: dataURI,
      });
    },
    []
  );

  const handleThumbnailRemove = React.useCallback(() => {
    setThumbnail({
      file: null,
      uri: null,
    });
  }, []);

  const [info, setInfo] = React.useState<CreateStoryArgs>({
    title: "",
  });
  const [cStory, { loading }] = useMutation<
    CreateStoryMutation,
    CreateStoryMutationVariables
  >(createStory);

  const handleCreate = () => {
    cStory({
      variables: { ...info, thumbnail: thumbnail.file },
      refetchQueries: [getStories],
    }).then(({ data }) => {
      history.push("/home/stories/edit/" + data?.createStory.id);
    });
  };

  const thumbnailItems = [
    {
      label: "Change",
      icon: "fas fa-plus",
      click: () => {
        thumbnailRef.current!.click();
      },
    },
    thumbnail.uri
      ? {
          label: "Remove",
          icon: "fas fa-minus",
          click: handleThumbnailRemove,
        }
      : null,
  ];

  return (
    <Dropdown items={thumbnailItems} offset={[0, 5]}>
      {({ ref }) => {
        return (
          <div className="form-container" style={{ height: "80vh" }}>
            <input
              type="file"
              hidden
              ref={thumbnailRef}
              onChange={handleThumbnailChange}
              accept="image/*"
            />
            <div className="form-container-wrapper">
              <Logo color="black" styles={{ margin: "10px 0px 30px 0px" }} />
              <Input
                icon="fas fa-signature"
                inputProps={{
                  type: "text",
                  placeholder: "Title",
                  name: "title",
                  value: info.title,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setInfo((prev) => ({ ...prev, title: e.target.value })),
                }}
              />
              <span style={{ margin: "20px 0px 10px 0px", fontSize: "80%" }}>
                <i className="fas fa-image" style={{ marginRight: "1em" }}></i>{" "}
                Thumbnail
              </span>
              <ThumbnailEditIcon className="fas fa-pencil-alt" ref={ref} />
              <Thumbnail
                src={thumbnail.uri ? thumbnail.uri : "/images/noBanner.png"}
              />
              <div className="form-container-wrapper-btn">
                <Button
                  label="Create"
                  color="white"
                  bgColor={sVars.sc!}
                  buttonProps={{
                    onClick: handleCreate,
                  }}
                  loading={loading}
                />
                <Button
                  label="Cancel"
                  color={sVars.mc!}
                  fill="outlined"
                  buttonProps={{
                    onClick: () => history.push(state?.from || "/home/stories"),
                  }}
                />
              </div>
            </div>
          </div>
        );
      }}
    </Dropdown>
  );
}

export default NewStory;
