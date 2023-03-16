import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import EditProfile from './components/EditProfile';
import Home from './components/Home';
import ListUser from './components/List';
import Login from './components/Login';
import UserProfile from './components/Profile';
import SignUp from './components/SignUp';

function Navigation() {
  const { login } = useSelector((state) => state.user);
  return <>{login === true ?
    <Routes>Í
      <Route exact path="/home" element={<Home />} />
      <Route path="/list-user" element={<ListUser />} />
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="/user/edit/:id" element={<EditProfile />} />
      <Route path='/login' element={<Navigate to='/home' element={<Home />} />} />
    </Routes> :
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to='/login' element={<Login />} />} />
    </Routes>
  }
  </>;
}
export default Navigation;
