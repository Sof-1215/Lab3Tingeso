package tingeso.tingesoProyect.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tingeso.tingesoProyect.entities.MortgageLoanEntity;
import tingeso.tingesoProyect.services.MortgageLoanService;

import java.util.List;

@RestController
@RequestMapping("api/v1/mortgageloan")
@CrossOrigin("*")
public class MortgageLoanController {
    @Autowired
    MortgageLoanService mortgageLoanService;

    @GetMapping("/")
    public ResponseEntity<List<MortgageLoanEntity>> listAllMortgageLoans() {
        List<MortgageLoanEntity> mortgageLoans = mortgageLoanService.getMortgageLoans();
        return ResponseEntity.ok(mortgageLoans);
    }
}
