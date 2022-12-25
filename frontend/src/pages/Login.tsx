import { useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import ExNavbar from "../components/ExNavbar";
import Input from "../components/Input";
import Logo from "../components/Logo";
import loginMutation from "../graphql/mutations/login";
import getUser from "../graphql/queries/getUser";
import {
  GetUserQuery,
  LoginMutation,
  LoginMutationVariables,
} from "../graphql/types";
import "../styles/form.scss";
import { sVars } from "../ts/constants";

function Login({ history }: RouteComponentProps) {
  const client = useApolloClient();
  const user = client.readQuery<GetUserQuery>({
    query: getUser,
  })?.getUser.user;
  if (user) history.push("/home/stories");

  const [login, { loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(loginMutation);
  const [info, setInfo] = React.useState<LoginMutationVariables>({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");

  const handleLogin = async () => {
    setError("");
    const { data } = await login({ variables: info });
    if (data?.login.status === 200) {
      client.writeQuery({
        query: getUser,
        data: {
          getUser: {
            user: data.login.user,
            status: 200,
          },
        },
      });
      history.push("/home/stories");
    } else if (data?.login.status === 404) setError("User doesn't exist!");
    else if (data?.login.status === 401) setError("Wrong crendentials!");
  };

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  return (
    <React.Fragment>
      <ExNavbar />
      <div className="form-container">
        <div className="form-container-wrapper">
          {error && <Alert message={error} variant="error" />}
          <Logo color="black" />
          <Input
            icon="fas fa-envelope"
            inputProps={{
              type: "text",
              placeholder: "Email",
              autoFocus: true,
              name: "email",
              value: info.email,
              onChange: handleChange,
            }}
          />
          <Input
            icon="fas fa-lock"
            inputProps={{
              type: "password",
              placeholder: "Password",
              name: "password",
              value: info.password,
              onChange: handleChange,
            }}
          />
          <div className="form-container-wrapper-btn">
            <Button
              label="Login"
              color="white"
              bgColor={sVars.mc!}
              buttonProps={{
                onClick: handleLogin,
              }}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
