import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

const patientTableBody = document.getElementById("patientTableBody");
const searchBar = document.getElementById("searchBar");
const todayButton = document.getElementById("todayButton");
const datePicker = document.getElementById("datePicker");

let selectedDate = new Date().toISOString().split("T")[0];
const token = localStorage.getItem("token");
let patientName = null;

if (datePicker) {
  datePicker.value = selectedDate;
}

if (searchBar) {
  searchBar.addEventListener("input", () => {
    const searchValue = searchBar.value.trim();
    patientName = searchValue === "" ? "null" : searchValue;
    loadAppointments();
  });
}

if (todayButton) {
  todayButton.addEventListener("click", () => {
    selectedDate = new Date().toISOString().split("T")[0];

    if (datePicker) {
      datePicker.value = selectedDate;
    }

    loadAppointments();
  });
}

if (datePicker) {
  datePicker.addEventListener("change", () => {
    selectedDate = datePicker.value;
    loadAppointments();
  });
}

async function loadAppointments() {
  if (!patientTableBody) {
    return;
  }

  try {
    const appointments = await getAllAppointments(
      selectedDate,
      patientName ?? "null",
      token
    );

    patientTableBody.innerHTML = "";

    if (!appointments || appointments.length === 0) {
      patientTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="noPatientRecord">No Appointments found for today</td>
        </tr>
      `;
      return;
    }

    appointments.forEach((appointment) => {
      const patient = {
        id: appointment.patient?.patientId,
        name: appointment.patient?.name,
        phone: appointment.patient?.phone,
        email: appointment.patient?.email
      };

      const patientRow = createPatientRow(
        patient,
        appointment.appointmentId,
        appointment.doctor?.doctorId
      );

      patientTableBody.appendChild(patientRow);
    });
  } catch (error) {
    console.error("Error loading appointments:", error);
    patientTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="noPatientRecord">Error loading appointments. Try again later.</td>
      </tr>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderContent === "function") {
    renderContent();
  }

  loadAppointments();
});
