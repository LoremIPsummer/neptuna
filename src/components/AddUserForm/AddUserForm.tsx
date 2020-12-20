import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Theme } from "../../context/ThemeContext";
import { useUser } from "../../hooks";
import { useTheme } from "../../hooks/useTheme";
import { Role } from "../../models/user";
import { CreateUserRequest } from "../../services/axios-wrappers";

export default function AddUserForm() {
  const { theme } = useTheme();
  const { create } = useUser();
  const [model, setModel] = useState<CreateUserRequest>({
    role: Role.Student,
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleRole = (e: any): Role => {
    switch (e.target.value) {
      case "Hallgató": {
        return Role.Student;
      }
      case "Oktató": {
        return Role.Lecturer;
      }
      case "Adminisztrátor": {
        return Role.Admin;
      }
      default: {
        return Role.Student;
      }
    }
  };

  const handleCreate = (e: any) => {
    e.preventDefault();
    create(model);
  };

  return (
    <Form onSubmit={handleCreate}>
      <Form.Group controlId="mail">
        <Form.Label>Email cím</Form.Label>
        <Form.Control
          type="email"
          placeholder="gipszjakab@gmail.com"
          value={model.email}
          onChange={(e) => setModel({ ...model, email: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="name">
        <Form.Label>Vezetéknév</Form.Label>
        <Form.Control
          type="text"
          placeholder="Vezetéknév"
          value={model.firstName}
          onChange={(e) => setModel({ ...model, firstName: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="name">
        <Form.Label>Keresztnév</Form.Label>
        <Form.Control
          type="text"
          placeholder="Keresztnév"
          value={model.lastName}
          onChange={(e) => setModel({ ...model, lastName: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="role">
        <Form.Label>Beosztás</Form.Label>
        <Form.Control
          as="select"
          onChange={(e) => setModel({ ...model, role: handleRole(e) })}
        >
          <option>Hallgató</option>
          <option>Oktató</option>
          <option>Adminisztrátor</option>
        </Form.Control>
      </Form.Group>
      <Button
        variant={theme === Theme.Default ? "dark" : "light"}
        className="d-inline-block"
        type="submit"
      >
        Felhasználó felvétele
      </Button>
    </Form>
  );
}
