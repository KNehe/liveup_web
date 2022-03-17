import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Spinner, Alert } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { navigate } from "../utils/navigate";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import authService from "../../../features/auth/authService";

const PasswordResetConfirm = () => {
  const [form, setForm] = useState({ new_password1: "", new_password2: "" });

  const { new_password1, new_password2 } = form;

  const router = useRouter();

  const { authDetails, isSuccess } = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");
  const [showAlert, setAlert] = useState(false);
  const [isProcessing, setProcessing] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    if (isSuccess || authDetails) {
      navigate(router, authDetails);
    }
  }, [authDetails, isSuccess]);

  const onInputChange = (e) => {
    setForm((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onForgotPasswordFormSubmitted = async (e) => {
    e.preventDefault();

    setAlert(false);
    setProcessing(true);

    const payload = {
      new_password1: new_password1,
      new_password2: new_password2,
      uid: router.query.uid,
      token: router.query.token,
    };

    if (payload.new_password1 !== payload.new_password2) {
      toast.error("Passwords are not equal");
      setProcessing(false);
      return;
    }
    const { data, error } = await authService.passwordResetConfirm(payload);
    if (error) {
      toast.error("An error occurred | Probably link expired");
      setProcessing(false);
      return;
    }
    setMessage("Password changed successfully");
    setAlert(true);
    toast.info("Password changed successfully");
    setProcessing(false);
    setForm({ new_password1: "", new_password2: "" });
  };
  return (
    <>
      <Head>
        <title>Password Reset Confirm</title>
      </Head>
      <Container>
        <div style={{ marginTop: "25vh" }}></div>
        <Row className="mx-auto">
          <Col lg={6} md={8} sm={10} className="mx-auto">
            <Card className="p-3">
              <Alert show={showAlert} variant="success" className="p-2 m-2">
                <Alert.Heading>Password changed</Alert.Heading>
                <p>{message}</p>
              </Alert>
              <Form onSubmit={onForgotPasswordFormSubmitted} ref={formRef}>
                <Form.Group className="mb-4" controlId="new_password1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    onChange={onInputChange}
                    value={new_password1}
                    name="new_password1"
                    type="password"
                    placeholder="Enter password"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="new_password2">
                  <Form.Label>Repeat Password</Form.Label>
                  <Form.Control
                    required
                    onChange={onInputChange}
                    value={new_password2}
                    name="new_password2"
                    type="password"
                    placeholder="Enter password again"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isProcessing}>
                  {isProcessing ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </Form>

              <Link href="/login">
                <a className="mt-4">Remember password ?</a>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PasswordResetConfirm;
