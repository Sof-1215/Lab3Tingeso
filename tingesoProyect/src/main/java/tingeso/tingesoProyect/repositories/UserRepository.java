package tingeso.tingesoProyect.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tingeso.tingesoProyect.entities.UserEntity;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity  findByRut(String rut);
    UserEntity findByName(String name);
    UserEntity findByEmail(String email);

}
