$(document).ready(function() {
  $("#studentForm").submit(function(e) {
    e.preventDefault();

    const id = $("#student_id").val().trim();
    const last = $("#last_name").val().trim();
    const first = $("#first_name").val().trim();
    const email = $("#email").val().trim();

    if (!id || !last || !first || !email) {
      alert("Please fill in all fields.");
      return;
    }

    
    let students = JSON.parse(localStorage.getItem("students") || "[]");

    
    const exists = students.some(s => s.id === id || s.email === email);
    if (exists) {
      alert("❌ This student already exists!");
      return;
    }

    
    students.push({ id, last, first, email });
    localStorage.setItem("students", JSON.stringify(students));

    alert(`✅ Student ${first} ${last} added successfully!`);

    
    $("#studentForm")[0].reset();
  });
});

