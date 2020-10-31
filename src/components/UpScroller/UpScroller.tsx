import React, { useState } from "react";
import "./UpScroller.scoped.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function UpScroller() {
  window.addEventListener("scroll", (e) => scrollEvent);

  const [scrollState, setScrollState] = useState(0);

  function scrollEvent(e: React.UIEvent<HTMLElement>) {
    setScrollState(document.body.getBoundingClientRect().top);
    console.log(scrollState);
  }

  return <></>;
}
