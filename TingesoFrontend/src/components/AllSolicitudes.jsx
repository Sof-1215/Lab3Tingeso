import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHead, TableBody, TableCell, TableRow, Button, TableContainer, Paper, Pagination } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import loanSolicitudeService from "../services/loansolicitude.service";

const LoanSolicitudeList = () => {
  const [loanSolicitudes, setLoanSolicitudes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage] = useState(5); // Cantidad de solicitudes por página
  const navigate = useNavigate();

  // Mapeo de IDs a nombres de préstamos
  const loanNames = {
    1: "Préstamo Primera vivienda",
    2: "Préstamo Segunda vivienda",
    3: "Préstamo Propiedades comerciales",
    4: "Préstamo Remodelación",
  };

  const states = {
    1: "En revisión",
    2: "Aprobada",
    3: "Rechazada",
  }

  useEffect(() => {
    const fetchSolicitudes = async () => {
      setIsLoading(true);
      try {
        const rutUser = localStorage.getItem("user");
        if (!rutUser) {
          setError("RUT no encontrado. Por favor, inicia sesión nuevamente.");
          setIsLoading(false);
          return;
        }

        const data = await loanSolicitudeService.getAll();
        setLoanSolicitudes(data);
        setError(null);
      } catch (err) {
        console.error("Error al obtener las solicitudes:", err);
        setError("No se pudieron obtener las solicitudes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  // Cambiar la página actual
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calcular las solicitudes a mostrar
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSolicitudes = loanSolicitudes.slice(indexOfFirstItem, indexOfLastItem);

  const handleEvaluation = (id) => {
    navigate(`/evaluation-solicitude/${id}`);
  };

  return (
    <div>
      <h1>Solicitudes de Préstamo</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isLoading && <p>Cargando solicitudes...</p>}

      {currentSolicitudes.length > 0 && (
        <>
          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID Solicitud</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Cuotas Mensuales</TableCell>
                  <TableCell>Nombre del Préstamo</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentSolicitudes.map((solicitud) => (
                  <TableRow key={solicitud.id}>
                    <TableCell>{solicitud.id}</TableCell>
                    <TableCell>
                      {states[solicitud.state]}</TableCell>
                    <TableCell>{solicitud.monthlyInstallments}</TableCell>
                    <TableCell>
                      {loanNames[solicitud.idMortgageLoan] || "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleEvaluation(solicitud.id)}
                      >
                        Revisar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Componente de paginación */}
          <Pagination
            count={Math.ceil(loanSolicitudes.length / itemsPerPage)} // Total de páginas
            page={currentPage} // Página actual
            onChange={handlePageChange}
            style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
          />
        </>
      )}

      {loanSolicitudes.length === 0 && !error && !isLoading && <p>No hay solicitudes para mostrar.</p>}
    </div>
  );
};

export default LoanSolicitudeList;