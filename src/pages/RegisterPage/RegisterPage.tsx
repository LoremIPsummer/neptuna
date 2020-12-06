import { push } from "connected-react-router";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { error } from "../../app/features/errorApi";
import { currentUser } from "../../app/features/userApi";
import { Breadcrumb, RegisterForm } from "../../components/";
import { useTitle } from "../../hooks";
import "./RegisterPage.scoped.scss";

export default function RegisterPage() {
  const errorState = useSelector(error);
  const user = useSelector(currentUser);
  const dispatcher = useDispatch();
  useTitle("Regisztráció");

  useEffect(() => {
    if (user.neptunaCode !== "") {
      dispatcher(push("/profilom"));
    }
  }, [dispatcher, user]);

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
