// patientAppointment.js
import { getPatientAppointments, getPatientData, filterAppointments } from "./services/patientServices.js";

const tableBody = document.getElementById("patientTableBody");
const token = localStorage.getItem("token");
const PAGE_SIZE = 8;

let allAppointments = [];
let filteredAppointments = [];
let currentPage = 1;
let patientId = null;

const searchBar = document.getElementById("searchBar");
const appointmentFilter = document.getElementById("appointmentFilter");
const statusFilter = document.getElementById("statusFilter");
const dateFilter = document.getElementById("dateFilter");
const feedbackMessage = document.getElementById("feedbackMessage");
const resultSummary = document.getElementById("resultSummary");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const pageIndicator = document.getElementById("pageIndicator");

document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {
  try {
    if (!token) throw new Error("No token found");

    const patient = await getPatientData(token);
    if (!patient) throw new Error("Failed to fetch patient details");

    patientId = Number(patient.id);

    const appointmentData = await getPatientAppointments(patientId, token, "patient") || [];
    allAppointments = appointmentData.filter(app => app.patientId === patientId);
    filteredAppointments = allAppointments;

    setInfoMessage(`Loaded ${allAppointments.length} appointment(s).`);
    renderAppointments(filteredAppointments);
  } catch (error) {
    console.error("Error loading appointments:", error);
    setErrorMessage("Unable to load appointments. Please refresh and try again.");
    renderAppointments([]);
  }
}

function renderAppointments(appointments) {
  tableBody.innerHTML = "";

  const paginatedAppointments = getPaginatedAppointments(appointments);

  if (!appointments.length) {
    tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No Appointments Found</td></tr>`;
    updateSummary(0, 0, 0);
    updatePaginationControls(0);
    return;
  }

  paginatedAppointments.forEach(appointment => {
    const tr = document.createElement("tr");
    const statusLabel = appointment.status == 1 ? "Consulted" : "Pending";
    const statusClass = appointment.status == 1 ? "consulted" : "pending";

    tr.innerHTML = `
      <td>${appointment.patientName || "You"}</td>
      <td>${appointment.doctorName}</td>
      <td>${appointment.appointmentDate}</td>
      <td>${appointment.appointmentTimeOnly}</td>
      <td><span class="status-badge ${statusClass}">${statusLabel}</span></td>
      <td>${appointment.status == 0 ? `<img src="../assets/images/edit/edit.png" alt="Edit" class="prescription-btn" data-id="${appointment.patientId}">` : "-"}</td>
    `;

    if (appointment.status == 0) {
      const actionBtn = tr.querySelector(".prescription-btn");
      actionBtn?.addEventListener("click", () => redirectToUpdatePage(appointment));
    }

    tableBody.appendChild(tr);
  });

  updateSummary(appointments.length, paginatedAppointments.length, currentPage);
  updatePaginationControls(appointments.length);
}

function redirectToUpdatePage(appointment) {
  const queryString = new URLSearchParams({
    appointmentId: appointment.id,
    patientId: appointment.patientId,
    patientName: appointment.patientName || "You",
    doctorName: appointment.doctorName,
    doctorId: appointment.doctorId,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTimeOnly,
  }).toString();

  setTimeout(() => {
    window.location.href = `/pages/updateAppointment.html?${queryString}`;
  }, 100);
}

searchBar?.addEventListener("input", handleFilterChange);
appointmentFilter?.addEventListener("change", handleFilterChange);
statusFilter?.addEventListener("change", handleFilterChange);
dateFilter?.addEventListener("change", applyClientSideFilters);
prevPageBtn?.addEventListener("click", () => changePage(-1));
nextPageBtn?.addEventListener("click", () => changePage(1));

async function handleFilterChange() {
  const searchBarValue = searchBar?.value.trim();
  const filterValue = appointmentFilter?.value;

  const name = searchBarValue || null;
  const condition = filterValue === "allAppointments" ? null : filterValue || null;

  try {
    const response = await filterAppointments(condition, name, token);
    const appointments = response?.appointments || [];
    const patientAppointments = appointments.filter(app => app.patientId === patientId);

    allAppointments = patientAppointments;
    applyClientSideFilters();
  } catch (error) {
    console.error("Failed to filter appointments:", error);
    setErrorMessage("Unable to apply filters right now. Please try again.");
  }
}

function applyClientSideFilters() {
  const selectedStatus = statusFilter?.value || "all";
  const selectedDate = dateFilter?.value || "";

  filteredAppointments = allAppointments.filter((appointment) => {
    const matchesStatus = selectedStatus === "all"
      || (selectedStatus === "consulted" && appointment.status == 1)
      || (selectedStatus === "pending" && appointment.status == 0);

    const matchesDate = !selectedDate || appointment.appointmentDate === selectedDate;

    return matchesStatus && matchesDate;
  });

  currentPage = 1;
  if (!filteredAppointments.length) {
    setInfoMessage("No appointments matched the selected filters.");
  } else {
    setInfoMessage(`Showing ${filteredAppointments.length} filtered appointment(s).`);
  }

  renderAppointments(filteredAppointments);
}

function getPaginatedAppointments(appointments) {
  const start = (currentPage - 1) * PAGE_SIZE;
  return appointments.slice(start, start + PAGE_SIZE);
}

function changePage(offset) {
  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / PAGE_SIZE));
  const nextPage = currentPage + offset;

  if (nextPage < 1 || nextPage > totalPages) {
    return;
  }

  currentPage = nextPage;
  renderAppointments(filteredAppointments);
}

function updateSummary(totalFiltered, visibleCount, page) {
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const startItem = totalFiltered === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endItem = totalFiltered === 0 ? 0 : startItem + visibleCount - 1;

  if (resultSummary) {
    resultSummary.textContent = `Showing ${startItem}-${endItem} of ${totalFiltered} appointment(s).`;
  }

  if (pageIndicator) {
    pageIndicator.textContent = `Page ${page} of ${totalPages}`;
  }
}

function updatePaginationControls(totalCount) {
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  if (prevPageBtn) {
    prevPageBtn.disabled = currentPage <= 1;
  }

  if (nextPageBtn) {
    nextPageBtn.disabled = currentPage >= totalPages;
  }
}

function setErrorMessage(message) {
  if (!feedbackMessage) {
    return;
  }

  feedbackMessage.classList.remove("info");
  feedbackMessage.classList.add("error");
  feedbackMessage.textContent = message;
}

function setInfoMessage(message) {
  if (!feedbackMessage) {
    return;
  }

  feedbackMessage.classList.remove("error");
  feedbackMessage.classList.add("info");
  feedbackMessage.textContent = message;
}
