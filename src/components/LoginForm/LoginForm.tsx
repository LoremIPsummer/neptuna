import { faKey, faUniversity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { Form, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import ReCAPTCHA from "react-google-recaptcha";
import { LoginRequest } from "../../app/features/userWrappers";
import {
  initialState,
  loginModelReducer,
} from "../../reducers/loginModelReducer";
import "./LoginForm.scoped.scss";
import {Theme} from "../../util/ThemeContext";
import { useTheme } from "../../hooks/useTheme";

interface LoginFormProps {
  login(model: LoginRequest): void;
}

export default function LoginForm({ login }: LoginFormProps) {
  const recaptchaRef = React.createRef<ReCAPTCHA>();
  const [loginModel, dispatch] = useReducer(loginModelReducer, initialState);
  const [checked, setChecked] = useState(
    localStorage.getItem("savedCode") !== null
  );
  const {theme} = useTheme();
  let validated =
    loginModel.password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/
    ) !== null &&
    loginModel.neptunaCode.length === 6 &&
    loginModel.recaptcha !== "";

  function handleSubmit(e: FormEvent<HTMLElement>) {
    e.preventDefault();
    login(loginModel);
    recaptchaRef.current?.reset();
    dispatch({ type: "changePassword", payload: "" });
    if (checked) {
      localStorage.setItem("savedCode", loginModel.neptunaCode);
    } else {
      localStorage.removeItem("savedCode");
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="neptunaKod">
        <Row>
          <Col xs={12}>
            <Form.Label>Neptuna kód</Form.Label>
          </Col>
          <Col xs={12}>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text id="neptuna-ikon">
                  <FontAwesomeIcon icon={faUniversity} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className={
                  loginModel.neptunaCode !== ""
                    ? loginModel.neptunaCode.length === 6
                      ? "is-valid"
                      : "is-invalid"
                    : ""
                }
                maxLength={6}
                type="text"
                aria-label="neptuna kód helye"
                aria-describedby="neptuna-ikon"
                placeholder="Neptuna-kód"
                value={loginModel.neptunaCode}
                onChange={(e) =>
                  dispatch({
                    type: "changeNeptunaCode",
                    payload: e.target.value,
                  })
                }
                required
              />
            </InputGroup>
            <Form.Text className="text-muted">
              <p>A neptuna kód 6 karakter hosszú.</p>
            </Form.Text>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="jelszo" className="pt-2">
        <Row>
          <Col xs={12}>
            <Form.Label>Jelszó</Form.Label>
          </Col>
          <Col xs={12}>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text id="jelszo-ikon">
                  <FontAwesomeIcon icon={faKey} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className={
                  loginModel.password !== ""
                    ? loginModel.password.match(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/
                      ) !== null
                      ? "is-valid"
                      : "is-invalid"
                    : ""
                }
                type="password"
                placeholder="Jelszó"
                aria-label="Jelszo helye"
                aria-describedby="jelszo-ikon"
                required
                value={loginModel.password}
                onChange={(e) =>
                  dispatch({
                    type: "changePassword",
                    payload: e.target.value,
                  })
                }
              />
            </InputGroup>
            <Form.Text className="text-muted">
              <p>
                A jelszó hossza legalább 8 karakter, tartalmaznia kell egy
                számot, kisbetűt, valamint egy nagybetűt is.
              </p>
            </Form.Text>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} className="my-3">
            <ReCAPTCHA
              sitekey="6Lcahs0ZAAAAALC-KQnismShDqz5HEboOYKp0lzO"
              onChange={(token: string | null) =>
                dispatch({ type: "changeToken", payload: token ?? "" })
              }
              theme={theme === Theme.Default ? "light" : "dark"}
              ref={recaptchaRef}
            />
          </Col>
          <Col xs={12} md={6}>
            <Form.Check
              checked={checked}
              className="d-block align-self-end"
              type="switch"
              id="rememberSwitch"
              label="Neptuna kód megjegyzése"
              style={{ alignSelf: "end" }}
              onChange={() => setChecked(!checked)}
            />
          </Col>
          <Col xs={12} className="my-3">
            <Button
              disabled={!validated}
              variant="dark"
              type="submit"
              className="d-block mx-auto"
            >
              Bejelentkezés
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
}
