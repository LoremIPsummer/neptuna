import React from "react";
import Button from "react-bootstrap/esm/Button";
import { resendConfirmAsyncPost } from "../../services/userService";
import "./ErrorDialog.scoped.scss";
import { toast } from "react-toastify";
import { useLoading } from "../../hooks";
import { isConfirmMailError } from "../../services/typeguards";
import { ErrorDialogProp } from "../proptypes";

export default function ErrorDialog({ error }: ErrorDialogProp) {

  const {setLoading} = useLoading();

  const processLink = async (moreInfoType: string, moreInfoData? : string) => {
    setLoading(true);
    switch (moreInfoType) {
      case "email":{
        const response = await resendConfirmAsyncPost(moreInfoData as string);
        if(isConfirmMailError(response)){toast.error(response.error)}
        else{toast.success("E-mail megerősítő levél sikeresen kiküldve.")}
        break;
      }
    }
    setLoading(false);
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


