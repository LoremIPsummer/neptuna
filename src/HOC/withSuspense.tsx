import React, { ReactNode } from "react";
import Spinner from "../components/Spinner/Spinner";

export const withSuspense = (children: ReactNode) => {
  return function() {
    return <React.Suspense fallback={<Spinner />}>{children}</React.Suspense>;
  };
};

export default withSuspense;
