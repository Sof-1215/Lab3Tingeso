package tingeso.tingesoProyect.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.multipart.MultipartFile;
import tingeso.tingesoProyect.entities.LoanSolicitudeEntity;
import tingeso.tingesoProyect.repositories.LoanSolicitudeRepository;

import java.io.IOException;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@WebMvcTest(LoanSolicitudeService.class)
class LoanSolicitudeServiceTest {

    @MockBean
    private LoanSolicitudeRepository loanSolicitudeRepository;

    @InjectMocks
    private LoanSolicitudeService loanSolicitudeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void WhenCreate_thenCorrect() throws IOException {
        //Given
        String rutUser = "12345678-9";
        Long idMortgageLoan = 1L;

        MultipartFile proofOfIncome = mock(MultipartFile.class);
        MultipartFile appraisalCertificate = mock(MultipartFile.class);
        MultipartFile creditHistory = mock(MultipartFile.class);
        MultipartFile houseDeed = mock(MultipartFile.class);
        MultipartFile businessFinancialStatus = mock(MultipartFile.class);
        MultipartFile businessPlan = mock(MultipartFile.class);
        MultipartFile remodelBudget = mock(MultipartFile.class);

        byte[] dummyData = "Data".getBytes();
        when(proofOfIncome.getBytes()).thenReturn(dummyData);
        when(appraisalCertificate.getBytes()).thenReturn(dummyData);
        when(creditHistory.getBytes()).thenReturn(dummyData);
        when(houseDeed.getBytes()).thenReturn(dummyData);
        when(businessFinancialStatus.getBytes()).thenReturn(dummyData);
        when(businessPlan.getBytes()).thenReturn(dummyData);
        when(remodelBudget.getBytes()).thenReturn(dummyData);

        LoanSolicitudeEntity savedSolicitude = new LoanSolicitudeEntity();
        savedSolicitude.setRutUser(rutUser);
        savedSolicitude.setIdMortgageLoan(idMortgageLoan);
        savedSolicitude.setProofOfIncome(dummyData);
        savedSolicitude.setAppraisalCertificate(dummyData);
        savedSolicitude.setCreditHistory(dummyData);
        savedSolicitude.setHouseDeed(dummyData);
        savedSolicitude.setBusinessFinancialStatus(dummyData);
        savedSolicitude.setBusinessPlan(dummyData);
        savedSolicitude.setRemodelBudget(dummyData);

        //When
        when(loanSolicitudeRepository.save(any(LoanSolicitudeEntity.class))).thenReturn(savedSolicitude);

        // Assert: Verificación
        LoanSolicitudeEntity result = loanSolicitudeService.create(rutUser, idMortgageLoan,
                proofOfIncome, appraisalCertificate, creditHistory, houseDeed,
                businessFinancialStatus, businessPlan, remodelBudget);

        assertEquals(rutUser, result.getRutUser());
        assertEquals(idMortgageLoan, result.getIdMortgageLoan());
        assertEquals(dummyData, result.getProofOfIncome());
        assertEquals(dummyData, result.getAppraisalCertificate());
        assertEquals(dummyData, result.getCreditHistory());
        assertEquals(dummyData, result.getHouseDeed());
        assertEquals(dummyData, result.getBusinessFinancialStatus());
        assertEquals(dummyData, result.getBusinessPlan());
        assertEquals(dummyData, result.getRemodelBudget());
    }

    @Test
    void WhenCreateWithNullFiles_thenCorrect() throws IOException {
        // Arrange: Datos de prueba
        String rutUser = "12345678-9";
        Long idMortgageLoan = 1L;

        // En este caso, todos los archivos son nulos
        MultipartFile proofOfIncome = null;
        MultipartFile appraisalCertificate = null;
        MultipartFile creditHistory = null;
        MultipartFile houseDeed = null;
        MultipartFile businessFinancialStatus = null;
        MultipartFile businessPlan = null;
        MultipartFile remodelBudget = null;

        LoanSolicitudeEntity savedSolicitude = new LoanSolicitudeEntity();
        savedSolicitude.setRutUser(rutUser);
        savedSolicitude.setIdMortgageLoan(idMortgageLoan);
        // Los archivos deberían permanecer nulos en la entidad guardada
        savedSolicitude.setProofOfIncome(null);
        savedSolicitude.setAppraisalCertificate(null);
        savedSolicitude.setCreditHistory(null);
        savedSolicitude.setHouseDeed(null);
        savedSolicitude.setBusinessFinancialStatus(null);
        savedSolicitude.setBusinessPlan(null);
        savedSolicitude.setRemodelBudget(null);

        //When
        when(loanSolicitudeRepository.save(any(LoanSolicitudeEntity.class))).thenReturn(savedSolicitude);

        LoanSolicitudeEntity result = loanSolicitudeService.create(rutUser, idMortgageLoan,
                proofOfIncome, appraisalCertificate, creditHistory, houseDeed,
                businessFinancialStatus, businessPlan, remodelBudget);

        //Then
        assertEquals(rutUser, result.getRutUser());
        assertEquals(idMortgageLoan, result.getIdMortgageLoan());

        assertEquals(null, result.getProofOfIncome());
        assertEquals(null, result.getAppraisalCertificate());
        assertEquals(null, result.getCreditHistory());
        assertEquals(null, result.getHouseDeed());
        assertEquals(null, result.getBusinessFinancialStatus());
        assertEquals(null, result.getBusinessPlan());
        assertEquals(null, result.getRemodelBudget());

    }
}

