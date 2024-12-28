import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!user);
    };
    checkAuthStatus();
  }, []);

  const goToListSolicitudes = () => {
    navigate('/loan-solicitudes');
  };

  const goToSimulator = () => {
    navigate('/simulator');
  };

  const goToSolicitude = () => {
    navigate('/solicitude');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <div className="Box-form">
      <h1>Welcome to PrestaBanco</h1>

      {isAuthenticated ? (
        <div>
          <p>You are logged in! Enjoy your experience.</p>
          <button className='button-style' onClick={goToSolicitude}>Make a Solicitude</button>
          <button className='button-style' onClick={goToSimulator}>Simulate Loan</button>
          <button className='button-style' onClick={goToListSolicitudes}>Show Loan Solicitudes</button>
          <button className='button-style' onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>This is the main page, you can carry out credit simulations and request different types of loans depending on what you need.</p>
          <p>Log in and explore our different offers and benefits for our clients</p>
          <button className='button-style' onClick={goToLogin}>Login</button>
          <p>Don't have an account?</p>
          <p>We want to help you and are waiting for you to join us.</p>
          <button className='button-style' onClick={goToRegister}>Register here</button>
        </div>
      )}
    </div>
  );
};

export default Home;
