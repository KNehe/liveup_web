import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {logout} from '../../features/auth/authSlice'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const CNavbar = () => {
  const { authDetails } = useSelector((state) => state.auth);
  const [title, setTitle] = useState('')
  
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(()=>{
    if (authDetails){
      setTitle(`Signed in as ${authDetails?.user?.username}`)
    }
  }, [authDetails])

  const onLogout = e => {
      dispatch(logout())
      router.push('/')
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" fixed="top">
    <Container>
    <Navbar.Brand href="#home">LiveUp</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#features">About</Nav.Link>
        <Nav.Link href="#pricing">Features</Nav.Link>
      </Nav>

      <Nav>
      <NavDropdown title={title} id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onSelect={onLogout} >Logout</NavDropdown.Item>
      </NavDropdown>
        <Nav.Link href="login">Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>

    </Container>
  </Navbar>
  );
};

export default CNavbar;
