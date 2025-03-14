import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SendIcon from '@mui/icons-material/Send';
import Typography from "@mui/material/Typography";

const Register = () => {
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setbirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rutError, setRutError] = useState("");
  const [nameError, setNameError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to validate the RUT
  const validateRut = (rut) => {
    const rutPattern = /^\d{7,8}-[0-9K]$/; // Regular expression for RUT
    return rutPattern.test(rut);
  };

  // Function to validate the email
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email
    return emailPattern.test(email);
  };

  // Function to validate the birthdate
  const validateBirthdate = (birthdate) => {
    const today = new Date();
    const birthDateObject = new Date(birthdate);
    const YearsAgo = new Date(today.getFullYear() - 115, today.getMonth(), today.getDate());

    return birthDateObject <= today && birthDateObject >= YearsAgo;
  };

  const validatePassword = (password) => {
    return password.length >= 8; // Ensure the password has at least 8 characters
  };
  
  const saveUser = (e) => {
    e.preventDefault();

    // Reset errors
    setRutError("");
    setNameError("");
    setBirthdateError("");
    setEmailError("");
    setPasswordError("");
    setError("");

    // Validate fields
    let hasError = false;

    if (!validateRut(rut)) {
      setRutError("RUT inválido. Debe seguir el formato 12345678-9 o 12345678-K.");
      hasError = true;
    }

    if (!validateEmail(email)) {
      setEmailError("Email inválido.");
      hasError = true;
    }

    if (!validateBirthdate(birthdate)) {
      setBirthdateError("Fecha de nacimiento inválida.");
      hasError = true;
    }

    if (!validatePassword(password)) {
      setPasswordError("La contra<seña debe tener al menos 8 carácteres.");
      hasError = true;
    }

    if (name.trim() === "") {
      setNameError("Nombre requerido.");
      hasError = true;
    }

    if (hasError) return; // If there are errors, exit the function

    const birthdateObject = new Date(birthdate); // Convert the birthdate to a Date object

    const newUser = {
      rut,
      name,
      birthdate: birthdateObject,
      email,
      password,
    };

    userService
      .create(newUser)
      .then((response) => {
        console.log("New user added:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error creating new user:", error);
        setError("Error creating user. Please verify the data entered.");
      });
  };

  return (
    <Box className="Box-form" component="form">
      <Typography variant="h4" gutterBottom>
        Registro
      </Typography>
      <hr />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          id="rut"
          label="Rut"
          value={rut}
          variant="outlined"
          onChange={(e) => setRut(e.target.value)}
          helperText={rutError}
          error={!!rutError}
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          id="name"
          label="Nombre"
          value={name}
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          helperText={nameError}
          error={!!nameError}
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          id="birthdate"
          label="Fecha de nacimiento"
          type="date"
          value={birthdate}
          variant="outlined"
          onChange={(e) => setbirthdate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          helperText={birthdateError}
          error={!!birthdateError}
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          helperText={emailError}
          error={!!emailError}
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          helperText={passwordError}
          error={!!passwordError}
          required
        />
      </FormControl>

      <Button
        variant="contained"
        onClick={saveUser}
        sx={{ backgroundColor: "#2d53ff" }}
        startIcon={<SendIcon />}
      >
        Registrar
      </Button>

      <Link to="/" style={{ textDecoration: 'none', color: '#3f51b5' }}>
        Volver
      </Link>
    </Box>
  );
};

export default Register;
