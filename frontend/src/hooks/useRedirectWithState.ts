import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const useRedirectWithState = () => {
  const history = useHistory();
  const route = useRouteMatch();
  const redirect = React.useCallback(
    (url: string) => {
      history.push({
        pathname: url,
        state: {
          from: route.url,
        },
      });
    },
    [history, route.url]
  );
  return redirect;
};
export default useRedirectWithState;
