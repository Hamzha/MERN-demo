import { BrowserRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import Navigation from './Navigation';

function App() {
  const { login } = useSelector((state) => state.user)

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
