import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from 'react-redux';
import { GetLogin } from '../store/userSlice';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { error } = useSelector(state => state.user)
  const onSubmitHandler = async (data) => {
    dispatch(GetLogin(data));
  };
  useEffect(() => {
    if (error && error.length !== 0) {
      console.log(error)
      alert(error)
    }
  }, [error])
  return <Container className='p-5'>
    <Card className='m-5 p-3'>
      <Card.Body>
        <Card.Header className='mb-4 pt-2 row justify-content-between'>
          <h4 className='col-4 pt-3'>Login</h4>
          <p className='col-5 pt-3'>Signup if not registered.
            {"  "}<Link to={'/signup'}>Signup</Link>
          </p>
        </Card.Header>
        <form onSubmit={handleSubmit(onSubmitHandler)}>

          <Row>
            <Col md={3}>
              <Form.Label className='fs-5'>Email Address:</Form.Label>
            </Col>
            <Col md={3}>
              <input {...register("email")} placeholder="email" type="email" required className='p-1' />
              <p className='text-danger'>{errors.email?.message}</p>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <Form.Label className='fs-5'>Password:</Form.Label>
            </Col>
            <Col>
              <input {...register("password")} placeholder="password" type="password" required className='p-1' />
              <p className='text-danger'>{errors.password?.message}</p>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </form>
      </Card.Body>
    </Card>
  </Container>
}

