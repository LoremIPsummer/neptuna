import React, { ReactNode } from "react";
import "./PageContainer.scoped.scss";

type Pages = {
  children: ReactNode;
};

export default function PageContainer(props: Pages) {
  return <div className="page-container">{props.children}</div>;
}
