import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./AutoScrollTop.module.scss";

export default function AutoScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
