import Head from "next/head";
import { Card, Form, Button, Container, Col, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import authService from "../features/auth/authService";
import { toast } from "react-toastify";
import withAuth from "../hoc/auth/withauth";
import { setAuthDetails } from "../features/auth/authSlice";
import {useRouter} from 'next/router'

const Profile = () => {
  const { authDetails } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    new_password1: "",
    new_password2: "",
  });

  const { first_name, last_name, phone_number, new_password2, new_password1 } =
    form;

  const [isUpdating, setUpdating] = useState(false);
  const [isUpdatingPassword, setUpdatingPassword] = useState(false);

  const router = useRouter()

  const dispatch = useDispatch();

  useEffect(() => {
    initForm();
  }, []);

  const initForm = () => {
    setForm({
      email: authDetails.user.email,
      first_name: authDetails.user.first_name,
      last_name: authDetails.user.last_name,
      phone_number: authDetails.user.phone_number,
      username: authDetails.user.username,
    });
  };

  const onInputChange = (e) => {
    setForm((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onForm1Submitted = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const { data, error } = await authService.updateUser(
      authDetails.access_token,
      form
    );
    if (error) {
      toast.error("An error occurred");
      return;
    }

    updateState(data);

    setUpdating(false);

    toast.info("Changes made successfully");
  };

  const onForm2Submitted = async (e) => {
    e.preventDefault();
    setUpdatingPassword(true);

    const payload = {
      new_password1: form.new_password1,
      new_password2: form.new_password2,
    };

    if (payload.new_password1 !== payload.new_password2) {
      toast.error("Passwords dont match");
      setUpdatingPassword(false);
      return;
    }

    const { data, error } = await authService.updatePassword(
      authDetails.access_token,
      payload
    );
    if (error) {
      toast.error("An error occurred");
      setUpdatingPassword(false);
      return;
    }

    setUpdatingPassword(false);

    toast.info("Password changed successfully");

    setForm((previousState) => ({
      ...previousState,
      new_password1: '',
      new_password2: ''
    }));
  };

  const updateState = (data) => {
    let details = { ...authDetails };
    details["user"] = data;
    localStorage.setItem("authDetails", JSON.stringify(details));
    dispatch(setAuthDetails(details));
  };

  return (
    <>
      <Head>
        <title>Profile | {authDetails?.user?.username}</title>
      </Head>
      <div style={{ marginTop: "10vh" }}></div>
      <Container className="p-4">
        <Col className="mx-auto" lg={5} md={8} sm={10}>
          {/* email, username, first name, last name, phone number */}
          <Card className="p-4">
            <Card className="p-4 mt-2 mb-2">
              <h6>Email: {form.email} </h6>
              <h6>Username: {form.username} </h6>
              <small style={{ fontSize: ".8rem" }}>
                Can only be changed by admin
              </small>
            </Card>
            <Form onSubmit={onForm1Submitted} on>
              <Form.Group className="mb-4" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  onChange={onInputChange}
                  value={first_name}
                  name="first_name"
                  type="text"
                  placeholder="Enter first name"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  onChange={onInputChange}
                  value={last_name}
                  name="last_name"
                  type="text"
                  placeholder="Enter last name"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="phone_number">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  onChange={onInputChange}
                  value={phone_number}
                  name="phone_number"
                  type="text"
                  placeholder="Enter phone number"
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Save"
                )}
              </Button>
            </Form>
          </Card>

          {/* password */}
          <Card className="p-4 mt-2">
            <Form onSubmit={onForm2Submitted}>
              <Form.Group className="mb-4" controlId="new_password1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  onChange={onInputChange}
                  value={new_password1}
                  name="new_password1"
                  type="password"
                  placeholder="Enter new password"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="new_password2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  onChange={onInputChange}
                  value={new_password2}
                  name="new_password2"
                  type="password"
                  placeholder="Repeat password"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={isUpdatingPassword}
              >
                {isUpdatingPassword ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Save"
                )}
              </Button>
            </Form>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default withAuth(Profile);
