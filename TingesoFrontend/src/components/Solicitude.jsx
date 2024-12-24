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
  const [files, setFiles] = useState({
    proofOfIncome: null,
    appraisalCertificate: null,
    creditHistory: null,
    houseDeed: null,
    businessFinancialStatus: null,
    businessPlan: null,
    remodelBudget: null,
  });

  // useEffect to store the user's RUT in localStorage
  useEffect(() => {
    const storedRut = localStorage.getItem('user');
    if (storedRut) {
      setRutUser(storedRut);
    }
  }, []);

  const handleFileChange = (event, key) => {
    setFiles({ ...files, [key]: event.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('rutUser', rutUser);
    formData.append('idMortgageLoan', idMortgageLoan);
    Object.entries(files).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    loanSolicitudeService
      .store(formData)
      .then((response) => {
        console.log(response.data);
        alert(response.data);
      })
      .catch((error) => {
        console.error('Error sending request:', error);
        alert('Error sending request');
      });
  };

  const FileUpload = (label, key) => (
    <FormControl fullWidth margin="normal">
      <Typography>{label}:</Typography>
      <input
        type="file"
        id={key}
        style={{ display: 'none' }}
        onChange={(e) => handleFileChange(e, key)}
      />
      <Button
      variant="contained"
      component="label"
      sx={{ backgroundColor: "#092292" }}
      htmlFor={key}>
        {files[key] ? files[key].name : 'Upload file'}
      </Button>
    </FormControl>
  );

  return (
    <Box className="Box-form">
      <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
      Mortgage loan solicitude
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="User RUT"
            type="text"
            value={rutUser}
            onChange={(e) => setRutUser(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Loan type</InputLabel>
          <Select
            value={idMortgageLoan}
            onChange={(e) => setIdMortgageLoan(e.target.value)}
            required
          >
            <MenuItem value={1}>First home loan</MenuItem>
            <MenuItem value={2}>Second home loan</MenuItem>
            <MenuItem value={3}>Commercial properties loan</MenuItem>
            <MenuItem value={4}>Remodeling loan</MenuItem>
          </Select>
        </FormControl>

        {idMortgageLoan === 1 && (
          <>
            {FileUpload('Proof of income', 'proofOfIncome')}
            {FileUpload('Appraisal certificate', 'appraisalCertificate')}
            {FileUpload('Credit history', 'creditHistory')}
          </>
        )}

        {idMortgageLoan === 2 && (
          <>
            {FileUpload('Proof of income', 'proofOfIncome')}
            {FileUpload('Appraisal certificate', 'appraisalCertificate')}
            {FileUpload('Escritura de la primera vivienda', 'houseDeed')}
            {FileUpload('Credit history', 'creditHistory')}
          </>
        )}

        {idMortgageLoan === 3 && (
          <>
            {FileUpload('Bussines financial status', 'businessFinancialStatus')}
            {FileUpload('Proof of income', 'proofOfIncome')}
            {FileUpload('Appraisal certificate', 'appraisalCertificate')}
            {FileUpload('Bussines plan', 'businessPlan')}
          </>
        )}

        {idMortgageLoan === 4 && (
          <>
            {FileUpload('Proof of income', 'proofOfIncome')}
            {FileUpload('Remodel budget', 'remodelBudget')}
            {FileUpload('Appraisal certificate', 'appraisalCertificate')}
          </>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#2d53ff", marginTop: 2 }}
          startIcon={<SendIcon />}
        >
          Submit Request
        </Button>
      </form>
    </Box>
  );
}

export default Solicitude;
