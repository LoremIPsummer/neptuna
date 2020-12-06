import React from "react";
import { HamburgerProps } from "../proptypes";
import "./Hamburger.scoped.scss";

export default function Hamburger({ open, toggle }: HamburgerProps) {
  return (
    <button
      onClick={toggle}
      className={`hamburger hamburger--collapse ${open && "is-active"}`}
      type="button"
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </button>
  );
}
