import { useApolloClient, useMutation } from "@apollo/client";
import React, { ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import Switch from "react-switch";
import styled from "styled-components";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import Logo from "../components/Logo";
import updateUser from "../graphql/mutations/updateUser";
import getUser from "../graphql/queries/getUser";
import {
  GetUserQuery,
  UpdateImageState,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "../graphql/types";
import "../styles/form.scss";
import { DefaultEditIcon, DefaultImage } from "../styles/scmps";
import { sVars } from "../ts/constants";
import { Utils } from "../ts/utils";

const SwitchContainer = styled.div`
  justify-content: space-between !important;

  & > span {
    font-size: 90%;
  }
`;

const Avatar = styled(DefaultImage)`
  width: 100px;
  height: 100px;
  align-self: center;
  margin: 1em 0em;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const Banner = styled(DefaultImage)`
  width: 100%;
  height: 200px;
  border-radius: 0%;
`;

const AvatarEditIcon = styled(DefaultEditIcon)`
  right: 37%;
  top: 15%;
`;

const BannerEditIcon = styled(DefaultEditIcon)`
  right: 10%;
  top: 58%;
`;

enum DropdownType {
  AVATAR = "avatar",
  BANNER = "banner",
}

function Edit({
  history,
  location: { state },
}: RouteComponentProps<any, any, { from?: string }>) {
  const client = useApolloClient();
  const user = client.readQuery<GetUserQuery>({
    query: getUser,
  })?.getUser.user!;

  const [images, setImages] = React.useState({
    avatar: {
      file: null,
      uri: user.avatar?.url || null,
      state: UpdateImageState.None,
    },
    banner: {
      file: null,
      uri: user.banner?.url || null,
      state: UpdateImageState.None,
    },
  });

  const [uUser, { loading }] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUser);
  const [info, setInfo] = React.useState({
    bio: user.bio,
    anonymous: user.anonymous,
  });

  const imageInputRef = React.useRef<HTMLInputElement | null>(null);
  const [curDropdown, setCurDropdown] = React.useState<DropdownType | null>(
    null
  );

  const handleImageChange = React.useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const image = e.target.files![0];
      const dataURI = await Utils.readFile(image);
      setImages((prev) => ({
        ...prev,
        [curDropdown!]: {
          file: image,
          uri: dataURI,
          state: UpdateImageState.Update,
        },
      }));
    },
    [curDropdown]
  );
  const handleImageRemove = React.useCallback(() => {
    setImages((prev) => ({
      ...prev,
      [curDropdown!]: {
        file: null,
        uri: null,
        state: UpdateImageState.Remove,
      },
    }));
  }, [curDropdown]);

  const handleSave = () => {
    uUser({
      variables: {
        ...info,
        avatarState: images.avatar.state,
        bannerState: images.banner.state,
        avatar: images.avatar.file,
        banner: images.banner.file,
      },
      refetchQueries: [getUser],
    }).then(() => {
      history.push(state.from || "/home/profile");
    });
  };

  const dropdownItems = {
    [DropdownType.AVATAR]: [
      {
        label: "Change",
        icon: "fas fa-plus",
        click: () => imageInputRef.current!.click(),
      },
      images.avatar.uri
        ? {
            label: "Remove",
            icon: "fas fa-minus",
            click: handleImageRemove,
          }
        : null,
    ],
    [DropdownType.BANNER]: [
      {
        label: "Change",
        icon: "fas fa-plus",
        click: () => imageInputRef.current!.click(),
      },
      images.banner.uri
        ? {
            label: "Remove",
            icon: "fas fa-minus",
            click: handleImageRemove,
          }
        : null,
    ],
  };

  return (
    <Dropdown items={dropdownItems[DropdownType.BANNER]} offset={[0, 5]}>
      {({ ref: bannerDRef }) => {
        return (
          <Dropdown items={dropdownItems[DropdownType.AVATAR]} offset={[10, 5]}>
            {({ ref: avatarDRef }) => {
              return (
                <div className="form-container">
                  <input
                    type="file"
                    hidden
                    ref={imageInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div className="form-container-wrapper">
                    <Logo color="black" />
                    <Avatar
                      src={
                        images.avatar.uri
                          ? images.avatar.uri
                          : "/images/noAvatar.jpg"
                      }
                    />
                    <AvatarEditIcon
                      className="fas fa-pencil-alt"
                      ref={avatarDRef}
                      onClick={() => setCurDropdown(DropdownType.AVATAR)}
                    />
                    <Input
                      icon="fas fa-signature"
                      inputProps={{
                        type: "text",
                        placeholder: "Name",
                        name: "name",
                        value: user.name,
                        disabled: true,
                      }}
                    />
                    <Input
                      icon="fas fa-biohazard"
                      inputProps={{
                        type: "text",
                        placeholder: "Something about you...",
                        name: "bio",
                        value: info.bio || "",
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                          setInfo((prev) => ({ ...prev, bio: e.target.value })),
                      }}
                    />
                    <SwitchContainer>
                      <span>
                        <i
                          className="fas fa-user-secret"
                          style={{ paddingRight: "1em", paddingLeft: "0.3em" }}
                        ></i>
                        &nbsp;&nbsp;anonymous
                      </span>
                      <Switch
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onColor={sVars.mc}
                        activeBoxShadow={"0px 0px 1px 2px " + sVars.sc}
                        onChange={(anonymous) =>
                          setInfo((prev) => ({ ...prev, anonymous }))
                        }
                        checked={info.anonymous}
                      />
                    </SwitchContainer>
                    <BannerEditIcon
                      className="fas fa-pencil-alt"
                      ref={bannerDRef}
                      onClick={() => setCurDropdown(DropdownType.BANNER)}
                    />
                    <Banner
                      src={
                        images.banner.uri
                          ? images.banner.uri
                          : "/images/noBanner.png"
                      }
                    />
                    <div className="form-container-wrapper-btn">
                      <Button
                        label="Save"
                        color="white"
                        bgColor={sVars.sc!}
                        buttonProps={{
                          onClick: handleSave,
                        }}
                        loading={loading}
                      />
                      <Button
                        label="Back"
                        color={sVars.mc!}
                        fill="outlined"
                        buttonProps={{
                          onClick: () =>
                            history.push(state?.from || "/home/profile"),
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            }}
          </Dropdown>
        );
      }}
    </Dropdown>
  );
}

export default Edit;
