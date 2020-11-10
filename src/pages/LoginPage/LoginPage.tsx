import React, { ChangeEvent, useEffect, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAsync,
  errorList,
  currentUser,
  getUserDataAsync,
} from "../../app/features/userApi";
import LoginForm from "../../components/LoginForm/LoginForm";
import { push } from "connected-react-router";
import "./LoginPage.scoped.scss";
import Breadcrumb, {
  BreadcrumbProp,
} from "../../components/Breadcrumb/Breadcrumb";
import { LoginRequest } from "../../services/axios-wrappers";
import ErrorDialog from "../../components/ErrorDialog/ErrorDialog";

export default function LoginPage() {
  const error = useSelector(errorList);
  const user = useSelector(currentUser);
  const dispatcher = useDispatch();

  useEffect(() => {
    if (user.neptunaCode !== "") {
      dispatcher(push("/profilom"));
    }
  }, [dispatcher, user]);

  return (
    <div className="page-wrapper p-3">
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
            <LoginForm
              login={(model: LoginRequest) => {
                Promise.resolve(dispatcher(loginUserAsync(model))).then(() => {
                  if (error.statusCode < 400) {
                    dispatcher(getUserDataAsync({}));
                  }
                });
              }}
            />
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
    </div>
  );
}
