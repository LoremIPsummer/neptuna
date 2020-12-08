import React, { useEffect } from "react";
import { useSubjects, useTitle } from "../../hooks";
import { Breadcrumb, PageHeading, SubjectTable } from "../../components";

export default function SubjectPage() {
  const { sync } = useSubjects();
  useTitle("Tantárgyak");

  useEffect(() => {
    sync();
  }, []);
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
    </>
  );
}
