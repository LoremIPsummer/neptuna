import React from "react";
import { useSubjects, useTitle, useUser } from "../../hooks";
import { Breadcrumb, PageHeading } from "../../components";
import { convertSubjects } from "../../util/subjects-table";
import { Spinner } from "react-bootstrap";

export default function AppliedSubjectPage() {
  useTitle("Felvett tantárgyak");
  const { user } = useUser();
  const { subjects } = useSubjects();
  const tableModel = convertSubjects(
    subjects.filter((s) =>
      user.subjects.find((usub) => usub.subjectCode === s.subjectCode)
    )
  );

  const Table = React.lazy(() =>
    import("../../components/SubjectTable/SubjectTable")
  );

  return (
    <>
      <Breadcrumb
        paths={[
          { pathName: "Főoldal", pathUrl: "/" },
          { pathName: "Felvett tantárgyak", pathUrl: "/felvett-targyak" },
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
        <Table models={tableModel} />
      </React.Suspense>
    </>
  );
}
