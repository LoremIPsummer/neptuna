import React from "react";
import { Jumbotron } from "react-bootstrap";
import { PageHeadingProps } from "../proptypes";

export default function PageHeading({ title, alignment, mobileAlignment }: PageHeadingProps) {
  const defAlign = `text-${mobileAlignment ? 'md-' : ''}${alignment ?? "center"}`;
  const mobileAlign = mobileAlignment ? `text-${mobileAlignment}` : '';
  return (
    <Jumbotron>
      <h1 className={`${mobileAlign} ${defAlign} display-3`}>
        {title}
      </h1>
    </Jumbotron>
  );
}
