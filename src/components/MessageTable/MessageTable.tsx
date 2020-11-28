import React from "react";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import Table from "react-bootstrap/esm/Table";
import { useTheme } from "../../hooks/useTheme";
import { UserModel } from "../../models/user";
import { Theme } from "../../util/ThemeContext";
import styles from "./MessageTable.module.scss";

export type MessageTableProp = {
  user: UserModel;
};

export default function MessageTable({ user }: MessageTableProp) {
  const { theme } = useTheme();

  return (
    <Jumbotron as="div">
      <h3>Hírlevél</h3>
      <Table
        responsive
        striped
        bordered
        hover
        variant={theme === Theme.Dark ? "dark" : "default"}
      >

          <th>Időpont</th>
          <th>Feladó</th>
          <th>Tárgy</th>
          <th>Megnyitás</th>

        <tbody>
          <tr />
        </tbody>
      </Table>
    </Jumbotron>
  );
}
