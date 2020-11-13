import React, { useEffect } from "react";
import { useRef } from "react";
import Col from "react-bootstrap/esm/Col";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import Row from "react-bootstrap/esm/Row";
import Label from "react-bootstrap/lib/Label";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUser,
  errorList,
  getUserDataAsync,
} from "../../app/features/userApi";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PersonalDataTable from "../../components/PersonalDataTable/PersonalDataTable";
import "./ProfilePage.scoped.scss";

export default function ProfilePage() {
  const error = useSelector(errorList);
  const user = useSelector(currentUser);

  return (
    <>
      <Breadcrumb
        paths={[
          { pathName: "Főoldal", pathUrl: "/" },
          { pathName: "Adataim", pathUrl: "/profilom" },
        ]}
      />
      <Jumbotron>
        <h1 className="text-center display-2">
          {user.firstName + " " + user.lastName}
        </h1>
      </Jumbotron>
      <Row noGutters className="content">
        <Col sm={12} lg={{ offset: 1, span: 10 }}>
          <PersonalDataTable user={user} />
        </Col>
      </Row>
    </>
  );
}
