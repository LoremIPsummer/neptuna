import React, { useState } from "react";
import { HamburgerProp } from "../../app/neptunaPropTypes";
import "./Hamburger.scoped.scss";

export default function Hamburger({ open, toggle }: HamburgerProp) {
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
