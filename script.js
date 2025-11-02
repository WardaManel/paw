document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll("#attendanceTable tbody tr");

  // ✅ Exercise 1: Count absences + participation + color + message
  rows.forEach(row => {
    const cells = row.querySelectorAll("td");
    let abs = 0, part = 0;

    // Count ✓ for presence (6 sessions)
    for (let i = 4; i <= 9; i++) {
      if (cells[i].textContent.trim() === "✓") part++;
      else abs++;
    }

    cells[10].textContent = abs + " Abs";
    cells[11].textContent = part + " Par";

    // Color by absences
    if (abs < 3) row.style.backgroundColor = "#b6fcb6"; // green
    else if (abs <= 4) row.style.backgroundColor = "#fff8b6"; // yellow
    else row.style.backgroundColor = "#ffb6b6"; // red

    // Message
    if (abs < 3 && part >= 4)
      cells[12].textContent = "Good attendance – Excellent participation";
    else if (abs >= 3 && abs < 5)
      cells[12].textContent = "Warning – attendance low – You need to participate more";
    else
      cells[12].textContent = "Excluded – too many absences – You need to participate more";
  });

  // ✅ Exercise 4: Show report
  document.getElementById("showReport").addEventListener("click", () => {
    const total = rows.length;
    let present = 0, participated = 0;

    rows.forEach(r => {
      const abs = parseInt(r.cells[10].textContent);
      const par = parseInt(r.cells[11].textContent);
      if (abs < 6) present++;
      if (par > 0) participated++;
    });

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("presentStudents").textContent = present;
    document.getElementById("participatedStudents").textContent = participated;

    document.getElementById("reportSection").style.display = "block";

    const ctx = document.getElementById("reportChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Total", "Present", "Participated"],
        datasets: [{
          label: "Student Stats",
          data: [total, present, participated],
          backgroundColor: ["#7fb3d5", "#76d7c4", "#f9e79f"]
        }]
      }
    });
  });

  // ✅ Exercise 5: Hover & click row
  $("table tbody tr").hover(
    function() { $(this).css("background-color", "#e1f5fe"); },
    function() { $(this).css("background-color", ""); }
  );

  $("table tbody tr").click(function() {
    const fullName = $(this).find("td:nth-child(2)").text() + " " + $(this).find("td:nth-child(3)").text();
    const absences = $(this).find("td:nth-child(11)").text();
    alert(`👤 ${fullName}\nAbsences: ${absences}`);
  });

  // ✅ Exercise 6: Highlight Excellent Students
  $("#highlightBtn").click(() => {
    $("table tbody tr").each(function() {
      const abs = parseInt($(this).find("td:nth-child(11)").text());
      if (abs < 3) {
        $(this).animate({ backgroundColor: "#90ee90" }, 800);
      }
    });
  });

  $("#resetBtn").click(() => {
    $("table tbody tr").animate({ backgroundColor: "#fff" }, 800);
  });
});
