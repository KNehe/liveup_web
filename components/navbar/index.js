import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { reset, resetAuthDetails } from "../../features/auth/authSlice";
import authService from "../../features/auth/authService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const CNavbar = () => {
  const { authDetails } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (authDetails) {
      setTitle(`Signed in as ${authDetails?.user?.username}`);
    }
  }, [authDetails]);

  const onLogout = (e) => {
    dispatch(resetAuthDetails());
    dispatch(reset());
    authService.logout();
    router.push("/");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      fixed="top"
      style={{minHeight: '10vh', width: '100%'}}
    >
      <Container>
        <Navbar.Brand href="/">LiveUp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {!authDetails?.user ? (
              <>
                <Nav.Link href="/#about">About</Nav.Link>
                <Nav.Link href="/#features">Features</Nav.Link>
              </>
            ) : (
              ""
            )}
          </Nav>

          <Nav>
            {authDetails?.user ? (
              <NavDropdown title={title} id="collasible-nav-dropdown">
                <Link href='/profile'>
                  <NavDropdown.Item href='/profile'>
                    Profile
                  </NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CNavbar;
