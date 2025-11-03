document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    let isValid = true;

    const studentId = document.getElementById('student_id').value.trim();
    const lastName = document.getElementById('last_name').value.trim();
    const firstName = document.getElementById('first_name').value.trim();
    const email = document.getElementById('email').value.trim();

    document.querySelectorAll('.error-msg').forEach(el => el.remove());

    function showError(input, message) {
      const error = document.createElement('div');
      error.className = 'error-msg';
      error.style.color = 'red';
      error.style.fontSize = '0.9em';
      error.textContent = message;
      input.insertAdjacentElement('afterend', error);
      isValid = false;
    }

    if (studentId === '') showError(document.getElementById('student_id'), 'Student ID is required.');
    else if (!/^\d+$/.test(studentId)) showError(document.getElementById('student_id'), 'Student ID must contain only numbers.');

    if (lastName === '') showError(document.getElementById('last_name'), 'Last Name is required.');
    else if (!/^[A-Za-z]+$/.test(lastName)) showError(document.getElementById('last_name'), 'Last Name must contain only letters.');

    if (firstName === '') showError(document.getElementById('first_name'), 'First Name is required.');
    else if (!/^[A-Za-z]+$/.test(firstName)) showError(document.getElementById('first_name'), 'First Name must contain only letters.');

    if (email === '') showError(document.getElementById('email'), 'Email is required.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) showError(document.getElementById('email'), 'Invalid email format.');

    if (!isValid) return;

    
    alert(`✅ Student ${firstName} ${lastName} added successfully!`);

    
    form.reset();
  });
});
document.getElementById("studentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const id = document.getElementById("student_id");
  const last = document.getElementById("last_name");
  const first = document.getElementById("first_name");
  const email = document.getElementById("email");
  let valid = true;

  document.querySelectorAll(".error").forEach(e => e.remove());

  function error(input, message) {
    const div = document.createElement("div");
    div.className = "error";
    div.style.color = "red";
    div.textContent = message;
    input.insertAdjacentElement("afterend", div);
    valid = false;
  }

  if (id.value.trim() === "" || !/^\d+$/.test(id.value)) error(id, "ID must contain only numbers.");
  if (last.value.trim() === "" || !/^[A-Za-z]+$/.test(last.value)) error(last, "Last name must contain only letters.");
  if (first.value.trim() === "" || !/^[A-Za-z]+$/.test(first.value)) error(first, "First name must contain only letters.");
  if (email.value.trim() === "" || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)) error(email, "Invalid email.");

  if (!valid) return;


  const newStudent = {
    id: id.value,
    last: last.value,
    first: first.value,
    course: "New Course"
  };

  let students = JSON.parse(localStorage.getItem("students") || "[]");
  students.push(newStudent);
  localStorage.setItem("students", JSON.stringify(students));

  alert(`✅ Student ${first.value} ${last.value} added successfully!`);
  document.getElementById("studentForm").reset();
});
