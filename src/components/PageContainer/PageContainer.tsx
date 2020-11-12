import React, { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./PageContainer.scoped.scss";

type PageContainerProps = {
  children: ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return <div className="page-container">{children}</div>;
}
