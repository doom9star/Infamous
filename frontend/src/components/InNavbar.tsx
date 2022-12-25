import { useApolloClient } from "@apollo/client";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import getUser from "../graphql/queries/getUser";
import { GetUserQuery } from "../graphql/types";
import useLogout from "../hooks/useLogout";
import useRedirectWithState from "../hooks/useRedirectWithState";
import useScreen from "../hooks/useScreen";
import "../styles/inNavbar.scss";
import { DefaultImage } from "../styles/scmps";
import { sVars } from "../ts/constants";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Logo from "./Logo";

const Avatar = styled(DefaultImage)`
  width: 30px;
  height: 30px;
  border: 2px solid ${sVars.sc};
`;

function InNavbar({ history, location: { pathname } }: RouteComponentProps) {
  const activeBtn = pathname.split("/").slice(2).join("/");
  const { logout } = useLogout();
  const redirect = useRedirectWithState();
  const { isMobile, isDesktop } = useScreen();

  const client = useApolloClient();
  const user = client.readQuery<GetUserQuery>({
    query: getUser,
  })?.getUser.user;

  const profileDropdownItems = [
    {
      label: "Edit",
      icon: "fas fa-pen",
      click: () => redirect("/home/profile/edit"),
    },
    {
      label: "Logout",
      icon: "fas fa-sign-out-alt",
      click: async () => {
        await logout();
        history.push("/");
      },
    },
  ];
  const storiesDropdownItems = [
    {
      label: "New",
      icon: "fas fa-save",
      click: () => redirect("/home/stories/new"),
    },
  ];

  return (
    <Dropdown
      items={storiesDropdownItems}
      containerStyle={{ borderTop: "none" }}
      offset={[0, 40]}
    >
      {({ ref: storiesDRef }) => {
        return (
          <Dropdown
            items={profileDropdownItems}
            containerStyle={{ borderTop: "none" }}
            offset={[0, 40]}
          >
            {({ ref: profileDRef }) => {
              return (
                <div className="inNavbar-container">
                  <Logo color="white" />
                  <div className="inNavbar-container-btn">
                    {isMobile && (
                      <Button
                        icon="fas fa-bars"
                        color={sVars.sc!}
                        buttonProps={{
                          style: { fontSize: "120%" },
                        }}
                      />
                    )}
                    {isDesktop && (
                      <React.Fragment>
                        <span
                          style={{
                            color:
                              activeBtn === "stories" ? sVars.sc! : "white",
                          }}
                        >
                          <i
                            className="fas fa-chevron-down"
                            ref={storiesDRef}
                          />
                          <span
                            onClick={() => {
                              history.push("/home/stories");
                            }}
                          >
                            &nbsp;&nbsp;Stories
                          </span>
                        </span>
                        <span
                          style={{
                            color:
                              activeBtn === "settings" ? sVars.sc! : "white",
                          }}
                        >
                          <span
                            onClick={() => {
                              history.push("/home/settings");
                            }}
                          >
                            Settings
                          </span>
                        </span>
                        <span
                          style={{
                            color:
                              activeBtn === "profile" ? sVars.sc! : "white",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <i
                            className="fas fa-chevron-down"
                            style={{ marginRight: "10px" }}
                            ref={profileDRef}
                          />
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                            onClick={() => history.push("/home/profile")}
                          >
                            <Avatar
                              src={
                                user?.avatar
                                  ? user.avatar.url!
                                  : "/images/noAvatar.jpg"
                              }
                            />
                            <span style={{ marginLeft: "10px" }}>
                              <b style={{ color: sVars.sc, fontSize: "150%" }}>
                                @
                              </b>
                              {user?.name}
                            </span>
                          </div>
                        </span>
                      </React.Fragment>
                    )}
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

export default withRouter(InNavbar);
