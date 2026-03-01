import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = API_BASE_URL + '/doctor';

export async function getDoctors() {
  try {
    const response = await fetch(`${DOCTOR_API}`);
    const data = await response.json();

    if (!response.ok) {
      console.error('Failed to fetch doctors:', data?.message || response.statusText);
      return [];
    }

    return data.doctors || [];
  } catch (error) {
    console.error('Error :: getDoctors ::', error);
    return [];
  }
}

export async function deleteDoctor(id, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}/${token}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    return {
      success: response.ok,
      message: result.message || (response.ok ? 'Doctor deleted successfully.' : 'Failed to delete doctor.')
    };
  } catch (error) {
    console.error('Error :: deleteDoctor ::', error);
    return {
      success: false,
      message: error.message || 'Something went wrong while deleting doctor.'
    };
  }
}

export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doctor)
    });

    const result = await response.json();
    return {
      success: response.ok,
      message: result.message || (response.ok ? 'Doctor saved successfully.' : 'Failed to save doctor.')
    };
  } catch (error) {
    console.error('Error :: saveDoctor ::', error);
    return {
      success: false,
      message: error.message || 'Something went wrong while saving doctor.'
    };
  }
}

export async function filterDoctors(name, time, specialty) {
  try {
    const safeName = name && name.trim() ? encodeURIComponent(name.trim()) : 'null';
    const safeTime = time && time.trim() ? encodeURIComponent(time.trim()) : 'null';
    const safeSpecialty = specialty && specialty.trim() ? encodeURIComponent(specialty.trim()) : 'null';

    const response = await fetch(`${DOCTOR_API}/filter/${safeName}/${safeTime}/${safeSpecialty}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Failed to filter doctors:', errorData?.message || response.statusText);
      return { doctors: [] };
    }

    const data = await response.json();
    return {
      doctors: data.doctors || []
    };
  } catch (error) {
    console.error('Error :: filterDoctors ::', error);
    alert('Something went wrong while filtering doctors.');
    return { doctors: [] };
  }
}
