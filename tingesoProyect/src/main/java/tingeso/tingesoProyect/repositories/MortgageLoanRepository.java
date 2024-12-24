package tingeso.tingesoProyect.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.tingesoProyect.entities.MortgageLoanEntity;
import tingeso.tingesoProyect.entities.UserEntity;

@Repository
public interface MortgageLoanRepository extends JpaRepository<MortgageLoanEntity, Long> {
    MortgageLoanEntity findMortgageLoanByType(int type);
}
