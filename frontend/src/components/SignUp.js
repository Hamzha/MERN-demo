import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Register } from '../store/userSlice';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    dispatch(Register(data));
  };
  useEffect(() => {
    if (error.length !== 0) {
      alert(error);
    }
  }, [error]);

  return (
    <Container className="p-5">
      <Card className="m-5 p-3">
        <Card.Body>
          <Card.Header className="mb-4 pt-2 row justify-content-between">
            <h4 className="col-4 pt-3">Sign Up</h4>
            <p className="col-5 pt-3">
              Already has a account?
              <Link to="/login">Login</Link>
            </p>
          </Card.Header>
          <form onSubmit={handleSubmit(onSubmitHandler)}>

            <Row>
              <Col md={3}>
                <Form.Label className="fs-5">Name:</Form.Label>
              </Col>
              <Col md={3}>
                <input {...register('name')} placeholder="name" type="text" required className="p-1" />
                <p className="text-danger">{errors.bane?.message}</p>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <Form.Label className="fs-5">Email Address:</Form.Label>
              </Col>
              <Col md={3}>
                <input {...register('email')} placeholder="email" type="email" required className="p-1" />
                <p className="text-danger">{errors.email?.message}</p>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <Form.Label className="fs-5">Password:</Form.Label>
              </Col>
              <Col md={3}>
                <input {...register('password')} placeholder="password" type="password" required className="p-1" />
                <p className="text-danger">{errors.password?.message}</p>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              SignUp
            </Button>

          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}
