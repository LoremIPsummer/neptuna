import React from "react";
import { PaginatorProps } from "../proptypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Paginator.scoped.scss";

export default function Paginator({
  setPage,
  actualPageNum,
  pageNum,
}: PaginatorProps) {
  const rounded = Math.ceil(pageNum);
  return (
    <>
      <div className="pagination noselect">
        <ul>
          <li
            onClick={() =>
              actualPageNum !== 1 ? setPage(actualPageNum - 1) : {}
            }
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </li>
          {Array.from(Array(rounded).keys()).map((i) => (
            <li
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={i + 1 === actualPageNum ? "active" : ""}
            >
              {i + 1}
            </li>
          ))}
          <li
            onClick={() =>
              actualPageNum < pageNum ? setPage(actualPageNum + 1) : {}
            }
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" />
          </li>
          <small className="muted d-inline-block">
            {actualPageNum}. oldal megjelenítve a(z) {rounded}-ból/ből.
          </small>
        </ul>
      </div>
    </>
  );
}
