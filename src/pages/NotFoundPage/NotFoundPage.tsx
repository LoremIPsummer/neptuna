import React from "react";
import { Col, Row, Image, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NotFoundPage.scoped.scss";

export default function NotFoundPage() {
  return (
    <>
      <Row noGutters className="wrapper">
        <Col xs={12}>
          <Col xs={12}>
            <h1 className="neptuna-404">404</h1>
          </Col>
          <Col xs={12}>
            <p className="lead">Hát itt nincs semmi látnivaló. :/</p>
          </Col>
          <Col xs={12}>
            <p>
              <Link to="/" className="return">
                Vissza a főoldalra.
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </>
  );
}
