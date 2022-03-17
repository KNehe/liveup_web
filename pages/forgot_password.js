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
import authService from "../features/auth/authService";

const ForgotPassword = () => {
  const [form, setForm] = useState({ email: "" });

  const { email } = form;

  const router = useRouter();

  const { authDetails, isLoading, isSuccess } = useSelector(
    (state) => state.auth
  );

  const [message, setMessage] = useState('');
  const [showAlert, setAlert] = useState(false);
  const [isProcessing, setProcessing] = useState(false);

  const formRef = useRef(null)

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
    
    setAlert(false)
    setProcessing(true)

    const { data, error } = await authService.forgotPasswordRequest(email);
    if (error) {
      toast.error("An error occurred");
      setProcessing(false)
      return;
    }
    setMessage("Please check your email");
    setAlert(true)
    toast.info('Please check your email');
    setProcessing(false)
    setForm({email: ''})
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <Container>
        <div style={{ marginTop: "35vh" }}></div>
        <Row className="mx-auto">
          <Col lg={6} md={8} sm={10} className="mx-auto">
            <Card className="p-3">
              <Alert show={showAlert} variant="success" className="p-2 m-2">
                <Alert.Heading>Email sent</Alert.Heading>
                <p>
                 {message}
                </p>
              </Alert>
              <Form onSubmit={onForgotPasswordFormSubmitted} ref={formRef}>
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    onChange={onInputChange}
                    value={email}
                    name="email"
                    type="email"
                    placeholder="Enter email"
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
                    "Submit Reset Request"
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

export default ForgotPassword;
