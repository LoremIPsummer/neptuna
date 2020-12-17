import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Footer.scoped.scss";
import { ThemeSwitcher } from "../index";

export default function Footer() {
  return (
    <>
      <Row noGutters={true} className="neptuna-footer noselect">
        <Col className="lead describe" xs={12} md={6}>
          <span className="neptuna-logo">NEPTUNA</span> | A nyílt forráskódú
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
