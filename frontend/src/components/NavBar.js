import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Logout, SetSelected } from '../store/userSlice';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Dummy Project</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => {
              navigate('/home');
            }}
            >
              Home

            </Nav.Link>
            <Nav.Link onClick={() => {
              dispatch(SetSelected(user.user));
              navigate(`/user/edit/${user.user._id}`);
            }}
            >
              Edit

            </Nav.Link>
            {user.user.admin
              && (
              <Nav.Link onClick={() => {
                navigate('/list-user');
              }}
              >
                List

              </Nav.Link>
              )}
            <Nav.Link onClick={() => {
              dispatch(Logout());
              navigate('/login');
            }}
            >
              Signout

            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
