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
## Admin User Stories

---

## User Story 1: Admin Login

**Title:**  
_As an Admin, I want to log into the portal using my username and password, so that I can securely manage the platform._

**Acceptance Criteria:**
1. Admin must provide valid username and password.
2. System must authenticate credentials against the database.
3. Admin dashboard must be displayed upon successful login.
4. Error message must be shown for invalid credentials.

**Priority:** High  
**Story Points:** 3  

**Notes:**
- Passwords must be encrypted in the database.
- Session management should be implemented.

---

## User Story 2: Admin Logout

**Title:**  
_As an Admin, I want to log out of the portal, so that I can protect system access._

**Acceptance Criteria:**
1. Logout button must be visible on the dashboard.
2. Admin session must be invalidated upon logout.
3. Admin must be redirected to the login page.
4. Back button should not allow access to secured pages after logout.

**Priority:** High  
**Story Points:** 2  

**Notes:**
- Ensure session/token is properly cleared.
- Prevent unauthorized access after logout.

---

## User Story 3: Add Doctor Profile

**Title:**  
_As an Admin, I want to add doctors to the portal, so that patients can book appointments with them._

**Acceptance Criteria:**
1. Admin must be logged in.
2. Required doctor details (name, specialization, contact info) must be validated.
3. Doctor information must be stored in the MySQL database.
4. Success confirmation message must be displayed.

**Priority:** High  
**Story Points:** 5  

**Notes:**
- Email address must be unique.
- Default role should be assigned as "DOCTOR".

---

## User Story 4: Delete Doctor Profile

**Title:**  
_As an Admin, I want to delete a doctor's profile from the portal, so that inactive or unavailable doctors are removed from the system._

**Acceptance Criteria:**
1. Admin must be logged in.
2. System must confirm deletion before proceeding.
3. Doctor record must be removed or marked inactive in MySQL.
4. Deleted doctor must no longer appear in search or booking lists.

**Priority:** Medium  
**Story Points:** 5  

**Notes:**
- Consider soft delete instead of permanent delete.
- Check for existing appointments before deletion.

---

## User Story 5: Run Stored Procedure for Appointment Statistics

**Title:**  
_As an Admin, I want to run a stored procedure in MySQL CLI to retrieve the number of appointments per month, so that I can track usage statistics._

**Acceptance Criteria:**
1. Stored procedure must return appointment count grouped by month.
2. Procedure must execute successfully from MySQL CLI.
3. Results must accurately reflect data in the appointments table.
4. Output must be readable and properly formatted.

**Priority:** Medium  
**Story Points:** 8  

**Notes:**
- Stored procedure should use GROUP BY month and year.
- Ensure proper indexing for performance.
- This is a database-level task (outside the Spring Boot application).


## Patient User Stories

---

## User Story 1: View Doctors Without Login

**Title:**  
_As a Patient, I want to view a list of doctors without logging in, so that I can explore options before registering._

**Acceptance Criteria:**
1. Doctor list must be accessible without authentication.
2. Doctor information must include name, specialization, and availability.
3. Sensitive information must not be displayed.
4. Page must load successfully for guest users.

**Priority:** High  
**Story Points:** 3  

**Notes:**
- Public endpoint required.
- Do not expose contact or internal data.

---

## User Story 2: Patient Sign Up

**Title:**  
_As a Patient, I want to sign up using my email and password, so that I can book appointments._

**Acceptance Criteria:**
1. Registration form must validate required fields.
2. Email address must be unique.
3. Password must be securely stored (encrypted).
4. Patient data must be stored in the MySQL database.
5. Confirmation message must be displayed after successful registration.

**Priority:** High  
**Story Points:** 5  

**Notes:**
- Consider email format validation.
- Assign default role as "PATIENT".

---

## User Story 3: Patient Login

**Title:**  
_As a Patient, I want to log into the portal, so that I can manage my bookings._

**Acceptance Criteria:**
1. Patient must provide valid email and password.
2. Credentials must be verified against the database.
3. Patient dashboard must be displayed upon successful login.
4. Error message must be displayed for invalid credentials.

**Priority:** High  
**Story Points:** 3  

**Notes:**
- Authentication mechanism must be secure.
- Session management required.

---

## User Story 4: Patient Logout

**Title:**  
_As a Patient, I want to log out of the portal, so that I can secure my account._

