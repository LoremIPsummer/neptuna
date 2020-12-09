import React, { lazy } from "react";
import { Table } from "react-bootstrap";
import { useModal, useUser } from "../../hooks";
import { SubjectTableProps } from "../proptypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUserTimes,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import "./SubjectTable.scoped.scss";
import { Spinner } from "..";

export default function SubjectTable({ models }: SubjectTableProps) {
  const { user } = useUser();
  const { Modal, showModal } = useModal();

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tárgykód</th>
            <th>Tárgynév</th>
            <th>Oktató</th>
            <th>Kredit</th>
            <th>Hallgatók száma</th>
            <th>Információ</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.model.subjectCode}>
              <td>{model.model.subjectCode}</td>
              <td>{model.model.subjectName}</td>
              <td>{model.teacherName}</td>
              <td>{model.model.credit}</td>
              <td>{model.studentsCount}</td>
              <td>
                <FontAwesomeIcon
                  title="Adatok lekérdezése"
                  role="button"
                  icon={faQuestion}
                />
              </td>
              <td>
                {user.subjects.includes(model.model) ? (
                  <FontAwesomeIcon
                    title="Tárgyleadás"
                    role="button"
                    icon={faUserTimes}
                  />
                ) : (
                  <FontAwesomeIcon
                    title="Tárgyfelvétel"
                    onClick={() =>
                      showModal({ title: "LOl", body: <Spinner /> })
                    }
                    role="button"
                    icon={faUserPlus}
                  />
                )}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal />
    </>
  );
}
