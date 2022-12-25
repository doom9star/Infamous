import { useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router-dom";
import logoutMutation from "../graphql/mutations/logout";

export default function useLogout() {
  const history = useHistory();
  const client = useApolloClient();
  const [mLogout, { loading }] = useMutation(logoutMutation);
  const logout = React.useCallback(async () => {
    await mLogout();
    await client.clearStore();
    history.replace("/");
  }, [mLogout, history, client]);
  return { logout, loading };
}
