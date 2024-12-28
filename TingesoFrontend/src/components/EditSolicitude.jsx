import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Grid } from "@mui/material";
import loanSolicitudeService from "../services/loansolicitude.service";

const EditSolicitude = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [solicitudeData, setSolicitudeData] = useState({
    state: "",
    monthlyInstallments: "",
    idMortgageLoan: "",
    proofOfIncome: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolicitude = async () => {
      try {
        const data = await loanSolicitudeService.getLoanSolicitudeById(id);
        // Asegúrate de que los valores sean siempre válidos (no null ni undefined)
        setSolicitudeData({
          state: data.state || "", // Asegúrate de que no sea null o undefined
          monthlyInstallments: data.monthlyInstallments || "", 
          idMortgageLoan: data.idMortgageLoan || "", 
          proofOfIncome: data.proofOfIncome || null, // Esto se maneja como archivo
        });
      } catch (err) {
        console.error("Error al obtener la solicitud:", err);
        setError("No se pudo cargar la solicitud.");
      }
    };
    fetchSolicitude();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSolicitudeData((prev) => ({ ...prev, [name]: value || "" })); // Asegúrate de que los valores sean válidos
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSolicitudeData((prev) => ({ ...prev, proofOfIncome: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí implementas la actualización de la solicitud
      await updateLoanSolicitude(id, solicitudeData);
      navigate("/loan-solicitudes"); // Redirige a la lista de solicitudes
    } catch (err) {
      console.error("Error al actualizar la solicitud:", err);
      setError("No se pudo actualizar la solicitud.");
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <h1>Editar Solicitud</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Estado"
              name="state"
              value={solicitudeData.state}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Cuotas Mensuales"
              name="monthlyInstallments"
              value={solicitudeData.monthlyInstallments}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="ID Préstamo"
              name="idMortgageLoan"
              value={solicitudeData.idMortgageLoan}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Subir Comprobante de Ingresos
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Guardar Cambios
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditSolicitude;
