import { push } from "connected-react-router";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, errorList } from "../../app/features/userApi";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./RegisterPage.scoped.scss";

export default function RegisterPage() {
  const error = useSelector(errorList);
  const user = useSelector(currentUser);
  const dispatcher = useDispatch();

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
