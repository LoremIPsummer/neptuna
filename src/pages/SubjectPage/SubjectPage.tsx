import React, { useState } from "react";
import { useSubjects, useTitle } from "../../hooks";
import { Breadcrumb, PageHeading } from "../../components";
import { convertSubjects } from "../../util/subjects-table";
import { Col, Row, Spinner } from "react-bootstrap";
import { usePagination } from "../../hooks/usePagination";
import { SubjectPageProps } from "../../components/proptypes";

export default function SubjectPage({ title, subjects }: SubjectPageProps) {
  useTitle(title);

  const tableModel = convertSubjects(subjects);

  const { items, PaginatorComponent } = usePagination(tableModel);

  const Table = React.lazy(() =>
    import("../../components/SubjectTable/SubjectTable")
  );

  return (
    <>
      <Breadcrumb
        paths={[
          { pathName: "Főoldal", pathUrl: "/" },
          { pathName: "Tantárgyak", pathUrl: "/targyak" },
        ]}
      />
      <PageHeading title={title} alignment="left" mobileAlignment="center" />
      <React.Suspense
        fallback={
          <Spinner animation="border" role="status">
            <span className="sr-only">Betöltés...</span>
          </Spinner>
        }
      >
        <Row>
          <Col xs={12}>
            <Table models={items} />
          </Col>
          <Col xs={12} className="align-items-right">
            <PaginatorComponent />
          </Col>
        </Row>
      </React.Suspense>
    </>
  );
}
