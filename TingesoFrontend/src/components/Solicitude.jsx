import React, { useState, useEffect } from 'react';
import loanSolicitudeService from '../services/loansolicitude.service';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

function Solicitude() {
  const [rutUser, setRutUser] = useState('');
  const [idMortgageLoan, setIdMortgageLoan] = useState('');
  const [salary, setSalary] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [termYears, setTermYears] = useState('');
  const [jobSeniority, setJobSeniority] = useState('');
  const [debtsAmount, setDebtsAmount] = useState('');
  const [files, setFiles] = useState({
    proofOfIncome: null,
    appraisalCertificate: null,
    creditHistory: null,
    houseDeed: null,
    businessFinancialStatus: null,
    businessPlan: null,
    remodelBudget: null,
    dicomHistory: null,
    transactionHistory: null,
  });
  const [errors, setErrors] = useState({
    propertyValue: '',
    amount: '',
    interestRate: '',
    termYears: '',
    idMortgageLoan: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const conditions = {
    1: "Recuerda: Plazo hasta 30 años, 2.5%-5.0% interés anual, 80% del valor de la propiedad.",
    2: "Recuerda: Plazo hasta 20 años, 4.0%-6.0% interés anual, 70% del valor de la propiedad.",
    3: "Recuerda: Plazo hasta 25 años, 5.0%-7.0% interés anual, 60% del valor de la propiedad.",
    4: "Recuerda: Plazo hasta 15 años, 4.5%-6.0% interés anual, 50% del valor de la propiedad.",
  };

  // useEffect to store the user's RUT in localStorage
  useEffect(() => {
    const storedRut = localStorage.getItem('user');
    if (storedRut) {
      setRutUser(storedRut);
    }
  }, []);

  const handleChange = (setter, key) => (e) => {
    setter(e.target.value);
  };

  const handleFileChange = (event, key) => {
    setFiles({ ...files, [key]: event.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('rutUser', rutUser);
    formData.append('idMortgageLoan', idMortgageLoan);
    formData.append('salary', salary);
    formData.append('propertyValue', propertyValue);
    formData.append('amount', amount);
    formData.append('interestRate', interestRate);
    formData.append('termYears', termYears);
    formData.append('jobSeniority', jobSeniority);
    formData.append('debtsAmount', debtsAmount);
    Object.entries(files).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const response = await loanSolicitudeService.store(formData);
      if (response.data === "Archivos subidos") {
        setResponseMessage("Archivos subidos exitosamente.");
      } else {
        setResponseMessage("Error al subir archivos.");
      }
    } catch (error) {
      console.error('Error sending request:', error);
      setResponseMessage('Error al enviar la solicitud.');
    }
  };

  const FileUpload = (label, key) => {
    const isFileUploaded = files[key] !== null;

    return (
      <FormControl fullWidth margin="normal">
        <Typography>{label}:</Typography>
        <input
          type="file"
          id={key}
          style={{ display: 'none' }}
          accept="application/pdf"
          onChange={(e) => handleFileChange(e, key)}
        />
        <Button
          variant="contained"
          component="label"
          sx={{
            backgroundColor: isFileUploaded ? '#59b526' : '#2d53ff',
            '&:hover': {
              backgroundColor: isFileUploaded ? '#40821c' : '#1a40b8',
            },
          }}
          htmlFor={key}
        >
          {isFileUploaded ? files[key].name : 'Subir archivo'}
        </Button>
      </FormControl>
    );
  };

  return (
    <Box className="Box-form">
      <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
        Solicitud de crédito hipotecario
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="RUT"
            type="text"
            value={rutUser}
            onChange={(e) => setRutUser(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de préstamo</InputLabel>
          <Select
            value={idMortgageLoan}
            onChange={(e) => setIdMortgageLoan(e.target.value)}
            required
          >
            <MenuItem value={1}>Primera vivienda</MenuItem>
            <MenuItem value={2}>Segunda vivienda</MenuItem>
            <MenuItem value={3}>Propiedades comerciales</MenuItem>
            <MenuItem value={4}>Remodelación</MenuItem>
          </Select>
          {idMortgageLoan && (
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
              {conditions[idMortgageLoan]}
            </Typography>
          )}
        </FormControl>
        <TextField
          label="Antigüedad laboral (años)"
          type="number"
          value={jobSeniority}
          onChange={handleChange(setJobSeniority, "jobSeniority")}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Monto de deudas"
          type="number"
          value={debtsAmount}
          onChange={handleChange(setDebtsAmount, "debtsAmount")}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Salario"
          type="number"
          value={salary}
          onChange={handleChange(setSalary, "salary")}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Valor de la propiedad"
          type="number"
          value={propertyValue}
          onChange={handleChange(setPropertyValue, "propertyValue")}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Monto del préstamo"
          type="number"
          value={amount}
          onChange={handleChange(setAmount, "amount")}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Tasa de interés anual (%)"
          type="number"
          value={interestRate}
          onChange={handleChange(setInterestRate, "interestRate")}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Plazo (años)"
          type="number"
          value={termYears}
          onChange={handleChange(setTermYears, "termYears")}
          fullWidth
          margin="normal"
          required
        />

        {FileUpload('Historial DICOM', 'dicomHistory')}
        {FileUpload('Historial de transacciones', 'transactionHistory')}

        {idMortgageLoan === 1 && (
          <>
            {FileUpload('Comprobante de ingresos', 'proofOfIncome')}
            {FileUpload('Certificado de avalúo', 'appraisalCertificate')}
            {FileUpload('Historial crediticio', 'creditHistory')}
          </>
        )}

        {idMortgageLoan === 2 && (
          <>
            {FileUpload('Comprobante de ingresos', 'proofOfIncome')}
            {FileUpload('Certificado de avalúo', 'appraisalCertificate')}
            {FileUpload('Escritura de la primera vivienda', 'houseDeed')}
            {FileUpload('Historial crediticio', 'creditHistory')}
          </>
        )}

        {idMortgageLoan === 3 && (
          <>
            {FileUpload('Estado financiero del negocio', 'businessFinancialStatus')}
            {FileUpload('Comprobante de ingresos', 'proofOfIncome')}
            {FileUpload('Certificado de avalúo', 'appraisalCertificate')}
            {FileUpload('Plan de negocios', 'businessPlan')}
          </>
        )}

        {idMortgageLoan === 4 && (
          <>
            {FileUpload('Comprobante de ingresos', 'proofOfIncome')}
            {FileUpload('Presupuesto de remodelación', 'remodelBudget')}
            {FileUpload('Certificado de avalúo', 'appraisalCertificate')}
          </>
        )}

        <Button
          id='submit'
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#2d53ff",
            marginTop: 2,
            '&:hover': {
              backgroundColor: '#1a40b8', // Color más oscuro al pasar el cursor
            },
          }}
          startIcon={<SendIcon />}
        >
          Enviar solicitud
        </Button>
      </form>

      {responseMessage && (
        <Typography variant="h4" color="1a40b8" sx={{ color: "#59b526" , marginTop: 2 }}>
          {responseMessage}
        </Typography>
      )}
    </Box>
  );
}

export default Solicitude;
