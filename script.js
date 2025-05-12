const questions = document.querySelectorAll('.faq-question');

questions.forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const icon = q.querySelector('.icon i');
    item.classList.toggle('active');

    if (item.classList.contains('active')) {
      icon.classList.remove('bi-plus-circle-fill');
      icon.classList.add('bi-dash-circle-fill');
    } else {
      icon.classList.remove('bi-dash-circle-fill');
      icon.classList.add('bi-plus-circle-fill');
    }
  });
});

document.getElementById('cvUpload').addEventListener('change', function () {
  const fileDisplay = document.getElementById('fileNameDisplay');
  if (this.files.length > 0) {
    fileDisplay.textContent = this.files[0].name;
  } else {
    fileDisplay.textContent = '';
  }
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const errorFields = ['fullName', 'email', 'phone', 'dob', 'gender', 'city', 'state', 'address', 'cvUpload', 'terms', 'session'];
  errorFields.forEach(id => {
    const errorEl = document.getElementById(id + 'Error');
    if (errorEl) {
      errorEl.textContent = '';
    }
  });

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const dob = document.getElementById('dob').value;
  const gender = document.getElementById('gender').value;
  const city = document.getElementById('city').value.trim();
  const state = document.getElementById('state').value;
  const address = document.getElementById('address').value.trim();
  const fileUploaded = document.getElementById('cvUpload').files.length > 0;
  const termsAccepted = document.getElementById('terms').checked;
  const sessionSelected = document.getElementById('yes').checked || document.getElementById('no').checked;

  let isValid = true;

  function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) errorElement.textContent = message;
  }

  if (!fullName) {
    showError('fullName', '*Required');
    isValid = false;
  }

  if (!email) {
    showError('email', '*Required');
    isValid = false;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      showError('email', 'Enter a valid email');
      isValid = false;
    }
  }

  if (!phone) {
    showError('phone', '*Required');
    isValid = false;
  } else {
    const number = phone.length;
    if (number !== 10 || !/^\d{10}$/.test(phone)) {
      showError('phone', 'Number must be exactly 10 digits');
      isValid = false;
    }
  }

  if (!dob) {
    showError('dob', '*Required');
    isValid = false;
  } else {
    const birthYear = new Date(dob).getFullYear();
    const age = new Date().getFullYear() - birthYear;
    if (birthYear > 2004 || age < 18 || age > 100) {
      showError('dob', 'Age must be between 18 and 100. DOB should be before 2005.');
      isValid = false;
    }
  }

  if (!gender) {
    showError('gender', '*Required');
    isValid = false;
  }

  if (!city) {
    showError('city', '*Required');
    isValid = false;
  }

  if (!state) {
    showError('state', '*Required');
    isValid = false;
  }

  if (!address) {
    showError('address', '*Required');
    isValid = false;
  } else if (address.length > 120) {
    showError('address', 'Max 120 characters allowed');
    isValid = false;
  }

  if (!fileUploaded) {
    showError('cvUpload', '*Please upload your CV/Resume');
    isValid = false;
  }

  if (!termsAccepted) {
    showError('terms', '*You must agree to the terms');
    isValid = false;
  }

  if (!sessionSelected) {
    showError('session', '*Please select an option');
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted");
    document.getElementById("contactForm").reset();
  }
});

function initMap() {
  const capsitechLocation = { lat: 26.1755032, lng: 72.9328963 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: capsitechLocation,
  });

  new google.maps.Marker({
    position: capsitechLocation,
    map: map,
    title: "Capsitech",
  });
}
