import React from "react";
import Typed from "react-typed";
import { Row, Col, Image, Jumbotron } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUniversity,
  faEnvelope,
  faCogs,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import "./LandingPage.scoped.scss";
import { useTitle, useUser } from "../../hooks";

export default function LandingPage() {
  useTitle("Főoldal");
  const { login } = useUser();
  return (
    <div className="neptuna-landing-container">
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
        <Col xs={12} lg={3} className="feature-card">
          <h3>
            <a href="mailto:kissmate@goodiesoft.hu">Intézményi jelentkezés</a>
          </h3>
          <FontAwesomeIcon icon={faUniversity} size={"5x"} />
        </Col>
        <Col xs={12} lg={3} className="feature-card">
          <h3>
            <a href="mailto:kissmate@goodiesoft.hu">Kapcsolat</a>
          </h3>
          <FontAwesomeIcon icon={faEnvelope} size={"5x"} />
        </Col>
        <Col xs={12} lg={3} className="feature-card">
          <h3
            style={{ cursor: "pointer" }}
            onClick={() =>
              login({
                neptunaCode: "2ff664",
                password: "NeptunaTeszt123",
                recaptcha: "",
              })
            }
          >
            Demo kezelőfelület
          </h3>
          <FontAwesomeIcon icon={faCogs} size={"5x"} />
        </Col>

        <Col xs={12} lg={3} className="feature-card">
          <h3>
            <a
              href="https://github.com/LoremIPsummer/neptuna"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dokumentáció
            </a>
          </h3>
          <FontAwesomeIcon icon={faBook} size={"5x"} />
        </Col>
      </Row>
    </div>
  );
}
