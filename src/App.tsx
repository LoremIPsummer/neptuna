import React, { useState } from "react";
import "./App.scss";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Spinner from "./components/Spinner/Spinner";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isLoading } from "./app/features/userApi";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { Theme, ThemeContext } from "./util/ThemeContext";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./app/store";
import CookieNotice from "./components/CookieNotice/CookieNotice";
import UpScroller from "./components/UpScroller/UpScroller";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PageContainer from "./components/PageContainer/PageContainer";
import VerifyPage from "./pages/VerifyPage/VerifyPage";
import AutoScrollTop from "./components/AutoScrollTop/AutoScrollTop";

function App() {
  const loadState = useSelector(isLoading);
  const [theme, setTheme] = useState(Theme.Default);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        {loadState && <Spinner />}
        <ToastContainer />

        <ConnectedRouter history={history}>
          <Header />
          <AutoScrollTop />
          <PageContainer>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/belepes" exact component={LoginPage} />
              <Route path="/regisztracio" exact component={RegisterPage} />
              <Route path="/profilom" exact component={ProfilePage} />
              <Route path="/megerosites" exact component={VerifyPage} />
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
