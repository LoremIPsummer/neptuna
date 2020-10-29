import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import "./CookieNotice.scoped.scss";

export default function CookieNotice() {
  const [cookies, setCookie] = useCookies(["cookie-accepted"]);
  let expireDate = new Date();
  expireDate.setMonth(expireDate.getMonth() + 2);
  return (
    <>
      {cookies["cookie-accepted"] === undefined && (
        <div className="neptuna-cookie-consept">
          <Row noGutters className="p-2">
            <Col xs={12} lg={6} className="align-items-center p-2">
              <div className="d-inline-block">
                A neptuna.hu weboldal a felhasználói élmény fokozása érdekében
                sütiket használ.
              </div>
            </Col>
            <Col xs={12} lg={1} className="align-items-center p-2">
              <div
                className="d-inline-block"
                role="button"
                onClick={() =>
                  setCookie("cookie-accepted", "true", { expires: expireDate })
                }
              >
                Elfogadom
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
