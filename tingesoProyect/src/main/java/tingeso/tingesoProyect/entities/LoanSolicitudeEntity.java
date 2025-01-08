package tingeso.tingesoProyect.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "loansolicitude")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoanSolicitudeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(name = "rutuser")
    private String rutUser;

    @Column(name = "idmortgageloan")
    private Long idMortgageLoan;

    @Column(name = "state")
    private Integer state;

    @Column(name = "monthlyinstallments")
    private Integer monthlyInstallments;

    @Column(name = "salary")
    private int salary;

    @Column(name = "amount")
    private int amount;

    @Column(name = "interestrate")
    private float interestRate;

    @Column(name = "propertyvalue")
    private int propertyValue;

    @Column(name = "termyears")
    private int tearmYears;

    //Required documents
    @Column(name = "proofofincome")
    private byte[] proofOfIncome;

    @Column(name = "appraisalcertificate")
    private byte[] appraisalCertificate;

    @Column(name = "credithistory")
    private byte[] creditHistory;

    @Column(name = "housedeed")
    private byte[] houseDeed;

    @Column(name = "businessfinancialstatus")
    private byte[] businessFinancialStatus;

    @Column(name = "businessplan")
    private byte[] businessPlan;

    @Column(name = "remodelbudget")
    private byte[] remodelBudget;

    @Column(name = "dicomhistory")
    private byte[] dicomHistory;

    @Column(name = "transactionhistory")
    private byte[] transactionHistory;
}
