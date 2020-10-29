import React, { FormEvent, useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";
import styles from "./LoginPage.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Jumbotron,
} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, errorList } from "../../app/features/userApi";
import { LoginRequest } from "../../app/features/userWrappers";
import {
  faUniversity,
  faEnvelope,
  faCogs,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const dispatcher = useDispatch();
  const errors = useSelector(errorList);
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  const [loginModel, setLoginModel] = useState({
    neptunaCode: localStorage.getItem("savedpw") ?? "",
    password: "",
    recaptcha: "",
  });

  function onTokenRefresh(value: string | null) {
    setLoginModel({ ...loginModel, recaptcha: value ?? "" });
    console.log(loginModel.recaptcha);
  }

  function handleSubmit(e: FormEvent<HTMLElement>) {
    e.preventDefault();
    recaptchaRef.current?.reset();
    console.log(loginModel);
    dispatcher(loginUserAsync(loginModel));
  }

  return (
    <Row noGutters className={`${styles["neptuna-belepes"]} p-1`}>
      <Col
        xs={12}
        md={6}
        className={`${styles["neptuna-oldal-wrapper"]} m-auto`}
      >
        <Jumbotron>
          <h1 className="display-4 text-center">Bejelentkezés</h1>
        </Jumbotron>
        <div className={styles["neptuna-belepes-panel"]}>
          <fieldset className="border rounded p-2">
            <Form className="my-2" onSubmit={handleSubmit}>
              <InputGroup className="mb-4">
                <InputGroup.Prepend>
                  <InputGroup.Text id="neptuna-ikon">
                    <FontAwesomeIcon icon={faUniversity} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Neptuna kód"
                  aria-label="neptuna-kód"
                  aria-describedby="neptuna-ikon"
                  pattern="[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{1,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
                  name="neptuna"
                  value={loginModel.neptunaCode}
                  onChange={(e) =>
                    setLoginModel({
                      ...loginModel,
                      neptunaCode: e.target.value,
                    })
                  }
                  required
                />
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroup.Prepend>
                  <InputGroup.Text id="jelszo-ikon">
                    <FontAwesomeIcon icon={faBook} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Jelszó"
                  aria-label="jelszo"
                  aria-describedby="jelszo-ikon"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$"
                  name="jelszo"
                  value={loginModel.password}
                  onChange={(e) =>
                    setLoginModel({
                      ...loginModel,
                      password: e.target.value,
                    })
                  }
                  required
                />
              </InputGroup>
              <ReCAPTCHA
                sitekey="6Lcahs0ZAAAAALC-KQnismShDqz5HEboOYKp0lzO"
                onChange={onTokenRefresh}
                ref={recaptchaRef}
              />
              <FormGroup>
                <Row>
                  <Col xs={12} md={4}>
                    <InputGroup>
                      <Button
                        type="submit"
                        className="d-inline-block btn btn-primary m-auto"
                      ></Button>
                    </InputGroup>
                    <Col xs={12}>
                      <p className="text-secondary text-right">
                        Elfelejtett jelszó?
                      </p>
                    </Col>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </fieldset>
        </div>
      </Col>
    </Row>
  );
}
