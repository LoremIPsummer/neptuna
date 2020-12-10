import React from "react";
import { Pagination } from "react-bootstrap";
import { PaginatorProps } from "../proptypes";

export default function Paginator({
  next,
  previous,
  pagenum,
  className,
}: PaginatorProps) {
  return (
    <>
      <Pagination className={className}>
        <Pagination.Prev onClick={() => previous()} />
        <Pagination.Item>{pagenum}</Pagination.Item>
        <Pagination.Next onClick={() => next()} />
      </Pagination>
    </>
  );
}
