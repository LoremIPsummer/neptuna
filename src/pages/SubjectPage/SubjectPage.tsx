import React, { useEffect } from "react";
import { useSubjects, useTitle } from "../../hooks";
import { Breadcrumb, PageHeading, SubjectTable } from "../../components";
import { convertSubjects } from "../../util/subjects-table";
import withSuspense from "../../HOC/withSuspense";
import { Spinner } from "react-bootstrap";

export default function SubjectPage() {
  const { subjects } = useSubjects();
  useTitle("Tantárgyak");

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
      <PageHeading
        title="Tantárgyak"
        alignment="left"
        mobileAlignment="center"
      />
      <React.Suspense
        fallback={
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        }
      >
        <Table models={convertSubjects(subjects)} />
      </React.Suspense>
    </>
  );
}
