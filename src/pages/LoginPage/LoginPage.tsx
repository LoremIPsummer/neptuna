import React, { ChangeEvent, useEffect, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, errorList } from "../../app/features/userApi";
import { LoginRequest } from "../../app/features/userWrappers";
import LoginForm from "../../components/LoginForm/LoginForm";
import { push } from "connected-react-router";
import "./LoginPage.scoped.scss";
import { Cookies, useCookies } from "react-cookie";
import Breadcrumb, {
  BreadcrumbProp,
} from "../../components/Breadcrumb/Breadcrumb";

export default function LoginPage() {
  const errors = useSelector(errorList);
  const dispatcher = useDispatch();
  const [cookies, setCookies] = useCookies(["token"]);

  useEffect(() => {
    if (cookies["token"] !== undefined) {
      dispatcher(push("/"));
    }
  }, [dispatcher, cookies]);

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
                dispatcher(loginUserAsync(model));
                dispatcher(push("/"));
              }}
            />

            {errors.error !== undefined && (
              <div className="p-3 mb-2 bg-danger text-white">
                {errors.error}
              </div>
            )}
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
