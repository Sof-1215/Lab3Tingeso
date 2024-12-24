package tingeso.tingesoProyect.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.tingesoProyect.entities.LoanSolicitudeEntity;

@Repository
public interface LoanSolicitudeRepository extends JpaRepository<LoanSolicitudeEntity, Long> {
}
