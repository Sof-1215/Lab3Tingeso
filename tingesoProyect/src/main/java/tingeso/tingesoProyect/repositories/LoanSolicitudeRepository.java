package tingeso.tingesoProyect.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tingeso.tingesoProyect.entities.LoanSolicitudeEntity;

import java.util.List;

@Repository
public interface LoanSolicitudeRepository extends JpaRepository<LoanSolicitudeEntity, Long> {
    @Query("SELECT lse FROM LoanSolicitudeEntity lse WHERE lse.rutUser = :user")
    List<LoanSolicitudeEntity> findByRutUser(@Param("user") String user);
}
