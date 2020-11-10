import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentUser,
  errorList,
  getUserDataAsync,
} from "../../app/features/userApi";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./ProfilePage.scoped.scss";

export default function ProfilePage() {
  const error = useSelector(errorList);
  const user = useSelector(currentUser);
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(getUserDataAsync({}));
  }, []);
  return (
    <div className="page-wrapper p-3">
      <Breadcrumb
        paths={[
          { pathName: "Főoldal", pathUrl: "/" },
          { pathName: "Adataim", pathUrl: "/profilom" },
        ]}
      />
    </div>
  );
}
