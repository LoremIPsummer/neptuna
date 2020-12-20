import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Breadcrumb, PageHeading } from "../../components";
import { useTitle, useUser } from "../../hooks";
import { usePagination } from "../../hooks/usePagination";
import { Role } from "../../models/user";

export default function UsersPage() {
  useTitle("Felhasználók");
  const { user, getAll, loadedMembers } = useUser();
  let userTableModel = [...loadedMembers];
  const { items, PaginatorComponent } = usePagination(userTableModel);

  if (user.role !== Role.Admin) return <Redirect to="/" />;

  if (loadedMembers.length === 0) return <></>;

  const Table = React.lazy(() =>
    import("../../components/UserTable/UserTable")
  );

  return (
    <>
      <Breadcrumb paths={[{ pathName: "Főoldal", pathUrl: "/" }]} />
      <PageHeading
        title="Felhasználók"
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
            <Table users={items} />
          </Col>
          <Col xs={12} className="align-items-right">
            <PaginatorComponent />
          </Col>
        </Row>
      </React.Suspense>
    </>
  );
}
