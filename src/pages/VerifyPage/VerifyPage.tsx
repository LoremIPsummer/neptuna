import React, { useEffect, useRef, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useLoading } from "../../hooks";
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
  const { setLoading } = useLoading();

  let { neptunacode, token } = useParams<VerifyPageParams>();
  const [result, setResult] = useState<boolean | ApiError>({
    error: "",
    statusCode: -1,
  });
  const shouldRedirect = useRef(false);

  useEffect(() => {
    async function isSucceded(neptunaCode: string, token: string) {
      setLoading(true);
      await verifyAccountAsyncGet(neptunaCode, token).then((resp) => {
        setLoading(false);
        if (!isUserVerifiedError(resp))
          showToast(ToastOptions.SUCCESS, "Sikeres megerősítés");
        shouldRedirect.current = true;
        setResult(resp);
      });
      console.log(result);
    }
    isSucceded(neptunacode, token);
  }, []);

  return <>{shouldRedirect.current ? <Redirect to="/" push /> : <></>}</>;
}
