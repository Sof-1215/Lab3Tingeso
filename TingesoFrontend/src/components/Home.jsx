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
      <h1>Bienvenido a PrestaBanco</h1>

      {isAuthenticated ? (
        <div>
          <p>Haz iniciado sesión. ¡Disfruta tu experiencia!</p>
          <button className='button-style' onClick={goToSolicitude}>Hacer una solicitud</button>
          <button className='button-style' onClick={goToSimulator}>Simular préstamo</button>
          <button className='button-style' onClick={goToListSolicitudes}>Mis solicitudes</button>
          <button className='button-style' onClick={handleLogout}>Salir</button>
        </div>
      ) : (
        <div>
          <p>Esta es la página principal, al ser cliente de Prestabanco puedes realizar simulaciones de préstamos y realizar solicitudes de distintos tipos según tus necesidades.</p>
          <p>Inicia sesión y explora las diferentes oferts y beneficios que les ofrecemos a nuestros clientes.</p>
          <button className='button-style' onClick={goToLogin}>Iniciar sesión</button>
          <p>¿Aún no eres cliente? ¡Queremos ayudarte! Estamos esperando a que te nos unas.</p>
          <button className='button-style' onClick={goToRegister}>Registrarse</button>
        </div>
      )}
    </div>
  );
};

export default Home;
