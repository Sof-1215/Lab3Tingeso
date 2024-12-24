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

}
