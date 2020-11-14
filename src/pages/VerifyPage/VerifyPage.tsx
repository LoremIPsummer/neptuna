import { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { isLoading, setLoading } from "../../app/features/loadApi";
import useQuery from "../../hooks/useQuery";
import { ApiError } from "../../services/axios-wrappers";
import { isUserVerifiedError } from "../../services/typeguards";
import { verifyAccountAsyncGet } from "../../services/userService";
import "./VerifyPage.scoped.scss";

export default function VerifyPage() {
  const dispatcher = useDispatch();
  const loadState = useSelector(isLoading);
  const queries = useQuery();
  const neptunaCode = queries.get("neptunacode") ?? "";
  const token = queries.get("token") ?? "";
  const [result, setResult] = useState<boolean | ApiError>({error : "", statusCode : -1})
const shouldRedirect = useRef(false);
  
  

  useEffect(() => {

      async function isSucceded(neptunaCode: string, token: string){
     
        dispatcher(setLoading(true));
        await verifyAccountAsyncGet(neptunaCode, token).then(resp => { dispatcher(setLoading(false));
        isUserVerifiedError(resp) ? toast.error(resp.error) : toast.success("Sikeres megerősítés!");
        shouldRedirect.current = true;
        setResult(resp);});
        console.log(result);
    };
    isSucceded(neptunaCode, token);
  }, []);

 
    return (<>{shouldRedirect.current ? <Redirect to="/" push/> : <></>  }</>);
}
