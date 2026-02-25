# User Story Template

**Title:**
_As a [user role], I want [feature/goal], so that [reason]._

**Acceptance Criteria:**
1. [Criteria 1]
2. [Criteria 2]
3. [Criteria 3]

**Priority:** [High/Medium/Low]
**Story Points:** [Estimated Effort in Points]
**Notes:**
- [Additional information or edge cases]



# Patient Appointment Portal – User Stories
### Prepared by: Satya Prakash Patel  
### Project: Smart Clinic Management System  

---

# 1. Overview

This document defines user stories for the Patient Appointment Portal system.  
The stories are categorized based on three primary roles:

- Admin
- Patient
- Doctor

Each story follows the Agile format:

As a <role>,  
I want to <action>,  
So that <benefit>.

These stories will guide backend API development, database implementation, and sprint planning.

---

# 2. Admin User Stories

## Epic: User & System Management

### US-ADMIN-01 – Create User Accounts
As an Admin,  
I want to create doctor and patient accounts,  
So that users can securely access the system.

**Acceptance Criteria:**
- Admin must be logged in.
- Required user details must be validated.
- Account must be stored in the MySQL database.
- Success confirmation must be displayed.

---

### US-ADMIN-02 – Update User Information
As an Admin,  
I want to update user details,  
So that the system maintains accurate information.

**Acceptance Criteria:**
- Admin must be able to edit profile fields.
- Updated data must be persisted in the database.
- Changes must be reflected immediately.

---

### US-ADMIN-03 – Deactivate User Accounts
As an Admin,  
I want to deactivate users,  
So that unauthorized access is prevented.

**Acceptance Criteria:**
- Deactivated users must not be able to log in.
- The system must log the deactivation event.

---

### US-ADMIN-04 – Monitor Appointments
As an Admin,  
I want to view all appointments,  
So that I can monitor clinic operations.

**Acceptance Criteria:**
- Admin dashboard must display the appointment list.
- Filters by date and doctor must be available.

---

# 3. Patient User Stories

## Epic: Appointment Management

### US-PAT-01 – Patient Registration
As a Patient,  
I want to register in the portal,  
So that I can book appointments.

**Acceptance Criteria:**
- Registration form must validate input fields.
- Patient data must be stored in the MySQL database.
- Confirmation message must be displayed.

---

### US-PAT-02 – Secure Login
As a Patient,  
I want to log in securely,  
So that my medical data remains protected.

**Acceptance Criteria:**
- Authentication must be required.
- Error message must be displayed for incorrect credentials.

---

### US-PAT-03 – View Doctor Availability
As a Patient,  
I want to view available doctors and time slots,  
So that I can choose a convenient appointment time.

**Acceptance Criteria:**
- Available slots must be displayed dynamically.
- Only free slots must be selectable.

---

### US-PAT-04 – Book Appointment
As a Patient,  
I want to book an appointment,  
So that I can consult a doctor.

**Acceptance Criteria:**
- Appointment must not conflict with existing bookings.
- Appointment must be stored in the MySQL database.
- Confirmation message must be displayed.

---

### US-PAT-05 – Cancel Appointment
As a Patient,  
I want to cancel my appointment,  
So that the slot becomes available for others.

**Acceptance Criteria:**
- Appointment status must be updated.
- The slot must become available again.

---

### US-PAT-06 – View Prescriptions
As a Patient,  
I want to view my prescriptions,  
So that I can access my medical records anytime.

**Acceptance Criteria:**
- Prescription data must be retrieved from MongoDB.
- Only the authorized patient must access their data.

---

# 4. Doctor User Stories

## Epic: Schedule & Prescription Management

### US-DOC-01 – Set Availability
As a Doctor,  
I want to define my available time slots,  
So that patients can book appointments accordingly.

**Acceptance Criteria:**
- Doctor must be able to add or edit time slots.
- Slots must be stored in the MySQL database.
- Only future dates must be allowed.

---

### US-DOC-02 – View Scheduled Appointments
As a Doctor,  
I want to view my appointments,  
So that I can prepare for consultations.

**Acceptance Criteria:**
- Dashboard must display the appointment list.
- Appointments must be sorted by date and time.

---

### US-DOC-03 – Create Prescription
As a Doctor,  
I want to create prescriptions for patients,  
So that treatment details are recorded.

**Acceptance Criteria:**
- Prescription must be stored in MongoDB.
- Prescription must be linked to the patient ID.
- Prescription must be retrievable by the authorized patient.

---

### US-DOC-04 – Update Prescription
As a Doctor,  
I want to update prescriptions if needed,  
So that patient treatment information remains accurate.

**Acceptance Criteria:**
- Only the assigned doctor must be able to modify the prescription.
- Changes must be saved in MongoDB.

---

# 5. Definition of Done (DoD)

A user story will be considered complete when:

- Code is implemented.
- Unit testing is completed.
- API endpoints are tested.
- Database integration is verified.
- Code is pushed to GitHub.
- Reviewed and approved by the team.

---

# 6. Sprint Planning Note

For Sprint 1, the recommended priority is:

1. User Authentication (Admin, Doctor, Patient)
2. Patient Registration
3. Doctor Availability Management
4. Appointment Booking
5. Appointment Viewing

Prescription management can be scheduled for Sprint 2.

---

# 7. Conclusion

These user stories define the functional backbone of the Patient Appointment Portal. They align with Agile methodology and will guide incremental development through sprints. The combination of MySQL (relational data) and MongoDB (prescription documents) ensures both structure and flexibility in system design.
