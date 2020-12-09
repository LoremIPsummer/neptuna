import React, { useEffect, useRef, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useLoading, useTitle } from "../../hooks";
import { ApiError } from "../../services/axios-wrappers";
import showToast, { ToastOptions } from "../../services/toastrConfig";
import { isUserVerifiedError } from "../../services/typeguards";
import { verifyAccountAsyncGet } from "../../services/userService";
import "./VerifyPage.scoped.scss";

interface VerifyPageParams {
  neptunacode: string;
  token: string;
}

export default function VerifyPage() {
  useTitle("Megerősítés");

  const { neptunacode, token } = useParams<VerifyPageParams>();
  const [finished, setFinished] = useState(false);

  console.log(neptunacode);
  console.log(token);

  useEffect(() => {
    async function isSucceded(neptunaCode: string, token: string) {
      await verifyAccountAsyncGet(neptunaCode, token).then((resp) => {
        if (!isUserVerifiedError(resp)) {
          showToast(ToastOptions.SUCCESS, "Sikeres megerősítés");
        } else {
        }
        setFinished(true);
      });
    }
    isSucceded(neptunacode, token);
  }, []);

  return <></>;
}
