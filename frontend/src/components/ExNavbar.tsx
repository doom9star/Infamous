import React from "react";
import Logo from "./Logo";
import { useHistory } from "react-router-dom";
import "../styles/exNavbar.scss";
import useLogout from "../hooks/useLogout";
import Button from "./Button";
import { sVars } from "../ts/constants";
import { useApolloClient } from "@apollo/client";
import getUser from "../graphql/queries/getUser";
import { GetUserQuery } from "../graphql/types";

function ExNavbar() {
  const history = useHistory();
  const client = useApolloClient();
  const user = client.readQuery<GetUserQuery>({
    query: getUser,
  })?.getUser.user;
  const { logout, loading } = useLogout();
  return (
    <div className="exNavbar-container">
      <div className="exNavbar-container-btn">
        {!user ? (
          <>
            <Button
              label="Login"
              color={sVars.mc!}
              bgColor="white"
              buttonProps={{
                onClick: () => history.push("/login"),
              }}
            />
            <Button
              label="Register"
              color="white"
              bgColor={sVars.mc!}
              fill="outlined"
              buttonProps={{
                onClick: () => history.push("/register"),
              }}
            />
          </>
        ) : (
          <>
            <Button
              label="&nbsp;Home"
              icon="fas fa-home"
              color={sVars.mc!}
              bgColor="white"
              buttonProps={{
                onClick: () => history.push("/home/stories"),
              }}
            />
            <Button
              label="Logout"
              color="white"
              bgColor={sVars.mc!}
              fill="outlined"
              buttonProps={{
                onClick: logout,
              }}
              loading={loading}
              spinnerStyles={{ top: "25%", left: "40%" }}
            />
          </>
        )}
      </div>
      <Logo color="white" styles={{ float: "right", margin: "1em 2.5em" }} />
    </div>
  );
}

export default ExNavbar;
