import React, { useState } from "react";
import { useSubjects, useTitle } from "../../hooks";
import { Breadcrumb, PageHeading } from "../../components";
import { convertSubjects } from "../../util/subjects-table";
import { Col, Row, Spinner } from "react-bootstrap";

export default function SubjectPage() {
  useTitle("Tantárgyak");

  const { subjects } = useSubjects();
  const tableModel = convertSubjects(subjects);

  const [pageNumber, setPageNumber] = useState(1);
  const [subjectNumber] = useState(10);

  const currentPageNumber = pageNumber * subjectNumber - subjectNumber;
  const pageNum = tableModel.length / subjectNumber;
  const paginatedSubjects = tableModel.splice(currentPageNumber, subjectNumber);

  const Table = React.lazy(() =>
    import("../../components/SubjectTable/SubjectTable")
  );

  const Paginator = React.lazy(() =>
    import("../../components/Paginator/Paginator")
  );

  return (
    <>
      <Breadcrumb
        paths={[
          { pathName: "Főoldal", pathUrl: "/" },
          { pathName: "Tantárgyak", pathUrl: "/targyak" },
        ]}
      />
      <PageHeading
        title="Tantárgyak"
        alignment="left"
        mobileAlignment="center"
      />
      <React.Suspense
        fallback={
          <Spinner animation="border" role="status">
            <span className="sr-only">Betöltés...</span>
          </Spinner>
        }
      >
        <Row>
          <Col xs={12}>
            <Table models={paginatedSubjects} />
          </Col>
          <Col xs={12} className="align-items-right">
            <Paginator
              setPage={(num: number) => setPageNumber(num)}
              pageNum={pageNum}
              actualPageNum={pageNumber}
            />
          </Col>
        </Row>
      </React.Suspense>
    </>
  );
}
