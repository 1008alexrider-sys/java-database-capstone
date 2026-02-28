package com.project.back_end.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "insurance")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Insurance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Patient is required")
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @NotNull(message = "Insurance company is required")
    @Size(min = 3, max = 100, message = "Insurance company name must be between 3 and 100 characters")
    @Column(nullable = false)
    private String insuranceCompany;

    @NotNull(message = "Policy number is required")
    @Size(min = 5, max = 50, message = "Policy number must be between 5 and 50 characters")
    @Column(nullable = false, unique = true)
    private String policyNumber;

    @Size(max = 50, message = "Group number cannot exceed 50 characters")
    @Column
    private String groupNumber;

    @NotNull(message = "Plan type is required")
    @Size(min = 2, max = 50, message = "Plan type must be between 2 and 50 characters")
    @Column(nullable = false)
    private String planType;

    @NotNull(message = "Copay amount is required")
    @Min(value = 0, message = "Copay cannot be negative")
    @Column(nullable = false)
    private Double copay;

    @NotNull(message = "Deductible amount is required")
    @Min(value = 0, message = "Deductible cannot be negative")
    @Column(nullable = false)
    private Double deductible;

    @NotNull(message = "Maximum out-of-pocket is required")
    @Min(value = 0, message = "Maximum out-of-pocket cannot be negative")
    @Column(nullable = false)
    private Double maxOutOfPocket;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean activeStatus = true;


    public Insurance(Patient patient, String insuranceCompany, String policyNumber, String groupNumber, String planType, Double copay, Double deductible, Double maxOutOfPocket, boolean activeStatus) {
        this.patient = patient;
        this.insuranceCompany = insuranceCompany;
        this.policyNumber = policyNumber;
        this.groupNumber = groupNumber;
        this.planType = planType;
        this.copay = copay;
        this.deductible = deductible;
        this.maxOutOfPocket = maxOutOfPocket;
        this.activeStatus = activeStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getInsuranceCompany() {
        return insuranceCompany;
    }

    public void setInsuranceCompany(String insuranceCompany) {
        this.insuranceCompany = insuranceCompany;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }

    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }

    public String getGroupNumber() {
        return groupNumber;
    }

    public void setGroupNumber(String groupNumber) {
        this.groupNumber = groupNumber;
    }

    public String getPlanType() {
        return planType;
    }

    public void setPlanType(String planType) {
        this.planType = planType;
    }

    public Double getCopay() {
        return copay;
    }

    public void setCopay(Double copay) {
        this.copay = copay;
    }

    public Double getDeductible() {
        return deductible;
    }

    public void setDeductible(Double deductible) {
        this.deductible = deductible;
    }

    public Double getMaxOutOfPocket() {
        return maxOutOfPocket;
    }

    public void setMaxOutOfPocket(Double maxOutOfPocket) {
        this.maxOutOfPocket = maxOutOfPocket;
    }

    public boolean isActiveStatus() {
        return activeStatus;
    }

    public void setActiveStatus(boolean activeStatus) {
        this.activeStatus = activeStatus;
    }
}
