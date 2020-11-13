import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, getUserDataAsync } from "../../app/features/userApi";
import "./PageContainer.scoped.scss";

type PageContainerProps = {
  children: ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  const user = useSelector(currentUser);
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(getUserDataAsync({}));
  }, [dispatcher, user]);

  return <div className="page-container">{children}</div>;
}
