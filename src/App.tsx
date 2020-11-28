import React, { useState } from "react";
import "./App.scss";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Spinner from "./components/Spinner/Spinner";
import { ToastContainer } from "react-toastify";
import { Provider, useDispatch, useSelector } from "react-redux";
import { isLoading } from "./app/features/loadApi";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { Theme, ThemeContext } from "./util/ThemeContext";
import { ConnectedRouter } from "connected-react-router";
import { history, store } from "./app/store";
import CookieNotice from "./components/CookieNotice/CookieNotice";
import UpScroller from "./components/UpScroller/UpScroller";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PageContainer from "./components/PageContainer/PageContainer";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import SubjectPage from "./pages/SubjectPage/SubjectPage";
import useErrorBoundary from "use-error-boundary";
import showToast from "./services/toastrConfig";
import { ToastOptions } from "./services/toastrConfig";
import AuthGuard from "./components/AuthGuard/AuthGuard";

function App() {
  const loadState = useSelector(isLoading);
  const [theme, setTheme] = useState(Theme.Default);

  const { ErrorBoundary, didCatch, error } = useErrorBoundary({
    onDidCatch: (error, errorInfo) => {
      console.log(errorInfo);
    },
  });

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
                <Route path="/belepes" exact component={LoginPage} />
                <Route path="/regisztracio" exact component={RegisterPage} />
                <Route
                  path="/megerosites/:neptunacode/:token"
                  component={VerifyPage}
                />
                <AuthGuard>
                 <Route path="/profilom" exact component={ProfilePage} />
                <Route path="/targyak" exact component={SubjectPage} />
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
