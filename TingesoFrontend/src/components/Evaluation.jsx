import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Grid } from "@mui/material";
import loanSolicitudeService from "../services/loansolicitude.service";
import axios from "axios";

// Función para limpiar base64
const cleanBase64 = (base64Data) => {
  return base64Data.replace(/^data:application\/pdf;base64,/, "");
};

// Función para verificar si una cadena es base64 válida
const isBase64 = (str) => {
  const regex = /^[A-Za-z0-9+/=]*$/;
  return regex.test(str);
};

// Función para descargar el archivo
const downloadFile = (base64Data, fileName) => {
  if (!isBase64(base64Data)) {
    alert("El archivo no está en formato base64 válido.");
    return;
  }

  const cleanedBase64Data = cleanBase64(base64Data);
  const binaryData = Uint8Array.from(atob(cleanedBase64Data), (c) => c.charCodeAt(0));
  const blob = new Blob([binaryData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};

const EditSolicitude = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [solicitudeData, setSolicitudeData] = useState({
    state: "",
    monthlyInstallments: "",
    idMortgageLoan: "",
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolicitude = async () => {
      try {
        const data = await loanSolicitudeService.getLoanSolicitudeById(id);
        setSolicitudeData({
          state: data.state || "",
          id: data.id || "",
          monthlyInstallments: data.monthlyInstallments || "",
          idMortgageLoan: data.idMortgageLoan || "",
          proofOfIncome: data.proofOfIncome || null,
          appraisalCertificate: data.appraisalCertificate || null,
          creditHistory: data.creditHistory || null,
          houseDeed: data.houseDeed || null,
          businessFinancialStatus: data.businessFinancialStatus || null,
          businessPlan: data.businessPlan || null,
          remodelBudget: data.remodelBudget || null,
          dicomHistory: data.dicomHistory || null,
          transactionHistory: data.transactionHistory || null,
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
    setSolicitudeData((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleDownload = (fileData, fileName) => {
    if (!fileData) {
      alert("El archivo no está disponible para descargar.");
      return;
    }
    downloadFile(fileData, fileName);
  };

  const handleEvaluate = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8090/api/v1/loansolicitude/evaluation/${solicitudeData.id}`
      );
      alert(response.data); // Muestra el mensaje de la evaluación
    } catch (error) {
      console.error("Error al evaluar la solicitud:", error);
      alert("Hubo un error al realizar la evaluación.");
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <h1>Evaluar Solicitud</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
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
            {solicitudeData.dicomHistory && (
              <Button
                variant="contained"
                sx={{ backgroundColor: "#2d53ff" }}
                onClick={() => handleDownload(solicitudeData.dicomHistory, "dicomHistory.pdf")}
              >
                Descargar Historial crediticio
              </Button>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              type="button"
              variant="contained"
              sx={{ backgroundColor: "#2d53ff" }}
              onClick={handleEvaluate}
            >
              Evaluar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditSolicitude;

