import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Verify authentication status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated using localStorage
    const checkAuthStatus = () => {
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!user); // Update the authentication status based on the user's existence
    };

    checkAuthStatus();
  }, []);

  // Redirect to the registration page
  const goToRegister = () => {
    navigate('/register');
  };

  // Redirect to the login page
  const goToLogin = () => {
    navigate('/login');
  };

  // Redirect to the simulator page
  const goToSimulator = () => {
    navigate('/simulator');
  };

  // Redirect to the solicitude page
  const goToSolicitude = () => {
    navigate('/solicitude');
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove the user from localStorage
    setIsAuthenticated(false); // Update the authentication status
  };

  return (
    <div className="Box-form">
      <h1>Welcome to PrestaBanco</h1>

      {isAuthenticated ? (
        <div>
          <p>You are logged in! Enjoy your experience.</p>
          <button className='button-style' onClick={goToSolicitude}>Make a Solicitude</button>
          <button className='button-style' onClick={goToSimulator}>Simulate Loan</button>
          <button className='button-style' onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>This is the main page, you can carry out credit simulations and request different types of loans depending on what you need.</p>
          <p>Log in and explore our diffrent offers and benefits for our clients</p>
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
