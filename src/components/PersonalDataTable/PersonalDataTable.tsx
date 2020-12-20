import React from "react";
import "./PersonalDataTable.scoped.scss";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import moment from "moment";
import { PersonalDataTableProps } from "../proptypes";
import { Role } from "../../models/user";

export default function PersonalDataTable({ user }: PersonalDataTableProps) {
  moment.locale();

  return (
    <>
      <Jumbotron as="div">
        <h3 className="text-center">Személyes adatok</h3>
        <ul>
          <li>
            <p className="lead">Keresztnév: {user.firstName}</p>
          </li>
          <li>
            <p className="lead">Vezetéknév: {user.lastName}</p>
          </li>
          <li>
            <p className="lead">Neptuna kód: {user.neptunaCode}</p>
          </li>
          <li>
            <p className="lead">Anyja neve: {user.motherName}</p>
          </li>
          <li>
            <p className="lead">
              Születési idő: {moment(user.bornDate).format("yyyy.MM.DD")}
            </p>
          </li>
          <li>
            <p className="lead">Születési hely: {user.bornLocation}</p>
          </li>
          <li>
            <p className="lead">Születési ország: {user.bornCountry}</p>
          </li>
          <li>
            <p className="lead">Beosztás: {user.role}</p>
          </li>
          {user.role === Role.Student && (
            <li>
              <p>Szak: {user.department}</p>
            </li>
          )}
          <li>
            <p className="lead text-center">
              A neptuna rendszer tagja{" "}
              <b>{moment(user.memberSince).format("yyyy.MM.DD")}</b> óta.
            </p>
            <p className="lead text-center">
              Utolsó belépési idő{" "}
              <b>{moment(user.lastlogin).format("yyyy.MM.DD HH:mm")}</b>.
            </p>
          </li>
        </ul>
      </Jumbotron>
    </>
  );
}
