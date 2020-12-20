import React from "react";
import Button from "react-bootstrap/esm/Button";
import { resendConfirmAsyncPost} from "../../services/userService";
import "./ErrorDialog.scoped.scss";
import { toast } from "react-toastify";
import { useLoading } from "../../hooks";
import { isConfirmMailSucceed } from "../../services/typeguards";
import { ErrorDialogProps } from "../proptypes";
import { Meta } from "../../app/features/loadApi";
import showToast, { ToastOptions } from "../../services/toastrConfig";

export default function ErrorDialog({ error }: ErrorDialogProps) {

  const {setLoading} = useLoading();

  const processLink = async (moreInfoType: string, moreInfoData? : string) => {
    setLoading(true, Meta.ResendEmail);
    switch (moreInfoType) {
      case "email":{
        const response = await resendConfirmAsyncPost({neptunaCode: moreInfoData as string});
        if(isConfirmMailSucceed(response)){showToast(ToastOptions.SUCCESS, "E-mail megerősítő levél sikeresen kiküldve.")}
        else{showToast(ToastOptions.ERROR,response.error)}
        break;
      }
    }
    setLoading(false, Meta.ResendEmail);
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


