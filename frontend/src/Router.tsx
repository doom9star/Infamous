import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeRouter from "./pages/HomeRouter";
import getUser from "./graphql/queries/getUser";
import { GetUserQuery } from "./graphql/types";
import Spinner from "./components/Spinner";

function Router() {
  const { loading } = useQuery<GetUserQuery>(getUser);

  if (loading) return <Spinner />;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path="/home" component={HomeRouter} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
