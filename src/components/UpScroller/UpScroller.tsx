import React, { useEffect, useState } from "react";
import "./UpScroller.scoped.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function UpScroller() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 50) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 50) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <div
      className="neptuna-scroller"
      style={{ display: showScroll ? "block" : "none" }}
      onClick={() => scrollTop()}
    >
      <FontAwesomeIcon icon={faChevronUp} size={"4x"} />
    </div>
  );
}
