import React from "react";
import { Link } from "react-router-dom";
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
          <li className="breadcrumb-item active" aria-current="page">
            {active?.pathName}
          </li>
        </ol>
      </nav>
    </>
  );
}


export type BreadcrumbProp = {
  paths : Array<{pathName: string, pathUrl: string}>
}
