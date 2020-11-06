import React from "react";
import { ApiError } from "../../services/axios-wrappers";
import "./ErrorDialog.scoped.scss";

export default function ErrorDialog({ error }: ErrorDialogProp) {
  return (
    <>
      {error.statusCode >= 400 && (
        <div className="p-3 mb-2 bg-danger text-white">{error.error}</div>
      )}
    </>
  );
}

export type ErrorDialogProp = {
  error: ApiError;
};
