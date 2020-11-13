import React, { ReactNode, useEffect } from "react";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { currentUser, getUserDataAsync } from "../../app/features/userApi";
import "./PageContainer.scoped.scss";

type PageContainerProps = {
  children: ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  const dispatcher = useDispatch();
  const { pathname } = useLocation();
  const cookieManager = new Cookies();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cookieManager.get("token")) dispatcher(getUserDataAsync({}));
  }, [pathname]);

  return <div className="page-container">{children}</div>;
}
