import React from "react";

import Typed from "react-typed";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUniversity,
  faEnvelope,
  faCogs,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import "./LandingPage.scoped.scss";

export default function LandingPage() {
  return (
    <div className="neptuna-home-wrapper">
      <div className="neptuna-intro">
        <Row noGutters={true}>
          <Col
            xs={{ order: "last", span: 12 }}
            lg={{ order: "first", span: 6 }}
            className="intro-text  mt-3 p5 h-100"
          >
            <Jumbotron fluid className="jumbotron">
              <h1 className="text-center">
                A tanulmányi rendszer...
                <br />
                <Typed
                  strings={[
                    "Hallgatóknak.",
                    "Diákoknak.",
                    "Oktatóknak.",
                    "Mindenkinek. :)",
                  ]}
                  typeSpeed={160}
                  loop
                />
              </h1>
              <hr className="align-self-center" />
              <p
                className="
                  intro-text
                lead text-start text-center-md p-4"
              >
                A Neptuna egy
                <span className="font-weight-bold"> könnyen használható</span>,
                <span className="font-weight-bold">áttekinthető</span>{" "}
                alternatív megoldást kínál iskoláknak és egyéb más oktatási
                szervezeteknek a tanulói élettel kapcsolatos adminisztratív
                feladatok egységesítésére.
              </p>
              <br />
            </Jumbotron>
          </Col>
          <Col
            xs={{ order: "first", span: 12 }}
            lg={{ order: "last", span: 6 }}
            className="h-100"
          >
            <Image
              className="neptuna-image"
              src="https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg"
              alt="Lorem Ipsum"
              fluid
            />
          </Col>
        </Row>
      </div>
      <Row noGutters={true} className="neptuna-features">
        <Col xs={12} lg={3} className="card">
          <h3>
            <a href="#"> Intézményi jelentkezés </a>
          </h3>
          <FontAwesomeIcon icon={faUniversity} size={"5x"} />
        </Col>
        <Col xs={12} lg={3} className="card">
          <h3>
            <a href="mailto:kissmate@goodiesoft.hu">Kapcsolat</a>
          </h3>
          <FontAwesomeIcon icon={faEnvelope} size={"5x"} />
        </Col>
        <Col xs={12} lg={3} className="card">
          <h3>Demo kezelőfelület</h3>
          <FontAwesomeIcon icon={faCogs} size={"5x"} />
        </Col>

        <Col xs={12} lg={3} className="card">
          <h3>Dokumentáció</h3>
          <FontAwesomeIcon icon={faBook} size={"5x"} />
        </Col>
      </Row>
    </div>
  );
}
