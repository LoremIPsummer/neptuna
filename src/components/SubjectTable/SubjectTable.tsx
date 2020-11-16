import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { SubjectModel } from "../../models/subject";
import BootstrapTable from "react-bootstrap-table-next";
import "./SubjectTable.scoped.scss";
import paginationFactory from "react-bootstrap-table2-paginator";

export type SubjectTableProps = {
  subjects: SubjectModel[];
};

export interface SubjectTableModel extends SubjectModel {
  teacherName: string;
  studentsCount: number;
}

export default function SubjectTable({ subjects }: SubjectTableProps) {
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
        bodyClasses="tableBody"
        headerClasses="tableHeader"
        bootstrap4
        search
      />
    </>
  );
}
