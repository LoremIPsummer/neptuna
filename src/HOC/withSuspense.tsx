import React from "react";
import Spinner from "../components/Spinner/Spinner";

export const withSuspense = (WrappedComponent : any, FallbackComponent : JSX.Element | null = null) => {
	return function() {
		
			if (!FallbackComponent) FallbackComponent = <Spinner />;
			return (
				<React.Suspense fallback={FallbackComponent}>
					<WrappedComponent />
				</React.Suspense>
			);
		}
    };
    
    export default withSuspense;
