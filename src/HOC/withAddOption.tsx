import React from "react";
import { AddSubjectForm, AddUserForm } from "../components";
import AddPage from "../pages/AddPage/AddPage";

export enum AddType {
  User,
  Subject,
}

export const withAddOption = (type: AddType) => {
  return function() {
    let title = "";
    let form: JSX.Element | null = null;

    switch (type) {
      case AddType.User: {
        title = "Felhasználó hozzáadás";
        form = <AddUserForm />;
        break;
      }
      case AddType.Subject: {
        title = "Tantárgy hozzáadás";
        form = <AddSubjectForm />;
        break;
      }
    }
    return (
      <>
        <AddPage title={title} Form={() => form as JSX.Element} />
      </>
    );
  };
};

export default withAddOption;
