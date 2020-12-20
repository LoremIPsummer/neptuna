import React from "react";
import { Card, Col, Jumbotron, Row } from "react-bootstrap";
import { SubjectModalBodyProps } from "../proptypes";

export function SubjectModalBody({ model }: SubjectModalBodyProps) {
  return (
    <Card>
      <Card.Body>
        <h1 className="lead text-center">{model.subjectName}</h1>
        <hr />
        <p>Tantárgy neve: {model.subjectName}</p>
        <p>Tantárgy kódja: {model.subjectCode}</p>
        <p>Tantárgy kreditértéke: {model.credit}</p>
        <p>
          Tantárgy oktatója:{" "}
          {!model.teacher
            ? "Nincs kijelölt tanár"
            : model.teacher.firstName + " " + model.teacher.lastName}
        </p>
        <p className="lead text-center">Tantárgyat felvett hallgatók</p>

        <hr />
        <ul className="mx-0">
          {model.students.map((student) => (
            <li key={student.neptunaCode}>
              {student.firstName + " " + student.lastName}
            </li>
          ))}
        </ul>
        {model.students.length === 0 && (
          <p className="text-center lead">Nincsenek hallgatók</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default SubjectModalBody;
