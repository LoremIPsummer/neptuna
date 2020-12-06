import React from "react";
import Spinner from "../components/Spinner/Spinner";

export const withSuspense = (
  WrappedComponent: any,
  FallbackComponent: JSX.Element | null = null,
  props: any = null
) => {
  return function() {
    if (!FallbackComponent) FallbackComponent = <Spinner />;
    return (
      <React.Suspense fallback={FallbackComponent}>
        <WrappedComponent props />
      </React.Suspense>
    );
  };
};

export default withSuspense;
