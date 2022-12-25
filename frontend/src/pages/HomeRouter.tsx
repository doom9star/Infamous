import React from "react";
import { useApolloClient } from "@apollo/client";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import InNavbar from "../components/InNavbar";
import Edit from "./Edit";
import EditStory from "./EditStory";
import NewStory from "./NewStory";
import Profile from "./Profile";
import Settings from "./Settings";
import Stories from "./Stories";
import { GetUserQuery } from "../graphql/types";
import getUser from "../graphql/queries/getUser";
import PublishStory from "./PublishStory";
import ReadStory from "./ReadStory";
import ViewStory from "./ViewStory";

function HomeRouter({ history }: RouteComponentProps) {
  const client = useApolloClient();
  const user = client.readQuery<GetUserQuery>({
    query: getUser,
  })?.getUser.user;
  if (!user) history.push("/");
  return (
    <>
      <InNavbar />
      <div id="main">
        <Switch>
          <Route exact path="/home/stories" component={Stories} />
          <Route exact path="/home/stories/new" component={NewStory} />
          <Route exact path="/home/stories/view/:sid" component={ViewStory} />
          <Route exact path="/home/stories/read/:sid" component={ReadStory} />
          <Route exact path="/home/stories/edit/:sid" component={EditStory} />
          <Route
            exact
            path="/home/stories/edit/:sid/publish"
            component={PublishStory}
          />
          <Route exact path="/home/profile" component={Profile} />
          <Route exact path="/home/profile/edit" component={Edit} />
          <Route exact path="/home/settings" component={Settings} />
          <Redirect from="/home" to="/home/stories" />
          <Redirect from="/edit" to="/home/stories" />
        </Switch>
      </div>
    </>
  );
}

export default HomeRouter;
