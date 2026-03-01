// patientDashboard.js
import { createDoctorCard } from './components/doctorCard.js';
import { openModal } from './components/modals.js';
import { getDoctors, filterDoctors } from './services/doctorServices.js';
import { patientLogin, patientSignup } from './services/patientServices.js';

document.addEventListener('DOMContentLoaded', () => {
  loadDoctorCards();

  const signupBtn = document.getElementById('patientSignup');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => openModal('patientSignup'));
  }

  const loginBtn = document.getElementById('patientLogin');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => openModal('patientLogin'));
  }

  const searchBar = document.getElementById('searchBar');
  const filterTime = document.getElementById('filterTime');
  const filterSpecialty = document.getElementById('filterSpecialty');

  if (searchBar) {
    searchBar.addEventListener('input', filterDoctorsOnChange);
  }
  if (filterTime) {
    filterTime.addEventListener('change', filterDoctorsOnChange);
  }
  if (filterSpecialty) {
    filterSpecialty.addEventListener('change', filterDoctorsOnChange);
  }
});

async function loadDoctorCards() {
  const contentDiv = document.getElementById('content');
  if (!contentDiv) {
    return;
  }

  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error('Failed to load doctors:', error);
    contentDiv.innerHTML = '<p>Unable to load doctors at the moment. Please try again later.</p>';
  }
}

export function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById('content');
  if (!contentDiv) {
    return;
  }

  contentDiv.innerHTML = '';

  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = '<p>No doctors found with the given filters.</p>';
    return;
  }

  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

async function filterDoctorsOnChange() {
  const searchBar = document.getElementById('searchBar');
  const filterTime = document.getElementById('filterTime');
  const filterSpecialty = document.getElementById('filterSpecialty');

  const name = searchBar?.value.trim() || null;
  const time = filterTime?.value || null;
  const specialty = filterSpecialty?.value || null;

  try {
    const response = await filterDoctors(name, time, specialty);
    const doctors = Array.isArray(response?.doctors) ? response.doctors : [];
    renderDoctorCards(doctors);
  } catch (error) {
    console.error('Failed to filter doctors:', error);
    const contentDiv = document.getElementById('content');
    if (contentDiv) {
      contentDiv.innerHTML = '<p>Unable to apply filters right now. Please try again.</p>';
    }
  }
}

window.signupPatient = async function () {
  try {
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const phone = document.getElementById('phone')?.value;
    const address = document.getElementById('address')?.value;

    const data = { name, email, password, phone, address };
    const { success, message } = await patientSignup(data);

    if (success) {
      alert(message || 'Signup successful!');
      const modal = document.getElementById('modal');
      if (modal) {
        modal.style.display = 'none';
      }
      window.location.reload();
      return;
    }

    alert(message || 'Signup failed. Please try again.');
  } catch (error) {
    console.error('Signup failed:', error);
    alert('❌ An error occurred while signing up.');
  }
};

window.loginPatient = async function () {
  try {
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;

    const data = { email, password };
    const response = await patientLogin(data);

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem('token', result.token);
      if (typeof selectRole === 'function') {
        selectRole('loggedPatient');
      }
      window.location.href = '/pages/loggedPatientDashboard.html';
      return;
    }

    alert('❌ Invalid credentials!');
  } catch (error) {
    console.error('Error :: loginPatient ::', error);
    alert('❌ Failed to login. Please try again.');
  }
};
