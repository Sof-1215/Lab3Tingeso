package tingeso.tingesoProyect.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tingeso.tingesoProyect.entities.MortgageLoanEntity;
import tingeso.tingesoProyect.entities.UserEntity;
import tingeso.tingesoProyect.repositories.MortgageLoanRepository;

import java.util.ArrayList;

@Service
public class MortgageLoanService {
    @Autowired
    MortgageLoanRepository mortgageLoanRepository;

    public ArrayList<MortgageLoanEntity> getMortgageLoans(){
        return (ArrayList<MortgageLoanEntity>) mortgageLoanRepository.findAll();
    }

    public MortgageLoanEntity getMortgageLoanById(Long id){
        return mortgageLoanRepository.findById(id).get();
    }

    public int simulator(float amount, float interestRate, int termYears, float propertyValue, int loanType) {
        if (loanType == 0) {
            throw new IllegalArgumentException("loanType cannot be null");
        }

        float P = amount; // Loan amount
        float r = (interestRate / 100) / 12; // Monthly interest rate
        int n = termYears * 12; // Total number of payments in months
        float maxAmount;

        Long LoanType = (long) loanType;
        MortgageLoanEntity loan = getMortgageLoanById(LoanType);
        long loanId = LoanType;

        maxAmount = propertyValue * loan.getMaxAmount();
        if (termYears > loan.getMaxTerm() || r * 12 < loan.getMinInterestRate() || r * 12 > loan.getMaxInterestRate() || P > maxAmount) {
            throw new IllegalArgumentException("Invalid values.");
        }

        // Handle zero interest rate case
        if (r == 0) {
            return (int) P / n;
        }

        // Calculate monthly payment using the formula
        double M = P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
        return (int) M;
    }
}
