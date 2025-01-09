package tingeso.tingesoProyect.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/monthlypayment")
    public ResponseEntity<Integer> calculateMonthlyPayment(@RequestParam float amount,
                                                           @RequestParam float interestRate,
                                                           @RequestParam int termYears,
                                                           @RequestParam float propertyValue,
                                                           @RequestParam int loanType
    ) {
        Integer MonthlyPayment = mortgageLoanService.simulator(amount, interestRate, termYears, propertyValue, loanType);
        return ResponseEntity.ok(MonthlyPayment);
    }
}
