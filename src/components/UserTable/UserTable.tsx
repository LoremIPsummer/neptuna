import React, { lazy, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useModal, useUser } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./UserTable.scoped.scss";
import { UserTableProps } from "../proptypes";

export default function UserTable({ users }: UserTableProps) {
  const { Modal, showModal } = useModal();
  const { deleteUser, getAll } = useUser();

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Neptuna kód</th>
            <th>Név</th>
            <th>Felvett tárgyak száma</th>
            <th>Beosztás</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {users.map((model) => (
            <tr key={model.neptunaCode}>
              <td>{model.neptunaCode}</td>
              <td>{model.firstName + " " + model.lastName}</td>
              <td>{model.subjects ? model.subjects.length : 0}</td>
              <td>{model.role}</td>
              <td>
                <FontAwesomeIcon
                  title="Felhasználó törlése"
                  onClick={() =>
                    showModal({
                      title: "Felhasználó törlése",
                      body: `Biztosan törli a következő felhasználót? ${
                        model.firstName
                      } ${model.lastName} (${model.neptunaCode})`,
                      OkText: "Igen",
                      OkMethod: () => {
                        deleteUser(model.neptunaCode);
                        getAll();
                      },
                    })
                  }
                  role="button"
                  icon={faTrash}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal />
    </>
  );
}
