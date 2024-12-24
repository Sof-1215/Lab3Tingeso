package tingeso.tingesoProyect.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import tingeso.tingesoProyect.entities.UserEntity;
import tingeso.tingesoProyect.repositories.UserRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@WebMvcTest(UserService.class)
public class UserServiceTest {
    @Autowired
    UserService userService;

    @MockBean
    UserRepository userRepository;

    @Test
    void whenGetUsers_thenCorrect() throws ParseException {
        //Given
        UserEntity user = new UserEntity();
        user.setRut("21436587-0");
        user.setName("Marcela");
        user.setEmail("marcela@gmail.com");
        user.setSalary(700000);
        user.setBirthdate(new SimpleDateFormat("yyyy-MM-dd").parse("990-01-01"));

        ArrayList<UserEntity> usersList = new ArrayList<>();
        usersList.add(user);

        //When
        when(userRepository.findAll()).thenReturn(usersList);

        //Then
        ArrayList<UserEntity> result = userService.getUsers();
        assertNotNull(result);
        assertThat(result.size()).isEqualTo(1);
        assertThat(result.get(0).getRut()).isEqualTo("21436587-0");
        assertThat(result.get(0).getName()).isEqualTo("Marcela");
        assertThat(result.get(0).getEmail()).isEqualTo("marcela@gmail.com");
        assertThat(result.get(0).getSalary()).isEqualTo(700000);
        assertThat(result.get(0).getBirthdate()).isEqualTo("990-01-01");
    }

    @Test
    void whenSaveUser_thenCorrect() throws ParseException {
        //Given
        UserEntity user = new UserEntity();
        user.setRut("21436587-0");
        user.setName("Marcela");
        user.setEmail("marcela@gmail.com");
        user.setSalary(700000);
        user.setBirthdate(new SimpleDateFormat("yyyy-MM-dd").parse("990-01-01"));

        //When
        when(userRepository.save(user)).thenReturn(user);

        //Then
        UserEntity result = userService.saveUser(user);
        assertNotNull(result);
        assertThat(result.getRut()).isEqualTo("21436587-0");
        assertThat(result.getName()).isEqualTo("Marcela");
        assertThat(result.getEmail()).isEqualTo("marcela@gmail.com");
        assertThat(result.getSalary()).isEqualTo(700000);
        assertThat(result.getBirthdate()).isEqualTo(new SimpleDateFormat("yyyy-MM-dd").parse("990-01-01"));
    }

    @Test
    void whenGetUserById_thenCorrect() throws ParseException {
        //Given
        UserEntity user = new UserEntity();
        user.setId(200L);
        user.setRut("21436587-0");
        user.setName("Marcela");
        user.setEmail("marcela@gmail.com");
        user.setSalary(700000);
        user.setBirthdate(new SimpleDateFormat("yyyy-MM-dd").parse("990-01-01"));

        //When
        when(userRepository.findById(200L)).thenReturn(Optional.of(user));

        //Then
        UserEntity result = userService.getUserById(200L);
        assertNotNull(result);
        assertThat(result.getRut()).isEqualTo("21436587-0");
        assertThat(result.getName()).isEqualTo("Marcela");
        assertThat(result.getEmail()).isEqualTo("marcela@gmail.com");
        assertThat(result.getSalary()).isEqualTo(700000);
        assertThat(result.getBirthdate()).isEqualTo(new SimpleDateFormat("yyyy-MM-dd").parse("990-01-01"));
    }

    @Test
    void whenGetUserByRut_thenCorrect() throws ParseException {
        //Given
        UserEntity user = new UserEntity();
        user.setRut("21436587-0");
        user.setName("Marcela");
        user.setEmail("marcela@gmail.com");
        user.setSalary(700000);
        user.setBirthdate(new SimpleDateFormat("yyyy-MM-dd").parse("990-01-01"));

        //When
        when(userRepository.findByRut("21436587-0")).thenReturn(user);

        //Then
        UserEntity result = userService.getUserByRut("21436587-0");
        assertNotNull(result);
        assertThat(result.getRut()).isEqualTo("21436587-0");
    }

    @Test
    void whenUpdateUser_thenCorrect() throws ParseException {
        //Given
        UserEntity user = new UserEntity();
        user.setRut("21436587-0");
        user.setName("Marcela");
        user.setEmail("marcela@gmail.com");
        user.setSalary(700000);
        user.setBirthdate(new SimpleDateFormat("yyyy-MM-dd").parse("990-01-01"));

        //When
        when(userRepository.save(user)).thenReturn(user);

        //Then
        UserEntity result = userService.updateUser(user);
        assertNotNull(result);
        assertThat(result.getRut()).isEqualTo("21436587-0");
        assertThat(result.getName()).isEqualTo("Marcela");
        assertThat(result.getEmail()).isEqualTo("marcela@gmail.com");
        assertThat(result.getSalary()).isEqualTo(700000);
        assertThat(result.getBirthdate()).isEqualTo(new SimpleDateFormat("yyyy-MM-dd").parse("990-01-01"));
    }

    @Test
    void whenDeleteUser_thenCorrect() throws ParseException {
        // Given
        Long userId = 200L;
        UserEntity user = new UserEntity();
        user.setId(userId);
        user.setRut("21436587-0");
        user.setName("Marcela");
        user.setEmail("marcela@gmail.com");
        user.setSalary(700000);
        user.setBirthdate(new SimpleDateFormat("yyyy-MM-dd").parse("1990-01-01"));

        // When
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        doNothing().when(userRepository).deleteById(userId);

        // Then
        Assertions.assertDoesNotThrow(() -> {
            userService.deleteUser(userId);
        });
    }

    @Test
    public void whenDeleteUserException_thenCorrect() {
        // Arrange: simula que userRepository lanzará una excepción cuando deleteById se llame con cualquier ID
        Long userId = 1L;
        doThrow(new RuntimeException("Database error")).when(userRepository).deleteById(userId);

        // Act & Assert: verifica que deleteUser lanza una excepción cuando ocurre un error en el repositorio
        Exception exception = assertThrows(Exception.class, () -> userService.deleteUser(userId));

        // Verifica que el mensaje de la excepción sea el esperado
        Assertions.assertEquals("Database error", exception.getMessage());
    }

}
