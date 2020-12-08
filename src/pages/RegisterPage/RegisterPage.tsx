import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Breadcrumb, RegisterForm } from "../../components/";
import { useError, useRedirect, useTitle, useUser } from "../../hooks";
import "./RegisterPage.scoped.scss";

export default function RegisterPage() {
  const { error } = useError();
  const { user, loggedIn } = useUser();
  const { redirect } = useRedirect();
  useTitle("Regisztráció");

  useEffect(() => {
    if (loggedIn) {
      redirect("/profilom");
    }
  }, []);

  return (
    <>
      <Breadcrumb
        paths={[
          { pathName: "Főoldal", pathUrl: "/" },
          { pathName: "Regisztrációs felület", pathUrl: "/regisztracio" },
        ]}
      />
      <Container>
        <Row>
          <Col lg={8}>
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}
