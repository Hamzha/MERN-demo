import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { selectedUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <Container className="p-5">
      <Card className=" align-center m-5 p-3">
        <Card.Body className="p-4 ">
          {selectedUser && (
          <>
            <div className="row">
              <p>
                Name:
                {selectedUser.name}
              </p>
            </div>
            <div className="row">
              <p>
                Email:
                {selectedUser.email}
              </p>
            </div>
            <div className="row">
              <p>
                Admin:
                {selectedUser.admin ? 'True' : 'False'}
              </p>
            </div>

            <Button onClick={() => {
              navigate(`/user/edit/${selectedUser._id}`)();
            }}
            >
              Edit
            </Button>
          </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
