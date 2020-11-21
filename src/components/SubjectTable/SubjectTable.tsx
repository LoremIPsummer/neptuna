import React, { useEffect, useState } from "react";
import { SubjectModel } from "../../models/subject";
import BootstrapTable from "react-bootstrap-table-next";
import "./SubjectTable.scoped.scss";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  Comparator,
  textFilter,
} from "react-bootstrap-table2-filter";

export type SubjectTableProps = {
  subjects: SubjectModel[];
};

const priceFilter = textFilter({
  placeholder: "My Custom PlaceHolder",
  className: "my-custom-text-filter",
  defaultValue: "test",
  comparator: Comparator.EQ,
  caseSensitive: true,
  style: {},
  delay: 1000,
  id: "id",
});

export interface SubjectTableModel extends SubjectModel {
  teacherName: string;
  studentsCount: number;
}

export default function SubjectTable({ subjects }: SubjectTableProps) {
  const priceFilter = textFilter({
    placeholder: "Tantárgy keresése", // custom the input placeholder
    className: "subject-filter", // custom classname on input
    defaultValue: "", // default filtering value
    comparator: Comparator.EQ, // default is Comparator.LIKE
    caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    style: { display: "block" }, // your custom styles on input
    delay: 1000, // how long will trigger filtering after user typing, default is 500 ms
    id: "id", // assign a unique value for htmlFor attribute, it's useful when you have same dataField across multiple table in one page
  });

  const columns = [
    {
      dataField: "subjectCode",
      text: "Tantárgy azonosító",
      searchable: true,
    },
    {
      dataField: "subjectName",
      text: "Tantárgy név",
      searchable: true,
      filter: priceFilter,
    },

    {
      dataField: "credit",
      text: "Kredit",
      sort: true,
      searchable: false,
    },
  ];

  return (
    <>
      <BootstrapTable
        keyField="subjectCode"
        data={subjects}
        columns={columns}
        striped
        hover
        condensed
        noDataIndication="Nincs megjelenítendő adat."
        pagination={paginationFactory({})}
        filter={filterFactory()}
        bodyClasses="tableBody"
        headerClasses="tableHeader"
        bootstrap4
      />
    </>
  );
}
