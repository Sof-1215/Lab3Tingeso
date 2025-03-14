import './App.css'
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from "./components/Navbar"
import Login from './components/Login';
import Register from './components/Register';
import Simulator from './components/Simulator';
import Solicitude from './components/Solicitude';
import ListSolicitude from './components/ListSolicitude';
import EditSolicitude from './components/EditSolicitude';
import AllSolicitudes from './components/AllSolicitudes';
import Evaluation from './components/Evaluation';

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
              <Route path="loan-solicitudes" element={<ListSolicitude />} />
              <Route path="edit-solicitude/:id" element={<EditSolicitude />} />
              <Route path="get-solicitudes" element={<AllSolicitudes />} />
              <Route path="/evaluation-solicitude/:id" element={<Evaluation />} />
            </Routes>
          </div>
      </Router>
  );
}

export default App
