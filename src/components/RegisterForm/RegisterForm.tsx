import React, { FormEvent, useReducer } from "react";
import { Form, InputGroup, Row, Button, Col, Card } from "react-bootstrap";
import { Theme } from "../../context/ThemeContext";
import { useTheme } from "../../hooks/useTheme";
import { RegisterRequest } from "../../services/axios-wrappers";
import ReCAPTCHA from "react-google-recaptcha";
import "./RegisterForm.scoped.scss";
import { useError, useUser } from "../../hooks";
import { RegisterFormProps } from "../proptypes";
import {
  initialState,
  registerModelReducer,
} from "../../reducers/registerModelReducer";
import showToast, { ToastOptions } from "../../services/toastrConfig";

export default function RegisterForm({ register }: RegisterFormProps) {
  const { theme } = useTheme();
  const { error} = useError();
  const [registerModel, dispatch] = useReducer(
    registerModelReducer,
    initialState
  );
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  let validated =
    registerModel.password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/
    ) !== null &&
    registerModel.firstName.length > 0 && registerModel.lastName.length > 0 &&
    registerModel.email !== "" && registerModel.email.includes("@") &&
    (process.env.NODE_ENV !== "production" || registerModel.recaptcha !== "");

    const handleSubmit = (e: FormEvent<HTMLElement>) => {
      e.preventDefault();
      register(registerModel);
      recaptchaRef.current?.reset();
      dispatch({ type: "reset", payload: ""});
    }

  return (
    <>
      <div className="register-body">
        <Card>
          <Card.Img variant="top" src="/images/soepic.jpg" />
          <Card.Body>
            <Form onSubmit={e => handleSubmit(e)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-mail cím</Form.Label>
                <Form.Control type="email" placeholder="E-mail cím" onChange={(e) =>
                    dispatch({
                      type: "changeEmail",
                      payload: e.target.value,
                    })
                  }
                  value={registerModel.email}
                  required/>
                <Form.Text className="text-muted">
                  <p>Az e-mail címet más felhasználó nem láthatja.</p>
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasic">
                <Form.Label>Teljes név</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  aria-label="Teljes név"
                  className={
                    registerModel.firstName !== "" ? registerModel.firstName.length >= 1 && registerModel.lastName.length >= 1 ? "is-valid" : "is-invalid" : ""
                  }
                  onChange={(e) =>
                    dispatch({
                      type: "changeName",
                      payload: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Jelszó</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Jelszó"
                  className={
                    registerModel.password !== ""
                      ? registerModel.password.match(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/
                        ) !== null
                        ? "is-valid"
                        : "is-invalid"
                      : ""
                  }
                  onChange={(e) =>
                    dispatch({
                      type: "changePassword",
                      payload: e.target.value,
                    })
                  }
                  value={registerModel.password}
                  aria-label="Jelszo helye"
                  required
                />
                <Form.Text className="text-muted">
                  <p>
                    A jelszó hossza legalább 8 karakter, tartalmaznia kell egy
                    számot, kisbetűt, valamint egy nagybetűt is.
                  </p>
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicRecha">
                <ReCAPTCHA
                  sitekey="6Lcahs0ZAAAAALC-KQnismShDqz5HEboOYKp0lzO"
                  theme={theme === Theme.Default ? "light" : "dark"}
                  ref={recaptchaRef}
                  onChange={(token: string | null) =>
                    dispatch({ type: "changeToken", payload: token ?? "" })
                  }
                />
              </Form.Group>
              <Button
                variant={theme === Theme.Default ? "dark" : "light"}
                type="submit"
                className="d-block mx-auto"
                disabled={!validated}
              >
                Regisztráció
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
