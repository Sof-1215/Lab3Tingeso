package tingeso.tingesoProyect.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tingeso.tingesoProyect.entities.LoanSolicitudeEntity;
import tingeso.tingesoProyect.entities.UserEntity;
import tingeso.tingesoProyect.services.LoanSolicitudeService;
import tingeso.tingesoProyect.services.UserService;

import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/v1/loansolicitude")
@CrossOrigin("*")
public class LoanSolicitudeController {
    @Autowired
    LoanSolicitudeService loanSolicitudeService;

    @Autowired
    UserService userService;
    @GetMapping("/getall")
    public ResponseEntity<List<LoanSolicitudeEntity>> getAll() {
        List<LoanSolicitudeEntity> solicitudes = loanSolicitudeService.getAllLoanSolicitudes();
        return ResponseEntity.ok(solicitudes);
    }

    @GetMapping("/getsolicitude/{id}")
    public ResponseEntity<LoanSolicitudeEntity> getLoanSolicitudeById(@PathVariable Long id) {
        LoanSolicitudeEntity solicitude = loanSolicitudeService.getSolicitudeById(id);
        return ResponseEntity.ok(solicitude);
    }

    @PostMapping("/store")
    public ResponseEntity<String> saveSolicitude (@RequestParam(value = "rutUser") String rutUser,
                                                  @RequestParam(value = "idMortgageLoan") Long idMortgageLoan,
                                                  @RequestParam(value = "salary") int salary,
                                                  @RequestParam(value = "amount") int amount,
                                                  @RequestParam(value = "interestRate") float interestRate,
                                                  @RequestParam(value = "propertyValue") int propertyValue,
                                                  @RequestParam(value = "termYears") int termYears,
                                                  @RequestParam(value = "jobSeniority") int jobSeniority,
                                                  @RequestParam(value = "debtsAmount") int debtsAmount,
                                                  @RequestParam(value = "proofOfIncome", required = false) MultipartFile proofOfIncome,
                                                  @RequestParam(value = "appraisalCertificate", required = false) MultipartFile appraisalCertificate,
                                                  @RequestParam(value = "creditHistory", required = false) MultipartFile creditHistory,
                                                  @RequestParam(value = "houseDeed", required = false) MultipartFile houseDeed,
                                                  @RequestParam(value = "businessFinancialStatus", required = false) MultipartFile businessFinancialStatus,
                                                  @RequestParam(value = "businessPlan", required = false) MultipartFile businessPlan,
                                                  @RequestParam(value = "remodelBudget", required = false) MultipartFile remodelBudget,
                                                  @RequestParam(value = "dicomHistory", required = false) MultipartFile dicomHistory,
                                                  @RequestParam(value = "transactionHistory", required = false) MultipartFile transactionHistory)
    throws IOException {
        loanSolicitudeService.create(rutUser, idMortgageLoan, salary, amount, interestRate, propertyValue,
                termYears, jobSeniority, debtsAmount, proofOfIncome, appraisalCertificate, creditHistory,
                houseDeed, businessFinancialStatus, businessPlan, remodelBudget, dicomHistory, transactionHistory);
        return ResponseEntity.status(HttpStatus.OK).body("Archivos subidos");
    }

    @PostMapping("/updatestate/{loanSolicitudeId}")
    public ResponseEntity<LoanSolicitudeEntity> updateState (@PathVariable long loanSolicitudeId, @RequestParam Integer state) {
        LoanSolicitudeEntity solicitude = loanSolicitudeService.getSolicitudeById(loanSolicitudeId);
        solicitude.setState(state);

        return ResponseEntity.ok(solicitude);
    }

    @GetMapping("/solicitude/{rutUser}")
    public ResponseEntity<List<LoanSolicitudeEntity>> getSolicitudes (@PathVariable("rutUser") String rutUser) {
        List<LoanSolicitudeEntity> solicitude = loanSolicitudeService.getLoanSolicitude(rutUser);
        return ResponseEntity.ok(solicitude);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<LoanSolicitudeEntity> updateSolicitude (@PathVariable Long id, @RequestBody LoanSolicitudeEntity solicitude) {
        LoanSolicitudeEntity newSolicitude = loanSolicitudeService.update(id, solicitude);
        return ResponseEntity.ok(newSolicitude);
    }

    @CrossOrigin(origins = "http://localhost:5174")
    @PostMapping("/evaluation/{idMortgageLoan}")
    public ResponseEntity<String> Evaluation(@PathVariable Long idMortgageLoan) {
        // Obtiene la solicitud de préstamo por ID
        LoanSolicitudeEntity solicitude = loanSolicitudeService.getSolicitudeById(idMortgageLoan);

        int jobSeniority = solicitude.getJobSeniority();
        int debts = solicitude.getDebtsAmount();

        // Calcula el porcentaje de cuota sobre el ingreso
        float cuotaIngreso = ((float) solicitude.getMonthlyInstallments() / solicitude.getSalary()) * 100;

        // Calcula la relación deuda/ingreso
        float deudaIngreso = ((float) debts / solicitude.getMonthlyInstallments()) * 100;

        // Obtiene el rut del usuario asociado
        String rutUser = solicitude.getRutUser();
        UserEntity user = userService.getUserByRut(rutUser);

        // Obtiene la fecha de nacimiento del usuario
        Date birthdate = user.getBirthdate();

        // Calcula la edad directamente aquí
        int age = 0;
        if (birthdate != null) {
            LocalDate birthDateLocal = birthdate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate today = LocalDate.now();
            age = Period.between(birthDateLocal, today).getYears();
        } else {
            return ResponseEntity.badRequest().body("Error: La fecha de nacimiento no está disponible.");
        }

        // Imprime o utiliza los resultados como sea necesario
        System.out.println("Cuota sobre ingreso: " + cuotaIngreso + "%");
        System.out.println("Deuda sobre ingreso: " + deudaIngreso + "%");
        System.out.println("Edad del usuario: " + age);
        System.out.println("Antigüedad laboral: " + jobSeniority);
        System.out.println("Deudas: " + debts);

        // Devuelve una respuesta adecuada
        String responseMessage = String.format("Evaluación completada:\nCuota ingreso = %.2f%%\nDeuda ingreso = %.2f%%\nEdad = %d\nAntigüedad laboral = %d años\nDeudas = %d",
                cuotaIngreso, deudaIngreso, age, jobSeniority, debts);

        return ResponseEntity.ok(responseMessage);
    }
}
