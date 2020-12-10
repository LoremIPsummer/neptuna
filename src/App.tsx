import React, { lazy, Suspense, useState } from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import {
  Header,
  Footer,
  Spinner,
  CookieNotice,
  UpScroller,
  PageContainer,
  AuthGuard,
  TopInfo,
  SubjectArea,
} from "./components";
import { ToastContainer } from "react-toastify";
import { Theme, ThemeContext } from "./context/ThemeContext";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./app/store";
import useErrorBoundary from "use-error-boundary";
import { useLoading, useUser } from "./hooks";

function App() {
  const { isLoading } = useLoading();
  const { loggedIn, user } = useUser();

  const [theme, setTheme] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? Theme.Dark
      : Theme.Default
  );

  const { ErrorBoundary } = useErrorBoundary();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        {isLoading && <Spinner />}
        <ToastContainer />
        <ConnectedRouter history={history}>
          {loggedIn && <TopInfo user={user} />}
          <Header />
          <PageContainer>
            <Suspense fallback={<Spinner />}>
              <ErrorBoundary>
                <Switch>
                  <Route
                    path="/"
                    exact
                    component={lazy(() =>
                      import("./pages/LandingPage/LandingPage")
                    )}
                  />
                  <Route
                    path="/belepes"
                    exact
                    component={lazy(() =>
                      import("./pages/LoginPage/LoginPage")
                    )}
                  />
                  <Route
                    path="/regisztracio"
                    exact
                    component={lazy(() =>
                      import("./pages/RegisterPage/RegisterPage")
                    )}
                  />
                  <Route
                    path="/megerosites/:neptunacode/:token"
                    component={lazy(() =>
                      import("./pages/VerifyPage/VerifyPage")
                    )}
                  />
                  <AuthGuard>
                    <Route
                      path="/profilom"
                      exact
                      component={lazy(() =>
                        import("./pages/ProfilePage/ProfilePage")
                      )}
                    />
                    <SubjectArea>
                      <Route
                        path="/targyak"
                        exact
                        component={lazy(() =>
                          import("./pages/SubjectPage/SubjectPage")
                        )}
                      />
                      <Route
                        path="/felvett-targyak"
                        exact
                        component={lazy(() =>
                          import("./pages/AppliedSubjectPage/AppliedSubjectPage")
                        )}
                      />
                    </SubjectArea>
                    <Route
                      path="*"
                      component={lazy(() =>
                        import("./pages/NotFoundPage/NotFoundPage")
                      )}
                    />
                  </AuthGuard>
                </Switch>
              </ErrorBoundary>
            </Suspense>
          </PageContainer>
          <CookieNotice />
          <UpScroller />
          <Footer />
        </ConnectedRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
