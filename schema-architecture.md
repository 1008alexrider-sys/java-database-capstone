# Smart Clinic Management System – Detailed Architecture Design

## 1. Overview

The Smart Clinic Management System follows a **three-tier layered architecture** implemented using Spring Boot. The system separates responsibilities into:

1. Presentation Layer
2. Application (Business Logic) Layer
3. Data Layer

The architecture supports both:

- MVC-based dashboards using Thymeleaf
- REST-based modules using JSON APIs
- Dual database integration (MySQL + MongoDB)

This design ensures scalability, maintainability, clean separation of concerns, and flexibility in handling structured and document-based data.

---

# 2. High-Level Architecture Layers

## 2.1 Presentation Layer

The Presentation Layer contains two major components:

### A. Dashboards (MVC-Based)

- AdminDashboard
- DoctorDashboard

These dashboards:
- Use Thymeleaf templates
- Interact with Thymeleaf Controllers
- Render server-side HTML views

Flow:
Dashboard → Thymeleaf Controller → Service Layer

---

### B. REST Modules (API-Based)

- Appointments
- PatientDashboard (API-based modules)

These modules:
- Use JSON-based REST APIs
- Interact with Spring Boot REST Controllers
- Return JSON responses

Flow:
Frontend/API Client → REST Controller → Service Layer

---

# 3. Application Layer (Spring Boot App)

The Application Layer is the core processing layer and contains:

## 3.1 Controllers

### 1. Thymeleaf Controllers
- Handle MVC web requests
- Return HTML views
- Used by Admin and Doctor dashboards

### 2. REST Controllers
- Annotated with `@RestController`
- Handle JSON-based API requests
- Used by REST modules (Appointments, Patient APIs)

Both controller types:

- Receive HTTP requests
- Validate input
- Call the Service Layer
- Return responses (HTML or JSON)

---

## 3.2 Service Layer

The Service Layer:

- Contains business logic
- Applies validations
- Coordinates database interactions
- Acts as a bridge between Controllers and Repositories

Responsibilities:
- Process patient registrations
- Handle appointment scheduling
- Manage doctor/admin operations
- Control prescription storage logic

Flow:
Controller → Service → Repository

---

# 4. Data Layer

The system integrates two different databases:

1. MySQL (Relational Database)
2. MongoDB (Document Database)

---

# 4.1 MySQL Integration (Using JPA)

## A. MySQL Repositories

- Use Spring Data JPA
- Extend `JpaRepository`
- Perform CRUD operations

## B. MySQL Models (JPA Entities)

Entities:

- Patient
- Doctor
- Appointment
- Admin

Each model:
- Is annotated with `@Entity`
- Maps to a MySQL table
- Uses JPA for ORM (Object Relational Mapping)

## C. MySQL Database

Flow:

Service Layer  
→ MySQL Repository  
→ MySQL Database  
→ MySQL Models (Entities)

Purpose:
- Store structured clinical data
- Maintain relational integrity
- Manage appointments and user roles

---

# 4.2 MongoDB Integration (Using Spring Data MongoDB)

## A. MongoDB Repository

- Uses Spring Data MongoDB
- Extends `MongoRepository`
- Handles document-based operations

## B. MongoDB Models

Model:

- Prescription

This model:
- Is stored as a document
- Does not use relational schema
- Supports flexible structure

## C. MongoDB Database

Flow:

Service Layer  
→ MongoDB Repository  
→ MongoDB Database  
→ MongoDB Model (Document)

Purpose:
- Store prescription data
- Support flexible and evolving document structure
- Allow easy storage of nested medical details

---

# 5. Complete Request-Response Flow (Step-by-Step)

## 5.1 MVC Dashboard Flow (Admin/Doctor)

1. User accesses Admin or Doctor dashboard.
2. Browser sends HTTP request.
3. Request hits Thymeleaf Controller.
4. Controller calls Service Layer.
5. Service applies business logic.
6. Service calls MySQL Repository.
7. Repository interacts with MySQL Database.
8. Database returns entity data.
9. Service processes results.
10. Controller returns HTML view.
11. Dashboard displays rendered page.

---

## 5.2 REST API Flow (Appointments / Patient API)

1. Client sends HTTP request (GET/POST/PUT/DELETE).
2. Request hits REST Controller.
3. REST Controller validates input.
4. Controller calls Service Layer.
5. Service applies business rules.
6. Service calls:
   - MySQL Repository (for relational data), or
   - MongoDB Repository (for prescriptions)
7. Database executes query.
8. Repository returns data.
9. Service formats response.
10. REST Controller returns JSON response.
11. Client receives structured JSON output.

---

# 6. MVC and REST Organization

| Component Type | Purpose | Technology |
|---------------|----------|------------|
| Thymeleaf Controllers | Render HTML views | Spring MVC |
| REST Controllers | Provide JSON APIs | Spring Boot REST |
| Service Layer | Business Logic | Spring |
| MySQL Repositories | Relational Data Access | Spring Data JPA |
| MongoDB Repository | Document Data Access | Spring Data MongoDB |

---

# 7. Architectural Advantages

1. Clear Separation of Concerns
2. Scalable design
3. Supports hybrid data storage
4. Clean MVC + REST hybrid structure
5. Easy to maintain and extend
6. Flexible document storage for prescriptions
7. Strong relational consistency for core clinic data

---

# 8. Technology Stack

- Java
- Spring Boot
- Spring MVC
- Thymeleaf
- Spring Data JPA
- MySQL
- Spring Data MongoDB
- MongoDB
- REST APIs
- JSON

---

# 9. Architecture Summary (Short Version)

The Smart Clinic Management System uses a layered Spring Boot architecture combining MVC dashboards and REST APIs. The Service layer centralizes business logic, while data persistence is split between MySQL (via JPA for relational entities like Patient, Doctor, Appointment, Admin) and MongoDB (via Spring Data for document-based Prescription storage). This hybrid architecture ensures flexibility, scalability, and strong separation of responsibilities across the system.

---

