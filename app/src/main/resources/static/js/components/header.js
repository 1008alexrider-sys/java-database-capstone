function getLogoPath() {
  return window.location.pathname.startsWith('/pages/') ? '../assets/images/logo/logo.png' : '/assets/images/logo/logo.png';
}

function renderHeader() {
  const headerDiv = document.getElementById('header');
  if (!headerDiv) {
    return;
  }

  if (window.location.pathname.endsWith('/')) {
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
  }

  const role = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  if ((role === 'loggedPatient' || role === 'admin' || role === 'doctor') && !token) {
    localStorage.removeItem('userRole');
    alert('Session expired or invalid login. Please log in again.');
    window.location.href = '/';
    return;
  }

  let headerContent = `
    <header class="header">
      <div class="logo-section">
        <img src="${getLogoPath()}" alt="Hospital CRM Logo" class="logo-img">
        <span class="logo-title">Hospital CMS</span>
      </div>
      <nav class="header-nav">
  `;

  if (role === 'admin') {
    headerContent += `
      <button id="addDocBtn" class="adminBtn">Add Doctor</button>
      <a id="logoutLink" href="#">Logout</a>`;
  } else if (role === 'doctor') {
    headerContent += `
      <button id="doctorHomeBtn" class="adminBtn">Home</button>
      <a id="logoutLink" href="#">Logout</a>`;
  } else if (role === 'patient') {
    headerContent += `
      <button id="patientLogin" class="adminBtn">Login</button>
      <button id="patientSignup" class="adminBtn">Sign Up</button>`;
  } else if (role === 'loggedPatient') {
    headerContent += `
      <button id="home" class="adminBtn">Home</button>
      <button id="patientAppointments" class="adminBtn">Appointments</button>
      <a id="patientLogoutLink" href="#">Logout</a>`;
  }

  headerContent += `
      </nav>
    </header>
  `;

  headerDiv.innerHTML = headerContent;
  attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
  const addDocBtn = document.getElementById('addDocBtn');
  if (addDocBtn) {
    addDocBtn.addEventListener('click', async () => {
      const { openModal } = await import('./modals.js');
      openModal('addDoctor');
    });
  }

  const patientLoginBtn = document.getElementById('patientLogin');
  if (patientLoginBtn) {
    patientLoginBtn.addEventListener('click', async () => {
      const { openModal } = await import('./modals.js');
      openModal('patientLogin');
    });
  }

  const patientSignupBtn = document.getElementById('patientSignup');
  if (patientSignupBtn) {
    patientSignupBtn.addEventListener('click', async () => {
      const { openModal } = await import('./modals.js');
      openModal('patientSignup');
    });
  }

  const doctorHomeBtn = document.getElementById('doctorHomeBtn');
  if (doctorHomeBtn) {
    doctorHomeBtn.addEventListener('click', () => {
      window.location.href = '/doctorDashboard/' + localStorage.getItem('token');
    });
  }

  const homeBtn = document.getElementById('home');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      window.location.href = '/pages/loggedPatientDashboard.html';
    });
  }

  const patientAppointmentsBtn = document.getElementById('patientAppointments');
  if (patientAppointmentsBtn) {
    patientAppointmentsBtn.addEventListener('click', () => {
      window.location.href = '/pages/patientAppointments.html';
    });
  }

  const logoutLink = document.getElementById('logoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      logout();
    });
  }

  const patientLogoutLink = document.getElementById('patientLogoutLink');
  if (patientLogoutLink) {
    patientLogoutLink.addEventListener('click', (event) => {
      event.preventDefault();
      logoutPatient();
    });
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  window.location.href = '/';
}

function logoutPatient() {
  localStorage.removeItem('token');
  localStorage.setItem('userRole', 'patient');
  window.location.href = '/pages/patientDashboard.html';
}

window.logout = logout;
window.logoutPatient = logoutPatient;
window.renderHeader = renderHeader;

document.addEventListener('DOMContentLoaded', renderHeader);
