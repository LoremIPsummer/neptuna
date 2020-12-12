import React from "react";
import { Row } from "react-bootstrap";
import { TopInfoProps } from "../proptypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAddressCard,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "./TopInfo.scoped.scss";
import moment from "moment";

export default function TopInfo({ user }: TopInfoProps) {
  return (
    <Row noGutters className="neptuna-userdata-holder">
      <ul className="user-info">
        <li>
          <FontAwesomeIcon icon={faUser} size="sm" />
          {user.firstName + " " + user.lastName}
        </li>
        <li>
          <FontAwesomeIcon icon={faAddressCard} size="sm" />
          Neptuna kód: {user.neptunaCode}
        </li>
        <li>Beosztás: {user.role}</li>

        <li>
          <FontAwesomeIcon icon={faClock} size="sm" />
          Utolsó belépési idő:{" "}
          {moment(user.lastlogin).format("yyyy.MM.DD hh:mm:ss")}
        </li>
      </ul>
    </Row>
  );
}
