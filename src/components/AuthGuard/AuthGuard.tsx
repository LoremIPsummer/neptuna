import React, { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useUser } from "../../hooks";
import { AuthGuardProps } from "../proptypes";

export default function AuthGuard({ children }: AuthGuardProps) {
  const cookieManager = new Cookies();
  const { pathname } = useLocation();
  const { sync } = useUser();

  useEffect(() => {
    if (cookieManager.get("token") !== undefined) {
      sync();
    }
  }, [pathname]);

  return cookieManager.get("token") !== undefined ? (
    <>{children}</>
  ) : (
    <Redirect to="/" />
  );
}
