import React from "react";
import { Col, Jumbotron, Row } from "react-bootstrap";
import { SubjectModalBodyProps } from "../proptypes";

export function SubjectModalBody({ model }: SubjectModalBodyProps) {
  return (
    <Jumbotron fluid>
      <h1 className="lead text-center">{model.subjectName}</h1>
      <Col xs={12} lg={12}>
        <p className="text-left d-inline-block">asd</p>
        <p className="text-right d-inline-block">asd</p>
      </Col>
    </Jumbotron>
  );
}

export default SubjectModalBody;
