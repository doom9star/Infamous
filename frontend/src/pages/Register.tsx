import { useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Button from "../components/Button";
import ExNavbar from "../components/ExNavbar";
import Input from "../components/Input";
import Logo from "../components/Logo";
import registerMutation from "../graphql/mutations/register";
import getUser from "../graphql/queries/getUser";
import {
  GetUserQuery,
  RegisterMutation,
  RegisterMutationVariables,
} from "../graphql/types";
import "../styles/form.scss";
import { sVars } from "../ts/constants";

function Register({ history }: RouteComponentProps) {
  const client = useApolloClient();
  const user = client.readQuery<GetUserQuery>({
    query: getUser,
  })?.getUser.user;
  if (user) history.push("/home/stories");

  const [login, { loading }] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(registerMutation);
  const [info, setInfo] = React.useState<RegisterMutationVariables>({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const { data } = await login({ variables: info });
    if (data?.register.status === 200) {
      client.writeQuery({
        query: getUser,
        data: {
          getUser: {
            user: data.register.user,
            status: 200,
          },
        },
      });
      history.push("/home/stories");
    }
  };

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  return (
    <>
      <ExNavbar />
      <div className="form-container">
        <div className="form-container-wrapper">
          <Logo color="black" />
          <Input
            icon="fas fa-signature"
            inputProps={{
              type: "text",
              placeholder: "Name",
              autoFocus: true,
              name: "name",
              value: info.name,
              onChange: handleChange,
            }}
          />
          <Input
            icon="fas fa-envelope"
            inputProps={{
              type: "text",
              placeholder: "Email",
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
              label="Register"
              color="white"
              bgColor={sVars.mc!}
              buttonProps={{
                onClick: handleRegister,
              }}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
