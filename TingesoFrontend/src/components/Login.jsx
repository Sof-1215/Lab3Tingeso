import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/user.service';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

const Login = () => {
  const [rut, setRut] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await userService.login(rut);

      if (response.status === 200) {
        localStorage.setItem("user", rut); // Save rut user in localStorage
        navigate("/"); // Redirect to the home page
      }
    } catch (err) {
      setError("User not found");
    }
  };

  return (
    <Box className="Box-form"
    component="form"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
      
    onSubmit={handleSubmit}>
      <h1>Login Page</h1>
      <TextField
        label="Rut"
        variant="outlined"
        fullWidth
        margin="normal"
        value={rut}
        onChange={(e) => setRut(e.target.value)}
      />
      <Button
      type="submit"
      variant="contained"
      sx={{ backgroundColor: "#2d53ff" }}
      startIcon={<SendIcon />}>
        Login
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </Box>
  );
};

export default Login;
