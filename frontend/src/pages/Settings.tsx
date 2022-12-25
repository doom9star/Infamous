import { useMutation } from "@apollo/client";
import React from "react";
import Spinner from "../components/Spinner";
import deleteUser from "../graphql/mutations/deleteUser";
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from "../graphql/types";
import useLogout from "../hooks/useLogout";
import "../styles/settings.scss";
import { sVars } from "../ts/constants";

function Settings() {
  const { logout, loading: logoutLoading } = useLogout();
  const [dUser, { loading: deleteUserLoading }] = useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(deleteUser);
  if (logoutLoading || deleteUserLoading) return <Spinner />;
  return (
    <div className="settings-container">
      <p className="settings-container-header">
        <i className="fas fa-cog" style={{ color: sVars.sc }} />
        &nbsp;Settings
      </p>
      <div className="settings-container-item" onClick={logout}>
        <i className="fas fa-user-slash" />
        <div>
          <p>Deactivate Account</p>
          <p>Your account will be re-activated when you login!</p>
        </div>
      </div>
      <div
        className="settings-container-item"
        onClick={() => dUser().then(() => logout())}
      >
        <i className="fas fa-user-times" />
        <div>
          <p>Delete Account</p>
          <p>Your account will be permanently deleted and non-recoverable!</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
