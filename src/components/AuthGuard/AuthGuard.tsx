import React, { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useUser } from "../../hooks";
import { AuthGuardProps } from "../proptypes";
import { Role } from "../../models/user";

export default function AuthGuard({ children }: AuthGuardProps) {
  const cookieManager = new Cookies();
  const { pathname } = useLocation();
  const { sync, loggedIn, user, getAll } = useUser();

  useEffect(() => {
    if (cookieManager.get("token") !== undefined || loggedIn) {
      sync();
    }
    if (loggedIn && user.role === Role.Admin) getAll();
  }, [pathname]);

  return cookieManager.get("token") !== undefined || loggedIn ? (
    <>{children}</>
  ) : (
    <Redirect to="/" />
  );
}
