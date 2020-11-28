import React, { useEffect, useState } from "react";
import { SubjectModel } from "../../models/subject";
import "./SubjectTable.scoped.scss";

export type SubjectTableProps = {
  subjects: SubjectModel[];
};


export interface SubjectTableModel extends SubjectModel {
  teacherName: string;
  studentsCount: number;
}

export default function SubjectTable({ subjects }: SubjectTableProps) {
 

  

  return (
    <>
    </>

  );
}
