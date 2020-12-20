import React, { useEffect, useRef } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Meta } from "../../app/features/loadApi";
import { useError, useLoading, useTitle } from "../../hooks";
import { verifyAccountAsyncGet } from "../../services/userService";
import "./VerifyPage.scoped.scss";

interface VerifyPageParams {
  neptunacode: string;
  token: string;
}

export default function VerifyPage() {
  useTitle("Megerősítés");
  const { setError } = useError();
  const { neptunacode, token } = useParams<VerifyPageParams>();
  const { setLoading } = useLoading();

  console.log(neptunacode);
  console.log(token);

  useEffect(() => {
    async function isSucceded(neptunaCode: string, token: string) {
      setLoading(true, Meta.VerifyUser);
      await verifyAccountAsyncGet({ neptunaCode, token }).then((resp) => {
        setError(resp);
        setLoading(false, Meta.VerifyUser);
      });
    }
    isSucceded(neptunacode, token);
  }, []);

  return <Redirect to="/" />;
}
