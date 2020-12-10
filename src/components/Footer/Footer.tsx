import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Footer.scoped.scss";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import CookieNotice from "../CookieNotice/CookieNotice";

export default function Footer() {
  return (
    <>
      <Row noGutters={true} className="neptuna-footer noselect">
        <Col className="lead describe" xs={12} md={6}>
          <span className="neptuna-logo">NEPTUNA</span> | a nyílt forráskódú
          tanulmányi rendszer.
        </Col>
        <Col className="lead copyright" xs={12} md={6}>
          Made with <FontAwesomeIcon icon={faHeart} /> by K.M |{" "}
          <ThemeSwitcher />
        </Col>
      </Row>
    </>
  );
}
