import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PageContainerProps } from "../proptypes";
import "./PageContainer.scoped.scss";

export default function PageContainer({ children }: PageContainerProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div className="page-container">{children}</div>;
}
