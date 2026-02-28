package com.project.back_end;

import com.project.back_end.repo.PrescriptionRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
@ComponentScan("com.project.back_end")
public class BackEndApplication {

	private final PrescriptionRepository prescriptionRepository;

	public BackEndApplication(PrescriptionRepository prescriptionRepository) {
		this.prescriptionRepository = prescriptionRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

	@GetMapping("/")
	public String index() {
		return "Welcome to the Prescription Management System API!";
	}

	@GetMapping("/health")
	public String healthCheck() {
		return "API is up and running!";
	}
}
