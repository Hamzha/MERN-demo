import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import NavBar from './components/NavBar';
import Navigation from './Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { login } = useSelector((state) => state.user);

  return (
    <div className="App">
      <BrowserRouter>
        {login && <NavBar />}
        <Navigation />
      </BrowserRouter>

    </div>
  );
}

export default App;
