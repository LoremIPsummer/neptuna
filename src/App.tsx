import React, { useState } from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Spinner from "./components/Spinner/Spinner";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { isLoading } from "./app/features/loadApi";
import { Theme, ThemeContext } from "./util/ThemeContext";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./app/store";
import CookieNotice from "./components/CookieNotice/CookieNotice";
import UpScroller from "./components/UpScroller/UpScroller";
import PageContainer from "./components/PageContainer/PageContainer";
import useErrorBoundary from "use-error-boundary";
import AuthGuard from "./components/AuthGuard/AuthGuard";
import withSuspense from "./HOC/withSuspense";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  const loadState = useSelector(isLoading);
  const [theme, setTheme] = useState(Theme.Default);

  const { ErrorBoundary, didCatch, error } = useErrorBoundary({
    onDidCatch: (error, errorInfo) => {
      console.log(errorInfo);
    },
  });

  const ProfilePage = React.lazy(() =>
    import("./pages/ProfilePage/ProfilePage")
  );
  const LoginPage = React.lazy(() => import("./pages/LoginPage/LoginPage"));
  const RegisterPage = React.lazy(() =>
    import("./pages/RegisterPage/RegisterPage")
  );
  const SubjectPage = React.lazy(() =>
    import("./pages/SubjectPage/SubjectPage")
  );
  const VerifyPage = React.lazy(() => import("./pages/VerifyPage/VerifyPage"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        {loadState && <Spinner />}
        <ToastContainer />
        <ConnectedRouter history={history}>
          <Header />
          <PageContainer>
            <Switch>
              <ErrorBoundary>
                <Route path="/" exact component={LandingPage} />
                <Route
                  path="/belepes"
                  exact
                  component={withSuspense(LoginPage)}
                />
                <Route
                  path="/regisztracio"
                  exact
                  component={withSuspense(RegisterPage)}
                />
                <Route
                  path="/megerosites/:neptunacode/:token"
                  component={withSuspense(VerifyPage)}
                />
                <AuthGuard>
                  <Route
                    path="/profilom"
                    exact
                    render={withSuspense(ProfilePage)}
                  />
                  <Route
                    path="/targyak"
                    exact
                    component={withSuspense(SubjectPage)}
                  />
                </AuthGuard>
              </ErrorBoundary>
            </Switch>
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
