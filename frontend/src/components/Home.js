import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';


export default function Home() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return <Container className='p-5'>
    <Card className='m-5 p-3'>
      <Card.Body
        className='m-3 p-3'>

        <div className='bg-light p-3 mb-3'>

          <Row className='align-items-center'>
            <h5 className='col-2'>Name:</h5>
            <p className='col-4 fs-6 pt-2'>{user.user.name}</p>
          </Row>
          <Row>
            <h5 className='col-2'>Email:</h5>
            <p className='col-4 fs-6'>{user.user.email}</p>
          </Row>

        </div>

      </Card.Body>
    </Card>
  </Container >;
}