**Acceptance Criteria:**
1. Logout option must be available on the dashboard.
2. User session must be invalidated after logout.
3. Patient must be redirected to the login or home page.
4. Secured pages must not be accessible after logout.

**Priority:** High  
**Story Points:** 2  

**Notes:**
- Prevent back-button access after logout.
- Clear authentication token/session.

---

## User Story 5: Book One-Hour Appointment

**Title:**  
_As a Patient, I want to log in and book a one-hour appointment with a doctor, so that I can consult for medical advice._

**Acceptance Criteria:**
1. Patient must be logged in.
2. Only available time slots must be selectable.
3. Appointment duration must be one hour.
4. Appointment must not conflict with existing bookings.
5. Appointment must be stored in the MySQL database.
6. Confirmation message must be displayed.

**Priority:** High  
**Story Points:** 8  

**Notes:**
- Prevent double booking.
- Automatically block selected time slot after booking.

---

## User Story 6: View Upcoming Appointments

**Title:**  
_As a Patient, I want to view my upcoming appointments, so that I can prepare accordingly._

**Acceptance Criteria:**
1. Patient must be logged in.
2. Only future appointments must be displayed.
3. Appointment details must include date, time, and doctor name.
4. Appointments must be sorted by nearest date first.

**Priority:** Medium  
**Story Points:** 5  

**Notes:**
- Data must be filtered using patient ID.
- Past appointments should not appear in upcoming list.

## Doctor User Stories

---

## User Story 1: Doctor Login

**Title:**  
_As a Doctor, I want to log into the portal, so that I can manage my appointments._

**Acceptance Criteria:**
1. Doctor must provide valid email/username and password.
2. Credentials must be authenticated against the database.
3. Doctor dashboard must be displayed upon successful login.
4. Error message must be shown for invalid credentials.

**Priority:** High  
**Story Points:** 3  

**Notes:**
- Password must be encrypted in the database.
- Secure session handling must be implemented.

---

## User Story 2: Doctor Logout

**Title:**  
_As a Doctor, I want to log out of the portal, so that I can protect my data._

**Acceptance Criteria:**
1. Logout option must be visible on the dashboard.
2. Doctor session must be invalidated after logout.
3. Doctor must be redirected to the login page.
4. Secured pages must not be accessible after logout.

**Priority:** High  
**Story Points:** 2  

**Notes:**
- Prevent access using browser back button.
- Clear session/token after logout.

---

## User Story 3: View Appointment Calendar

**Title:**  
_As a Doctor, I want to view my appointment calendar, so that I can stay organized._

**Acceptance Criteria:**
1. Doctor must be logged in.
2. Calendar must display appointments by date and time.
3. Appointments must include patient name and time slot.
4. Appointments must be sorted chronologically.

**Priority:** High  
**Story Points:** 5  

**Notes:**
- Calendar view can be daily/weekly format.
- Data must be filtered using doctor ID.

---

## User Story 4: Mark Unavailability

**Title:**  
_As a Doctor, I want to mark my unavailability, so that patients can see only available slots._

**Acceptance Criteria:**
1. Doctor must be logged in.
2. Doctor must be able to select date and time to mark unavailable.
3. Unavailable slots must not appear in patient booking options.
4. Changes must be stored in the MySQL database.

**Priority:** High  
**Story Points:** 5  

**Notes:**
- Prevent marking past dates as unavailable.
- Ensure no conflict with existing appointments.

---

## User Story 5: Update Profile Information

**Title:**  
_As a Doctor, I want to update my specialization and contact information, so that patients have up-to-date information._

**Acceptance Criteria:**
1. Doctor must be logged in.
2. Editable fields must include specialization and contact information.
3. Updated data must be validated.
4. Changes must be saved in the MySQL database.
5. Updated information must reflect in the public doctor listing.

**Priority:** Medium  
**Story Points:** 5  

**Notes:**
- Email must remain unique.
- Audit logging is recommended.

---

## User Story 6: View Patient Details for Upcoming Appointments

**Title:**  
_As a Doctor, I want to view patient details for upcoming appointments, so that I can be prepared._

**Acceptance Criteria:**
1. Doctor must be logged in.
2. Only patients assigned to the doctor must be visible.
3. Patient details must include name and appointment time.
4. Access must be restricted to the authorized doctor only.

**Priority:** High  
**Story Points:** 8  

**Notes:**
- Ensure patient privacy compliance.
- Data must be filtered using doctor ID.
