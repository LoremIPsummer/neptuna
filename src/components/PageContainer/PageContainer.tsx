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
 
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div className="page-container">{children}</div>;
}
