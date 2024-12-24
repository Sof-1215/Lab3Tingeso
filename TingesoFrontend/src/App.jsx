import './App.css'
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from "./components/Navbar"
import Login from './components/Login';
import Register from './components/Register';
import Simulator from './components/Simulator';
import Solicitude from './components/Solicitude';

function App() {
  return (
      <Router>
          <div className="container">
          <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/solicitude" element={<Solicitude />} />
            </Routes>
          </div>
      </Router>
  );
}

export default App
