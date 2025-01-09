package tingeso.tingesoProyect.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tingeso.tingesoProyect.entities.LoanSolicitudeEntity;
import tingeso.tingesoProyect.entities.UserEntity;
import tingeso.tingesoProyect.repositories.LoanSolicitudeRepository;

import java.io.IOException;
import java.util.List;

@Service
public class LoanSolicitudeService {
    @Autowired
    LoanSolicitudeRepository loanSolicitudeRepository;

    public List<LoanSolicitudeEntity> getAllLoanSolicitudes() {
        return loanSolicitudeRepository.findAll();
    }

    public LoanSolicitudeEntity getSolicitudeById(Long id) {
        return loanSolicitudeRepository.findById(id).get();
    }

    public LoanSolicitudeEntity create(String rutUser, Long idMortgageLoan, int salary,
                                       int amount, float interestRate, int propertyValue, int termYears, int jobSeniority, int debtsAmount,
                                       MultipartFile proofOfIncome, MultipartFile appraisalCertificate,
                                       MultipartFile creditHistory, MultipartFile houseDeed,
                                       MultipartFile businessFinancialStatus, MultipartFile businessPlan,
                                       MultipartFile remodelBudget, MultipartFile dicomHistory,
                                       MultipartFile transactionHistory) throws IOException {
        LoanSolicitudeEntity solicitudeNew = new LoanSolicitudeEntity();
        solicitudeNew.setRutUser(rutUser);
        solicitudeNew.setIdMortgageLoan(idMortgageLoan);
        solicitudeNew.setSalary(salary);
        solicitudeNew.setAmount(amount);
        solicitudeNew.setInterestRate(interestRate);
        solicitudeNew.setPropertyValue(propertyValue);
        solicitudeNew.setTearmYears(termYears);
        solicitudeNew.setJobSeniority(jobSeniority);
        solicitudeNew.setDebtsAmount(debtsAmount);
        solicitudeNew.setState(1);

        float r = (interestRate / 100) / 12; // Monthly interest rate
        int n = termYears * 12;
        double monthlyInstallments = amount * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

        int monthlyInstallmentsInt = (int) Math.round(monthlyInstallments);
        solicitudeNew.setMonthlyInstallments(monthlyInstallmentsInt);


        if (proofOfIncome != null) {
            solicitudeNew.setProofOfIncome(proofOfIncome.getBytes());
        }
        if (appraisalCertificate != null) {
            solicitudeNew.setAppraisalCertificate(appraisalCertificate.getBytes());
        }
        if (creditHistory != null) {
            solicitudeNew.setCreditHistory(creditHistory.getBytes());
        }
        if (houseDeed != null) {
            solicitudeNew.setHouseDeed(houseDeed.getBytes());
        }
        if (businessFinancialStatus != null) {
            solicitudeNew.setBusinessFinancialStatus(businessFinancialStatus.getBytes());
        }
        if (businessPlan != null) {
            solicitudeNew.setBusinessPlan(businessPlan.getBytes());
        }
        if (remodelBudget != null) {
            solicitudeNew.setRemodelBudget(remodelBudget.getBytes());
        }

        if (dicomHistory != null) {
            solicitudeNew.setDicomHistory(dicomHistory.getBytes());
        }

        if (transactionHistory != null) {
            solicitudeNew.setTransactionHistory(transactionHistory.getBytes());
        }

        return loanSolicitudeRepository.save(solicitudeNew);
    }

    public List<LoanSolicitudeEntity> getLoanSolicitude(String rutUser) {
        return loanSolicitudeRepository.findByRutUser(rutUser);
    }

    public LoanSolicitudeEntity update(Long id, LoanSolicitudeEntity loanSolicitude) {
        return loanSolicitudeRepository.save(loanSolicitude);
    }
}
