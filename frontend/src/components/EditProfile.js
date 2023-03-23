import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { UpdateUser } from '../store/userSlice';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
});

export default function EditProfile() {
  const dispatch = useDispatch();

  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const { user, selectedUser } = useSelector((state) => state.user);
  useEffect(() => {
    reset({
      name: selectedUser.name,
      email: selectedUser.email,
    });
  }, [reset, selectedUser]);

  const onSubmitHandler = async (data) => {
    dispatch(UpdateUser({ ...data, _id: selectedUser._id, token: user.token }));
    navigate(-1);
  };
  return (
    <Container className="p-5">

      <Card className="m-5 p-3">
        <Card.Body>
          <Card.Header className="mb-4">
            <h4>Edit Profile</h4>
          </Card.Header>
          <form onSubmit={handleSubmit(onSubmitHandler)}>

            <Row>
              <Col md={3}>
                <Form.Label className="fs-5">Name:</Form.Label>
              </Col>
              <Col>
                <input {...register('name')} placeholder="name" type="text" required className="ms-5" />
                <p className="text-danger">{errors.bane?.message}</p>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <Form.Label className="fs-5">Email Address:</Form.Label>
              </Col>
              <Col md={3}>
                <input {...register('email')} placeholder="email" type="email" required className="ms-5" />
                <p className="text-danger">{errors.email?.message}</p>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <Form.Label className="fs-5">Password</Form.Label>
              </Col>
              <Col md={3}>
                <input {...register('password')} placeholder="password" type="password" required className="ms-5" />
                <p className="text-danger">{errors.password?.message}</p>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Update
            </Button>

          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}
