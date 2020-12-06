import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { currentUser, getUserDataAsync } from '../../app/features/userApi';
import {Cookies} from "react-cookie";


type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({children} : AuthGuardProps){
  const cookieManager = new Cookies();
  const dispatcher = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if(cookieManager.get("token") !== undefined)
    {
      dispatcher(getUserDataAsync({}));
    }
  }, [pathname]);

  return cookieManager.get("token") !== undefined ? <>{children}</> : <Redirect to="/"/>
}


