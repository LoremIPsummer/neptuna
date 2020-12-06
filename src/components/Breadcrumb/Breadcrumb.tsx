import React from "react";
import { Link } from "react-router-dom";
import { BreadcrumbProp } from "../proptypes";
import "./Breadcrumb.scoped.scss";

export default function Breadcrumb({ paths } : BreadcrumbProp ) {
  const active = paths.pop();
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {paths.map((path) => (
            <li className="breadcrumb-item" key={path.pathUrl}>
              <Link to={path.pathUrl}>{path.pathName}</Link>
            </li>
          ))}
          <li className="breadcrumb-item active" aria-current="page" key={active?.pathUrl}>
            {active?.pathName}
          </li>
        </ol>
      </nav>
    </>
  );
}



