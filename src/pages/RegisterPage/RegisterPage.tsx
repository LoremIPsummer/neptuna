import React, { useEffect } from "react";
import { Col, Container, Row, Image, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Breadcrumb, ErrorDialog, RegisterForm } from "../../components/";
import { Theme } from "../../context/ThemeContext";
import { useError, useRedirect, useTitle, useUser } from "../../hooks";
import { useTheme } from "../../hooks/useTheme";
import { RegisterRequest } from "../../services/axios-wrappers";

export default function RegisterPage() {
  const { error } = useError();
  const { loggedIn, register } = useUser();
  useTitle("Regisztráció");

  if (loggedIn) {
    return <Redirect to="/profilom" />;
  }

  return (
    <>
      <Breadcrumb
        paths={[
          { pathName: "Főoldal", pathUrl: "/" },
          { pathName: "Regisztrációs felület", pathUrl: "/regisztracio" },
        ]}
      />
      <Container fluid>
        <Row noGutters>
          <Col xs={12} lg={4}>
            <RegisterForm register={(req: RegisterRequest) => register(req)} />
            <ErrorDialog error={error} />
          </Col>
          <Col xs={12} lg={6} className="m-auto d-none d-lg-block">
            <Card className="mx-auto">
              <Card.Body>
                <Image thumbnail rounded src="/images/susu.jpg" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
