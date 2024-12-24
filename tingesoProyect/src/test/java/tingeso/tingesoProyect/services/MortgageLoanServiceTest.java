package tingeso.tingesoProyect.services;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import tingeso.tingesoProyect.entities.MortgageLoanEntity;
import tingeso.tingesoProyect.repositories.MortgageLoanRepository;

import java.util.ArrayList;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@WebMvcTest(MortgageLoanService.class)
public class MortgageLoanServiceTest {
    @Autowired
    MortgageLoanService mortgageLoanService;

    @MockBean
    MortgageLoanRepository mortgageLoanRepository;

    @Test
    void whenGetMortgageLoans_thenCorrect() {
        //Given
        MortgageLoanEntity mortgageLoan = new MortgageLoanEntity();
        mortgageLoan.setMaxAmount(0.75F);
        mortgageLoan.setMinInterestRate(0.03F);
        mortgageLoan.setMaxInterestRate(0.05F);
        mortgageLoan.setMaxTerm(25);
        mortgageLoan.setType(5);

        ArrayList<MortgageLoanEntity> mortgageLoans = new ArrayList<>();
        mortgageLoans.add(mortgageLoan);

        //When
        when(mortgageLoanRepository.findAll()).thenReturn(mortgageLoans);

        //Then
        ArrayList<MortgageLoanEntity> result = mortgageLoanService.getMortgageLoans();
        assertNotNull(result);
        assertThat(result.size()).isEqualTo(1);
        assertThat(result.get(0).getMaxAmount()).isEqualTo(0.75F);
        assertThat(result.get(0).getMinInterestRate()).isEqualTo(0.03F);
        assertThat(result.get(0).getMaxInterestRate()).isEqualTo(0.05F);
        assertThat(result.get(0).getMaxTerm()).isEqualTo(25);
        assertThat(result.get(0).getType()).isEqualTo(5);
    }

    @Test
    void whenGetMortgageLoanById_thenCorrect() {
        //Given
        MortgageLoanEntity mortgageLoan = new MortgageLoanEntity();
        mortgageLoan.setId(5L);
        mortgageLoan.setMaxAmount(0.75F);
        mortgageLoan.setMinInterestRate(0.03F);
        mortgageLoan.setMaxInterestRate(0.05F);
        mortgageLoan.setMaxTerm(25);
        mortgageLoan.setType(5);

        //When
        when(mortgageLoanService.mortgageLoanRepository.findById(5L)).thenReturn(Optional.of(mortgageLoan));

        //Then
        MortgageLoanEntity result = mortgageLoanService.getMortgageLoanById(5L);
        assertNotNull(result);
        assertThat(result.getId()).isEqualTo(5L);
        assertThat(result.getMaxAmount()).isEqualTo(0.75F);
        assertThat(result.getMinInterestRate()).isEqualTo(0.03F);
        assertThat(result.getMaxInterestRate()).isEqualTo(0.05F);
        assertThat(result.getMaxTerm()).isEqualTo(25);
        assertThat(result.getType()).isEqualTo(5);
    }
}
