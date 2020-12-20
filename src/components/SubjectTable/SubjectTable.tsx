import React, { lazy } from "react";
import { Table } from "react-bootstrap";
import { useModal, useSubjects, useUser } from "../../hooks";
import { SubjectTableProps } from "../proptypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUserTimes,
  faQuestion,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { SubjectModel } from "../../models/subject";
import { SubjectModalBody } from "../SubjectModalBody/SubjectModalBody";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./SubjectTable.scoped.scss";
import { Role } from "../../models/user";

export default function SubjectTable({ models }: SubjectTableProps) {
  const { user } = useUser();
  const { Modal, showModal } = useModal();
  const { apply, terminate, deleteSub } = useSubjects();
  const applied = (subject: SubjectModel) =>
    user.subjects.find((s) => subject.subjectCode === s.subjectCode);
  const lectured = (subject: SubjectModel) =>
    user.subjects.find(
      (s) =>
        subject.teacher &&
        subject.teacher.firstName + " " + subject.teacher.lastName ===
          user.firstName + "" + user.lastName
    );

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
            <tr
              className={
                applied(model.model) || lectured(model.model) ? "striped" : ""
              }
              key={model.model.subjectCode}
            >
              <td>{model.model.subjectCode}</td>
              <td>{model.model.subjectName}</td>
              <td>{model.teacherName}</td>
              <td>{model.model.credit}</td>
              <td
                className={
                  applied(model.model) || lectured(model.model) ? "applied" : ""
                }
              >
                {model.studentsCount}
              </td>
              <td>
                <FontAwesomeIcon
                  title="Adatok lekérdezése"
                  role="button"
                  icon={faQuestion}
                  onClick={() =>
                    showModal({
                      title: model.model.subjectName + " | tárgyi adatok",
                      body: <SubjectModalBody model={model.model} />,
                    })
                  }
                />
              </td>
              <td>
                {applied(model.model) && (
                  <FontAwesomeIcon
                    title="Tárgyleadás"
                    role="button"
                    icon={faUserTimes}
                    onClick={() =>
                      showModal({
                        title: "Tárgyleadás",
                        body:
                          "Biztosan le szeretné adni a következő tárgyat? " +
                          model.model.subjectName,
                        OkText: "Igen",
                        OkMethod: () => {
                          terminate(model.model.subjectCode);
                        },
                      })
                    }
                  />
                )}
                {!applied(model.model) && user.role === Role.Student && (
                  <FontAwesomeIcon
                    title="Tárgyfelvétel"
                    onClick={() =>
                      showModal({
                        title: "Tárgyfelvétel",
                        body:
                          "Biztosan fel szeretné venni a következő tárgyat? " +
                          model.model.subjectName,
                        OkText: "Igen",
                        OkMethod: () => {
                          apply(model.model.subjectCode);
                        },
                      })
                    }
                    role="button"
                    icon={faUserPlus}
                  />
                )}
                {user.role === Role.Admin && (
                  <FontAwesomeIcon
                    title="Tárgytörlés"
                    onClick={() =>
                      showModal({
                        title: "Tárgytörlés",
                        body:
                          "Biztosan törli a következő tárgyat? " +
                          model.model.subjectName,
                        OkText: "Igen",
                        OkMethod: () => {
                          deleteSub(model.model.subjectCode);
                        },
                      })
                    }
                    role="button"
                    icon={faTrash}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal />
    </>
  );
}
