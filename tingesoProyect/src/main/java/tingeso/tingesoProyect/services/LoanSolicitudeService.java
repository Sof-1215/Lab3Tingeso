package tingeso.tingesoProyect.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tingeso.tingesoProyect.entities.LoanSolicitudeEntity;
import tingeso.tingesoProyect.entities.UserEntity;
import tingeso.tingesoProyect.repositories.LoanSolicitudeRepository;

import java.io.IOException;

@Service
public class LoanSolicitudeService {
    @Autowired
    LoanSolicitudeRepository loanSolicitudeRepository;

    public LoanSolicitudeEntity getSolicitudeById(Long id) {
        return loanSolicitudeRepository.findById(id).get();
    }

    public LoanSolicitudeEntity create(String rutUser, Long idMortgageLoan,
                                       MultipartFile proofOfIncome, MultipartFile appraisalCertificate,
                                       MultipartFile creditHistory, MultipartFile houseDeed,
                                       MultipartFile businessFinancialStatus, MultipartFile businessPlan,
                                       MultipartFile remodelBudget) throws IOException {
        LoanSolicitudeEntity solicitudeNew = new LoanSolicitudeEntity();
        solicitudeNew.setRutUser(rutUser);
        solicitudeNew.setIdMortgageLoan(idMortgageLoan);

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

        return loanSolicitudeRepository.save(solicitudeNew);
    }

}
