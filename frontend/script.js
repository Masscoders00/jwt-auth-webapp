document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const registerEmailInput = document.getElementById('registerEmail');
  const registerPasswordInput = document.getElementById('registerPassword');
  const protectedData = document.getElementById('protectedData');
  const data = document.getElementById('data');
  const accessProtectedButton = document.getElementById('accessProtectedButton');
  const logoutButton = document.getElementById('logoutButton');
  const showRegisterLink = document.getElementById('showRegister');
  const showLoginLink = document.getElementById('showLogin');
  const loginFormContainer = document.getElementById('loginFormContainer');
  const registerFormContainer = document.getElementById('registerFormContainer');
  const successMessage = document.getElementById('successMessage');
  const successText = document.getElementById('successText');
  const continueButton = document.getElementById('continueButton');
  const authForms = document.getElementById('authForms');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://your-backend-url.onrender.com';
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem('token', result.token);
      authForms.style.display = 'none';
      accessProtectedButton.style.display = 'block';
      successMessage.style.display = 'block';
      successText.textContent = `Welcome ${email}! You have successfully logged in.`;
    } else {
      alert(result.error);
    }
  });

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;

    const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://your-backend-url.onrender.com';
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
      registerFormContainer.style.display = 'none';
      loginFormContainer.style.display = 'none';
      successMessage.style.display = 'block';
      successText.textContent = `Registration successful! You can now login with your credentials.`;
    } else {
      alert(result.error);
    }
  });

  showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormContainer.style.display = 'none';
    registerFormContainer.style.display = 'block';
  });

  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
  });

  continueButton.addEventListener('click', () => {
    successMessage.style.display = 'none';
    if (localStorage.getItem('token')) {
      accessProtectedButton.style.display = 'block';
    } else {
      loginFormContainer.style.display = 'block';
    }
  });

  accessProtectedButton.addEventListener('click', async () => {
    const token = localStorage.getItem('token');

    const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://your-backend-url.onrender.com';
    const response = await fetch(`${API_URL}/protected`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const result = await response.json();

    if (response.ok) {
      protectedData.style.display = 'block';
      data.textContent = result.message;
      accessProtectedButton.style.display = 'none';
    } else {
      alert(result.error);
    }
  });

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    protectedData.style.display = 'none';
    accessProtectedButton.style.display = 'none';
    successMessage.style.display = 'none';
    authForms.style.display = 'block';
    loginFormContainer.style.display = 'block';
    registerFormContainer.style.display = 'none';
    emailInput.value = '';
    passwordInput.value = '';
  });
});