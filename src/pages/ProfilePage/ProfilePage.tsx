import React, { useEffect } from "react";
import { useRef } from "react";
import Col from "react-bootstrap/esm/Col";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import Row from "react-bootstrap/esm/Row";
import Label from "react-bootstrap/lib/Label";
import { useDispatch, useSelector } from "react-redux";
import { error } from "../../app/features/errorApi";
import { currentUser } from "../../app/features/userApi";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import MessageTable from "../../components/MessageTable/MessageTable";
import PersonalDataTable from "../../components/PersonalDataTable/PersonalDataTable";
import { useTitle } from "../../hooks";
import "./ProfilePage.scoped.scss";

export default function ProfilePage() {
  const user = useSelector(currentUser);
  useTitle("Profilom");

  return (
    <>
      <Breadcrumb
        paths={[
          { pathName: "Főoldal", pathUrl: "/" },
          { pathName: "Adataim", pathUrl: "/profilom" },
        ]}
      />
      <PageHeading title={user.neptunaCode} />
      <Row noGutters className="content">
        <Col sm={12} lg={7}>
          <MessageTable user={user} />
        </Col>
        <Col sm={12} lg={{ span: 4, offset: 1 }}>
          <PersonalDataTable user={user} />
        </Col>
      </Row>
    </>
  );
}
