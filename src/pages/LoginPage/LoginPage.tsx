import React, { lazy } from "react";
import { Image, Col, Row } from "react-bootstrap";
import { LoginForm, ErrorDialog, Breadcrumb } from "../../components/";
import { LoginRequest } from "../../services/axios-wrappers";
import "./LoginPage.scoped.scss";
import { useError, useRedirect, useUser } from "../../hooks";
import { Redirect } from "react-router-dom";
import withSuspense from "../../HOC/withSuspense";

export default function LoginPage() {
  const { error } = useError();
  const { loggedIn, login } = useUser();
  const { redirect } = useRedirect();

  if (loggedIn) return <Redirect to="/" />;

  const handleLogin = (model: LoginRequest) => {
    Promise.resolve(login(model)).then(() => {
      redirect("/profilom");
    });
  };

  const Form = withSuspense(lazy<typeof LoginForm>(() => LoginForm));

  return (
    <>
      <Breadcrumb
        paths={[
          { pathName: "Főoldal", pathUrl: "/" },
          { pathName: "Bejelentkezési felület", pathUrl: "/belepes" },
        ]}
      />
      <Row noGutters className="justify-content-center">
        <Col xs={12} lg={6} className="my-auto">
          <fieldset className="border rounded p-3">
            <legend>Bejelentkezés</legend>
            <Form />
            <ErrorDialog error={error} />
          </fieldset>
        </Col>
        <Col xs={12} lg={{ span: 3, offset: 3 }}>
          <Image
            fluid
            src="images/girl-sidebar.jpg "
            className="sidebar-image"
          />
        </Col>
      </Row>
    </>
  );
}
