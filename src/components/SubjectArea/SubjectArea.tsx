import React, { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useSubjects, useUser } from "../../hooks";
import { SubjectAreaProps } from "../proptypes";

export default function SubjectArea({ children }: SubjectAreaProps) {
  const { pathname } = useLocation();
  const { sync } = useSubjects();

  useEffect(() => {
    sync();
  }, [pathname]);

  return <>{children}</>;
}
