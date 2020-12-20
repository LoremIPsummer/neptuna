import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Theme } from "../../context/ThemeContext";
import { useSubjects, useUser } from "../../hooks";
import { useTheme } from "../../hooks/useTheme";
import { Role } from "../../models/user";
import { CreateSubjectRequest } from "../../services/axios-wrappers";

export default function AddSubjectForm() {
  const { theme } = useTheme();
  const { create } = useSubjects();
  const { loadedMembers } = useUser();
  const [model, setModel] = useState<CreateSubjectRequest>({
    credit: 0,
    subjectName: "",
    neptunaCode: "123123",
  });

  const handleNeptunaCode = (e: any): string => {
    console.log("ANYÁD");
    let val = e.target.value as string;
    return val.split("-")[1];
  };

  const handleCreate = (e: any) => {
    e.preventDefault();
    create(model);
  };

  const teachers = loadedMembers.filter((m) => m.role === Role.Lecturer);

  return (
    <>
      <Form onSubmit={handleCreate}>
        <Form.Group controlId="subject">
          <Form.Label>Tantárgy név</Form.Label>
          <Form.Control
            type="text"
            placeholder="Webprog 1"
            value={model.subjectName}
            onChange={(e) =>
              setModel({ ...model, subjectName: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="credit">
          <Form.Label>Kredit</Form.Label>
          <Form.Control
            type="number"
            placeholder="4"
            value={model.credit}
            onChange={(e) =>
              setModel({ ...model, credit: Number(e.target.value) })
            }
          />
        </Form.Group>
        <Form.Group controlId="teacher">
          <Form.Label>Tanár kiválasztása</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) =>
              setModel({ ...model, neptunaCode: handleNeptunaCode(e) })
            }
          >
            <option>Válasszon tanárt-</option>
            {teachers.map((m) => (
              <option key={m.neptunaCode}>
                {m.firstName + " " + m.lastName + "-" + m.neptunaCode}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button
          variant={theme === Theme.Default ? "dark" : "light"}
          className="d-inline-block"
          type="submit"
        >
          Tárgy létrehozása
        </Button>
      </Form>
    </>
  );
}
