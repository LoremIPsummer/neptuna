import React from "react";
import { Jumbotron } from "react-bootstrap";
import { PageHeadingProps } from "../proptypes";

export default function PageHeading({ title, alignment, mobileAlignment }: PageHeadingProps) {
  const defAlign = `text-md-${alignment ?? "center"}`;
  const mobileAlign = mobileAlignment ? `text-xs-${mobileAlignment}` : '';
  return (
    <Jumbotron>
      <h1 className={`${defAlign} ${mobileAlign} display-2`}>
        {title}
      </h1>
    </Jumbotron>
  );
}
