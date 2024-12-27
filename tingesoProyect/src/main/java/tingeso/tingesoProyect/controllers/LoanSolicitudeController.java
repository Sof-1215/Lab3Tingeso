package tingeso.tingesoProyect.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tingeso.tingesoProyect.entities.LoanSolicitudeEntity;
import tingeso.tingesoProyect.services.LoanSolicitudeService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/loansolicitude")
@CrossOrigin("*")
public class LoanSolicitudeController {
    @Autowired
    LoanSolicitudeService loanSolicitudeService;

    @PostMapping("/store")
    public ResponseEntity<String> saveSolicitude (@RequestParam(value = "rutUser") String rutUser,
                                                  @RequestParam(value = "idMortgageLoan") Long idMortgageLoan,
                                                  @RequestParam(value = "proofOfIncome", required = false) MultipartFile proofOfIncome,
                                                  @RequestParam(value = "appraisalCertificate", required = false) MultipartFile appraisalCertificate,
                                                  @RequestParam(value = "creditHistory", required = false) MultipartFile creditHistory,
                                                  @RequestParam(value = "houseDeed", required = false) MultipartFile houseDeed,
                                                  @RequestParam(value = "businessFinancialStatus", required = false) MultipartFile businessFinancialStatus,
                                                  @RequestParam(value = "businessPlan", required = false) MultipartFile businessPlan,
                                                  @RequestParam(value = "remodelBudget", required = false) MultipartFile remodelBudget)
    throws IOException {
        loanSolicitudeService.create(rutUser, idMortgageLoan, proofOfIncome, appraisalCertificate, creditHistory,
                houseDeed, businessFinancialStatus, businessPlan, remodelBudget);
        return ResponseEntity.status(HttpStatus.OK).body("Uploaded files");
    }

    @PostMapping("/updatestate/{loanSolicitudeId}")
    public ResponseEntity<LoanSolicitudeEntity> updateState (@PathVariable long loanSolicitudeId, @RequestParam Integer state) {
        LoanSolicitudeEntity solicitude = loanSolicitudeService.getSolicitudeById(loanSolicitudeId);
        solicitude.setState(state);

        return ResponseEntity.ok(solicitude);
    }

    @GetMapping("/solicitude/{rutUser}")
    public ResponseEntity<List<LoanSolicitudeEntity>> getSolicitude (@PathVariable("rutUser") String rutUser) {
        List<LoanSolicitudeEntity> solicitude = loanSolicitudeService.getLoanSolicitude(rutUser);
        return ResponseEntity.ok(solicitude);
    }
}
