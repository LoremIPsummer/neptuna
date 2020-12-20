import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Breadcrumb, PageHeading } from "../../components";
import { AddPageProps } from "../../components/proptypes";
import { useTitle } from "../../hooks";

export default function AddPage({ title, Form }: AddPageProps) {
  useTitle(title);

  return (
    <>
      <Breadcrumb
        paths={[
          { pathName: "Főoldal", pathUrl: "/" },
          { pathName: title, pathUrl: "/" },
        ]}
      />
      <PageHeading title={title} alignment="left" mobileAlignment="center" />
      <Row>
        <Col xs={12} lg={8} className="m-auto">
          <Card>
            <Card.Body>
              <Form />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
