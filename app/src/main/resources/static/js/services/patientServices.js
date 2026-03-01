// patientServices
import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = `${API_BASE_URL}/patient`;

// For creating a patient in db
export async function patientSignup(data) {
  try {
    const response = await fetch(`${PATIENT_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message || "Failed to sign up patient");
    }

    return { success: true, message: result?.message || "Patient registered successfully" };
  } catch (error) {
    console.error("Error :: patientSignup ::", error);
    return { success: false, message: error?.message || "Unable to sign up patient" };
  }
}

// For logging in patient
export async function patientLogin(data) {
  console.log("patientLogin ::", data);

  return await fetch(`${PATIENT_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// For getting patient data (name, id, etc). Used in booking appointments
export async function getPatientData(token) {
  try {
    const response = await fetch(`${PATIENT_API}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch patient details:", data?.message || response.statusText);
      return null;
    }

    return data?.patient || null;
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return null;
  }
}

// Backend API for patient records (doctor dashboard) and appointments (patient dashboard)
export async function getPatientAppointments(id, token, user) {
  try {
    const response = await fetch(`${PATIENT_API}/${id}/${user}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch appointments:", data?.message || response.statusText);
      return null;
    }

    return data?.appointments || [];
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    return null;
  }
}

export async function filterAppointments(condition, name, token) {
  try {
    const safeCondition = condition ?? "null";
    const safeName = name ?? "null";

    const response = await fetch(
      `${PATIENT_API}/filter/${encodeURIComponent(safeCondition)}/${encodeURIComponent(safeName)}/${encodeURIComponent(token)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch filtered appointments:", response.statusText);
      return { appointments: [] };
    }

    const data = await response.json();
    return data?.appointments ? data : { appointments: [] };
  } catch (error) {
    console.error("Error filtering appointments:", error);
    alert("Something went wrong!");
    return { appointments: [] };
  }
}
