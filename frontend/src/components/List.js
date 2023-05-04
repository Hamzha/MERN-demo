import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GetListUser, SetSelected } from '../store/userSlice';

export default function ListUser() {
  const dispatch = useDispatch();
  const { user, userList, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      dispatch(GetListUser({ token: user.token }));
    }
    fetchData();
  }, [user]);
  useEffect(() => {
    if (error.length !== 0) {
      alert(error);
    }
  }, [error]);
  return (
    <Container className="p-5">
      <Card className="m-5 p-3">
        <h3 className="text-center">List User</h3>
        <Card.Body
          className="m-3 p-3"
        >
          <Table striped bordered hover className=" shadow p-5 mb-2 bg-white rounded">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>

              {userList.length && userList.map((item) => (
                <tr
                  onClick={() => {
                    dispatch(SetSelected(item));
                    navigate(`/user/${item._id}`);
                  }}
                  key={item.email}
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.admin ? 'True' : 'False'}</td>

                </tr>
              ))}

            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
