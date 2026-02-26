# Smart Clinic Management System – Schema Design

## Overview

The Smart Clinic Management System manages patients, doctors, appointments, and prescriptions using a hybrid database approach:

- **MySQL** → For structured, relational, operational data
- **MongoDB** → For flexible, document-based data

This design ensures:

- Data consistency for core operations
- Flexibility for evolving medical records
- Scalability and maintainability

---

# ## MySQL Database Design

MySQL is used for structured and interrelated data such as:

- Patients
- Doctors
- Admin
- Appointments
- Doctor Availability

Relational integrity is important for scheduling and user management.

---

## 1️⃣ Table: patients

- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(100), NOT NULL
- last_name: VARCHAR(100), NOT NULL
- email: VARCHAR(150), NOT NULL, UNIQUE
- phone: VARCHAR(15), NOT NULL
- password: VARCHAR(255), NOT NULL
- date_of_birth: DATE
- created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

### Design Notes:
- Email must be UNIQUE.
- Password will be encrypted in application layer.
- Patient appointment history will NOT be deleted even if patient is deactivated (soft delete recommended).

---

## 2️⃣ Table: doctors

- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(100), NOT NULL
- last_name: VARCHAR(100), NOT NULL
- specialization: VARCHAR(150), NOT NULL
- email: VARCHAR(150), NOT NULL, UNIQUE
- phone: VARCHAR(15)
- password: VARCHAR(255), NOT NULL
- status: VARCHAR(50) DEFAULT 'ACTIVE'
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

### Design Notes:
- A doctor cannot be permanently deleted if appointments exist.
- Use soft delete via `status`.

---

## 3️⃣ Table: admin

- id: INT, Primary Key, Auto Increment
- username: VARCHAR(100), NOT NULL, UNIQUE
- email: VARCHAR(150), NOT NULL, UNIQUE
- password: VARCHAR(255), NOT NULL
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

---

## 4️⃣ Table: appointments

- id: INT, Primary Key, Auto Increment
- doctor_id: INT, NOT NULL
- patient_id: INT, NOT NULL
- appointment_time: DATETIME, NOT NULL
- duration_minutes: INT DEFAULT 60
- status: VARCHAR(50) DEFAULT 'SCHEDULED'
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

### Foreign Keys:
- doctor_id → doctors(id)
- patient_id → patients(id)

### Constraints:
- Prevent overlapping appointments (handled via application logic).
- ON DELETE RESTRICT for doctors.
- ON DELETE CASCADE for patients (optional business decision).

### Design Notes:
- Status values: SCHEDULED, COMPLETED, CANCELLED
- Past appointment history should be retained for reporting.

---

## 5️⃣ Table: doctor_availability

- id: INT, Primary Key, Auto Increment
- doctor_id: INT, NOT NULL
- available_date: DATE, NOT NULL
- start_time: TIME, NOT NULL
- end_time: TIME, NOT NULL
- is_available: BOOLEAN DEFAULT TRUE

### Foreign Key:
- doctor_id → doctors(id)

### Design Notes:
- Helps manage time slots.
- Patients can only book when availability = TRUE.
- Prevent overlapping time ranges via validation logic.

---

# 🔗 Entity Relationships

- One Patient → Many Appointments
- One Doctor → Many Appointments
- One Doctor → Many Availability Slots
- One Appointment → One Prescription (stored in MongoDB)

---

# ## MongoDB Collection Design

MongoDB is used for flexible and evolving data such as:

- Prescriptions
- Doctor Notes
- Metadata
- Optional tags
- Nested medical details

This avoids rigid schema limitations of SQL.

---

## 📂 Collection: prescriptions

Each prescription is tied to a specific appointment.

### Example Document:

```json
{
  "_id": "ObjectId('65abc123789xyz')",
  "appointmentId": 102,
  "patientId": 15,
  "doctorId": 7,
  "createdAt": "2025-02-25T10:30:00Z",
  "medications": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "Twice a day",
      "durationDays": 5
    },
    {
      "name": "Amoxicillin",
      "dosage": "250mg",
      "frequency": "Three times a day",
      "durationDays": 7
    }
  ],
  "doctorNotes": "Patient should rest and stay hydrated.",
  "tags": ["fever", "infection"],
  "followUpRequired": true,
  "attachments": [
    {
      "fileName": "blood-test-report.pdf",
      "fileType": "pdf",
      "uploadedAt": "2025-02-25T10:35:00Z"
    }
  ]
}
