import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

const Simulator = () => {
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [termYears, setTermYears] = useState('');
    const [propertyValue, setPropertyValue] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [loanType, setLoanType] = useState('');

    const handlePositiveValue = (value) => value >= 0 ? value : '';

    const calculateMonthlyPayment = (event) => {
        event.preventDefault();

        const P = parseFloat(amount);
        const r = (parseFloat(interestRate) / 100) / 12; // Monthly interest rate
        const n = parseInt(termYears) * 12; // Total number of payments in months
        const pValue = parseFloat(propertyValue);
        const loanTypeValue = parseInt(loanType);
        
        let maxAmount;

        if (r === 0) {
            setMonthlyPayment(P / n);
            return;
        }

        switch (loanTypeValue) {
            case 1:
                maxAmount = pValue * 0.8;
                if (termYears > 30 || r * 12 < 0.025 || r * 12 > 0.05 || P > maxAmount) {
                    alert('Invalid values: For first home loans, max 30 years, 2.5%-5.0% interest, 80% of property value.');
                    return;
                }
                break;
            case 2:
                maxAmount = pValue * 0.7;
                if (termYears > 20 || r * 12 < 0.04 || r * 12 > 0.06 || P > maxAmount) {
                    alert('Invalid values: For second home loans, max 20 years, 4.0%-6.0% interest, 70% of property value.');
                    return;
                }
                break;
            case 3:
                maxAmount = pValue * 0.6;
                if (termYears > 25 || r * 12 < 0.05 || r * 12 > 0.07 || P > maxAmount) {
                    alert('Invalid values: For commercial property loans, max 25 years, 5.0%-7.0% interest, 60% of property value.');
                    return;
                }
                break;
            case 4:
                maxAmount = pValue * 0.5;
                if (termYears > 15 || r * 12 < 0.045 || r * 12 > 0.06 || P > maxAmount) {
                    alert('Invalid values: For remodeling loans, max 15 years, 4.5%-6.0% interest, 50% of property value.');
                    return;
                }
                break;
            default:
                alert("Please select a valid loan type.");
                return;
        }

        const M = P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
        setMonthlyPayment(M);
    };

    return (
        <Box className="Box-form">
            <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                Mortgage Credit Simulator
            </Typography>
            <form onSubmit={calculateMonthlyPayment}>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Property Value"
                        type="number"
                        value={propertyValue}
                        onChange={(e) => setPropertyValue(handlePositiveValue(e.target.value))}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Loan Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(handlePositiveValue(e.target.value))}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Annual Interest Rate (%)"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(handlePositiveValue(e.target.value))}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Term (Years)"
                        type="number"
                        value={termYears}
                        onChange={(e) => setTermYears(handlePositiveValue(e.target.value))}
                        required
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Loan Type</InputLabel>
                    <Select value={loanType} onChange={(e) => setLoanType(e.target.value)} required>
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="1">First home loan</MenuItem>
                        <MenuItem value="2">Second home loan</MenuItem>
                        <MenuItem value="3">Commercial properties loan</MenuItem>
                        <MenuItem value="4">Remodeling loan</MenuItem>
                    </Select>
                </FormControl>
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
                    <Typography variant="h5" color="textSecondary">
                        Monthly Fee: ${monthlyPayment.toFixed(0)}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default Simulator;
