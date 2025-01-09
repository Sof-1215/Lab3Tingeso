import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import SendIcon from '@mui/icons-material/Send';

const Simulator = () => {
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [termYears, setTermYears] = useState('');
    const [propertyValue, setPropertyValue] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [loanType, setLoanType] = useState('');

    const [errors, setErrors] = useState({
        propertyValue: '',
        amount: '',
        interestRate: '',
        termYears: '',
        loanType: '',
    });

    // Define mensajes de condiciones
    const conditions = {
        1: "Hasta 30 años, 2.5%-5.0% interés anual, 80% del valor de la propiedad.",
        2: "Hasta 20 años, 4.0%-6.0% interés anual, 70% del valor de la propiedad.",
        3: "Hasta 25 años, 5.0%-7.0% interés anual, 60% del valor de la propiedad.",
        4: "Hasta 15 años, 4.5%-6.0% interés anual, 50% del valor de la propiedad.",
    };

    const calculateMonthlyPayment = (event) => {
        event.preventDefault();
        const P = parseFloat(amount);
        const r = (parseFloat(interestRate) / 100) / 12;
        const n = parseInt(termYears) * 12;
        const pValue = parseFloat(propertyValue);
        const loanTypeValue = parseInt(loanType);

        let newErrors = {};
        let maxAmount;

        // Validación de los campos
        if (!propertyValue || isNaN(pValue) || pValue <= 0) {
            newErrors.propertyValue = "El valor de la propiedad debe ser mayor a 0.";
        }
        if (!amount || isNaN(P) || P <= 0) {
            newErrors.amount = "El monto del préstamo debe ser mayor a 0.";
        }
        if (!interestRate || isNaN(r) || r <= 0) {
            newErrors.interestRate = "La tasa de interés debe ser mayor a 0.";
        }
        if (!termYears || isNaN(termYears) || termYears <= 0) {
            newErrors.termYears = "El plazo debe ser mayor a 0.";
        }

        // Validación según el tipo de préstamo
        switch (loanTypeValue) {
            case 1:
                maxAmount = pValue * 0.8;
                if (termYears > 30) {
                    newErrors.termYears = "El plazo debe ser de hasta 30 años para primera vivienda.";
                }
                if (r * 12 < 0.025 || r * 12 > 0.05) {
                    newErrors.interestRate = "La tasa de interés debe estar entre 2.5% y 5.0% para primera vivienda.";
                }
                if (P > maxAmount) {
                    newErrors.amount = "El monto del préstamo no puede ser superior al 80% del valor de la propiedad.";
                }
                break;
            case 2:
                maxAmount = pValue * 0.7;
                if (termYears > 20) {
                    newErrors.termYears = "El plazo debe ser de hasta 20 años para segunda vivienda.";
                }
                if (r * 12 < 0.04 || r * 12 > 0.06) {
                    newErrors.interestRate = "La tasa de interés debe estar entre 4.0% y 6.0% para segunda vivienda.";
                }
                if (P > maxAmount) {
                    newErrors.amount = "El monto del préstamo no puede ser superior al 70% del valor de la propiedad.";
                }
                break;
            case 3:
                maxAmount = pValue * 0.6;
                if (termYears > 25) {
                    newErrors.termYears = "El plazo debe ser de hasta 25 años para propiedades comerciales.";
                }
                if (r * 12 < 0.05 || r * 12 > 0.07) {
                    newErrors.interestRate = "La tasa de interés debe estar entre 5.0% y 7.0% para propiedades comerciales.";
                }
                if (P > maxAmount) {
                    newErrors.amount = "El monto del préstamo no puede ser superior al 60% del valor de la propiedad.";
                }
                break;
            case 4:
                maxAmount = pValue * 0.5;
                if (termYears > 15) {
                    newErrors.termYears = "El plazo debe ser de hasta 15 años para préstamos de remodelación.";
                }
                if (r * 12 < 0.045 || r * 12 > 0.06) {
                    newErrors.interestRate = "La tasa de interés debe estar entre 4.5% y 6.0% para préstamos de remodelación.";
                }
                if (P > maxAmount) {
                    newErrors.amount = "El monto del préstamo no puede ser superior al 50% del valor de la propiedad.";
                }
                break;
            default:
                newErrors.loanType = "Seleccione un tipo de préstamo válido.";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const M = P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
        setMonthlyPayment(M);
    };

    return (
        <Box className="Box-form">
            <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                Simulador de préstamos
            </Typography>
            <form onSubmit={calculateMonthlyPayment}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Tipo de préstamo</InputLabel>
                    <Select
                        value={loanType}
                        onChange={(e) => setLoanType(e.target.value)}
                        error={!!errors.loanType}
                    >
                        <MenuItem value="">Seleccionar</MenuItem>
                        <MenuItem value="1">Primera vivienda</MenuItem>
                        <MenuItem value="2">Segunda vivienda</MenuItem>
                        <MenuItem value="3">Propiedades comerciales</MenuItem>
                        <MenuItem value="4">Remodelación</MenuItem>
                    </Select>
                    {errors.loanType && <Typography color="error">{errors.loanType}</Typography>}
                </FormControl>

                {loanType && (
                    <Typography variant="body2" color="textSecondary" margin="normal">
                        {conditions[loanType]}
                    </Typography>
                )}

                <TextField
                    label="Valor de la propiedad"
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(e.target.value)}
                    error={!!errors.propertyValue}
                    helperText={errors.propertyValue}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Monto del préstamo"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    error={!!errors.amount}
                    helperText={errors.amount}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Tasa de interés anual (%)"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    error={!!errors.interestRate}
                    helperText={errors.interestRate}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Plazo (años)"
                    type="number"
                    value={termYears}
                    onChange={(e) => setTermYears(e.target.value)}
                    error={!!errors.termYears}
                    helperText={errors.termYears}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: "#2d53ff" }}
                    startIcon={<SendIcon />}
                >
                    Calcular cuota mensual
                </Button>
            </form>

            {monthlyPayment !== null && (
                <Box marginTop="20px" textAlign="center">
                    <Typography variant="h4" color="59b526">
                        Cuota mensual: ${monthlyPayment.toFixed(0)}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default Simulator;