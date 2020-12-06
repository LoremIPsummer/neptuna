import React, { useEffect, useState } from "react";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectsAsync, subjects } from "../../app/features/subjectApi";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SubjectTable from "../../components/SubjectTable/SubjectTable";

export default function SubjectPage() {
  const dispatcher = useDispatch();
  const subjectsState = useSelector(subjects);

  useEffect(() => {
    dispatcher(getSubjectsAsync({}));
  }, [dispatcher]);
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
      <SubjectTable subjects={subjectsState} />
    </>
  );
}
