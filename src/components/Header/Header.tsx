import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "react-bootstrap/esm/Navbar";
import Nav from "react-bootstrap/esm/Nav";
import { useSelector, useDispatch } from "react-redux";
import "./Header.scoped.scss";
import { currentUser, logoutUser } from "../../app/features/userApi";
import { Cookies } from "react-cookie";
import { push } from "connected-react-router";

export default function Header() {
  const [openLogic, setOpen] = useState({ open: false, firstOpen: true });
  const user = useSelector(currentUser);
  const dispatcher = useDispatch();

  function handleToggle() {
    setOpen({ open: !openLogic.open, firstOpen: false });
  }

  return (
    <Navbar className="neptuna-nav" sticky="top">
      <div className="noselect neptuna-logo-title">
        <Link to="/">NEPTUNA</Link>
      </div>

      <Nav
        as="ul"
        className={`w-100 noselect ${
          openLogic.open ? "opened" : !openLogic.firstOpen ? "closed" : ""
        }`}
      >
        {user.neptunaCode !== "" && (
          <>
            <Nav.Item as="li" className="has-sub">
              <Link to="#">Adataim</Link>
              <Navbar as="ul">
                <Nav.Item as="li">
                  <Link to="#">Személyes</Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Link to="#">Felvételi</Link>
                </Nav.Item>
              </Navbar>
            </Nav.Item>
            <Nav.Item as="li">
              <Link to="#">Tárgyak</Link>
            </Nav.Item>
            <Nav.Item as="li" className="btn btn-default ml-lg-auto">
              <Link to="/" onClick={() => dispatcher(logoutUser())}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Kijelentkezés
              </Link>
            </Nav.Item>
          </>
        )}
        {user.neptunaCode === "" && (
          <>
            <Nav.Item as="li" className="btn btn-default ml-lg-auto">
              <Link to="/belepes">
                <FontAwesomeIcon icon={faSignInAlt} /> Bejelentkezés
              </Link>
            </Nav.Item>
            <Nav.Item as="li" className="btn btn-default">
              <Link to="/regisztracio">
                <FontAwesomeIcon icon={faUserPlus} /> Regisztráció
              </Link>
            </Nav.Item>
          </>
        )}
      </Nav>

      <Hamburger open={openLogic.open} toggle={handleToggle} />
    </Navbar>
  );
}
