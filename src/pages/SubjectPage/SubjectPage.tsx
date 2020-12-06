import React, { useEffect, useState } from "react";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import { useSubjects } from "../../hooks";
import { Breadcrumb, SubjectTable } from "../../components";

export default function SubjectPage() {
  const { sync } = useSubjects();

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
      <Jumbotron as="div">
        <h1 className="display-3">Tantárgyak</h1>
      </Jumbotron>
    </>
  );
}
