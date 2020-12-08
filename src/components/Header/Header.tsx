import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Hamburger } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav } from "react-bootstrap";
import "./Header.scoped.scss";
import { useModal, useUser } from "../../hooks";

export default function Header() {
  const [openLogic, setOpen] = useState({ open: false, firstOpen: true });

  const { logout, loggedIn } = useUser();
  const { isShown, Modal, showModal } = useModal();

  function handleToggle() {
    setOpen({ open: !openLogic.open, firstOpen: false });
  }

  return (
    <>
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
          {loggedIn && (
            <>
              <Nav.Item as="li">
                <Link to="/profilom">Adataim</Link>
              </Nav.Item>
              <Nav.Item as="li" className="has-sub">
                <Link to="/targyak">Tárgyak</Link>
                <Navbar as="ul">
                  <Nav.Item as="li">
                    <Link to="/orarend">Órarend</Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Link to="/targyaim">Felvett tárgyaim</Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Link to="/targyfelvetel">Tárgyfelvétel</Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Link to="/targyleadas">Tárgyleadás</Link>
                  </Nav.Item>
                </Navbar>
              </Nav.Item>
              <Nav.Item as="li" className="has-sub">
                <Link to="">Ügyintézés</Link>
                <Navbar as="ul">
                  <Nav.Item as="li">
                    <Link to="/kervenyek">Kérvények</Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Link to="/bkervenyek">Beküldött kérvényeim</Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Link to="/dokumentumok">Dokumentumok</Link>
                  </Nav.Item>
                </Navbar>
              </Nav.Item>
              <Nav.Item as="li">
                <Link to="/statisztika">Statisztika</Link>
              </Nav.Item>
              <Nav.Item as="li" className="btn btn-default ml-lg-auto">
                <Link
                  to="/"
                  onClick={() =>
                    showModal({
                      title: "Megerősítés",
                      body: "Biztosan ki szeretne jelentkezni?",
                      OkText: "Kilépés",
                      OkMethod: () => logout(),
                    })
                  }
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Kijelentkezés
                </Link>
              </Nav.Item>
            </>
          )}
          {!loggedIn && (
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

      {isShown && <Modal />}
    </>
  );
}
