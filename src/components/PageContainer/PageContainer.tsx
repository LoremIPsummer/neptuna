import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useError } from "../../hooks";
import { PageContainerProps } from "../proptypes";
import "./PageContainer.scoped.scss";

export default function PageContainer({ children }: PageContainerProps) {
  const { pathname } = useLocation();
  const { resetError } = useError();

  useEffect(() => {
    window.scrollTo(0, 0);
    resetError();
  }, [pathname]);

  return <div className="page-container">{children}</div>;
}
