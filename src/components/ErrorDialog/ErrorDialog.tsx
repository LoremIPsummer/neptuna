import React, { useReducer, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { ApiError } from "../../services/axios-wrappers";
import { resendConfirmAsyncPost } from "../../services/userService";
import "./ErrorDialog.scoped.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, setLoading } from "../../app/features/userApi";
import { isConfirmMailError } from "../../services/typeguards";

export default function ErrorDialog({ error }: ErrorDialogProp) {
  const dispatcher = useDispatch();
  const processLink = async (moreInfoType: string, moreInfoData? : string) => {
    dispatcher(setLoading(true));
    switch (moreInfoType) {
      case "email":{
       
        const response = await resendConfirmAsyncPost(moreInfoData as string);
        if(isConfirmMailError(response)){toast.error(response.error)}
        else{toast.success("E-mail megerősítő levél sikeresen kiküldve.")}
        
      }
    }
    dispatcher(setLoading(false));
  }
  return (
    <>
      {error.statusCode >= 400 && (
        <div className="error-holder">{error.error}
         {error?.moreInfoType && 
         <Button block={true} size="sm" 
         onClick={() => processLink(error.moreInfoType as string, error.moreInfoData)}>{error.moreInfo}</Button>}</div>
      )}
    </>
  );
}

export type ErrorDialogProp = {
  error: ApiError;
};
