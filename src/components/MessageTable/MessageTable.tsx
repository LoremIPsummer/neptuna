import React from "react";
import { Jumbotron, Table } from "react-bootstrap";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../context/ThemeContext";
import "./MessageTable.scoped.scss";
import { MessageTableProps } from "../proptypes";

export default function MessageTable({ user }: MessageTableProps) {
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

        <tbody />
      </Table>
    </Jumbotron>
  );
}
