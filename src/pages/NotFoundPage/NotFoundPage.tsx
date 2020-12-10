import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Row noGutters>
      <Col xs={12}>
        <h1 className="neptuna-404 text-center" style={{ fontSize: "10rem" }}>
          404
        </h1>
      </Col>
      <Col xs={12}>
        <p className="text-center">Hát itt nincs semmi látnivaló. :/</p>
      </Col>
      <Col xs={12}>
        <p className="text-center">
          <Link to="/" className="return">
            Vissza a főoldalra.
          </Link>
        </p>
      </Col>
    </Row>
  );
}
