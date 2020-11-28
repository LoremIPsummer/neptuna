import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { currentUser } from '../../app/features/userApi';


type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({children} : AuthGuardProps){
  const user = useSelector(currentUser);

  if(user.neptunaCode === "")
  return <Redirect to="/"/>

  return <>{children}</>
}


