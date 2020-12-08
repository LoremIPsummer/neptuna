import React from "react";
import { Row, Col } from "react-bootstrap";
import { PageHeading } from "../../components";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import MessageTable from "../../components/MessageTable/MessageTable";
import PersonalDataTable from "../../components/PersonalDataTable/PersonalDataTable";
import { useTitle, useUser } from "../../hooks";
import "./ProfilePage.scoped.scss";

export default function ProfilePage() {
  const { user } = useUser();
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
