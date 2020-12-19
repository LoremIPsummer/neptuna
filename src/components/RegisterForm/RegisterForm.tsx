import React from "react";
import { Form, InputGroup, Row, Button, Col, Card } from "react-bootstrap";
import { Theme } from "../../context/ThemeContext";
import { useTheme } from "../../hooks/useTheme";
import { RegisterRequest } from "../../services/axios-wrappers";
import ReCAPTCHA from "react-google-recaptcha";
import "./RegisterForm.scoped.scss";

export default function RegisterForm() {
  const { theme } = useTheme();
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  return (
    <>
      <div className="register-body">
        <Card>
          <Card.Img variant="top" src="/images/soepic.jpg" />
          <Card.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-mail cím</Form.Label>
                <Form.Control type="email" placeholder="E-mail cím" />
                <Form.Text className="text-muted">
                  <p>Az e-mail címet más felhasználó nem láthatja.</p>
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Teljes név</Form.Label>
                <Form.Control type="email" placeholder="Kiss Pista" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Jelszó</Form.Label>
                <Form.Control type="password" placeholder="Jelszó" />
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
                  onChange={(token: string | null) => {}}
                  theme={theme === Theme.Default ? "light" : "dark"}
                  ref={recaptchaRef}
                />
              </Form.Group>
              <Button
                variant={theme === Theme.Default ? "dark" : "light"}
                type="submit"
                className="d-block mx-auto"
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
