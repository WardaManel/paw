$(document).ready(function() {

  
  let students = JSON.parse(localStorage.getItem("students") || "[]");
  students.forEach(student => {
    let row = `<tr>
      <td>${student.last}</td>
      <td>${student.first}</td>
      <td><input type="checkbox"></td><td><input type="checkbox"></td>
      <td><input type="checkbox"></td><td><input type="checkbox"></td>
      <td><input type="checkbox"></td><td><input type="checkbox"></td>
      <td><input type="checkbox"></td><td><input type="checkbox"></td>
      <td><input type="checkbox"></td><td><input type="checkbox"></td>
      <td class="absences"></td>
      <td class="participations"></td>
      <td class="message"></td>
    </tr>`;
    $("#attendanceTable tbody").append(row);
  });

 
  $("table tbody").on("mouseenter", "tr", function() {
    $(this).css("background-color", "#fef397");
  }).on("mouseleave", "tr", function() {
    $(this).css("background-color", "");
  });

  
  $("table tbody").on("click", "tr", function() {
    let name = $(this).find("td:nth-child(1)").text() + " " + $(this).find("td:nth-child(2)").text();
    let absences = $(this).find("td:nth-last-child(3)").text();
    alert("👤 " + name + " has " + absences + " absences.");
  });

  
  $("#showReport").click(function() {
    let total = 0, present = 0, participated = 0;

    $("#attendanceTable tbody tr").each(function() {
      total++;
      let checkboxes = $(this).find("input[type='checkbox']");
      let absences = 0, participations = 0;

      checkboxes.each(function() {
        if ($(this).is(":checked")) participations++;
        else absences++;
      });

      $(this).find("td:nth-last-child(3)").text(absences);
      $(this).find("td:nth-last-child(2)").text(participations);

      
      if (absences >= 5) {
        $(this).css("background-color", "#ff6b6b");
        $(this).find("td:last").text("❌ Excluded – too many absences – You need to participate more");
      } else if (absences >= 3) {
        $(this).css("background-color", "#fff475");
        $(this).find("td:last").text("⚠️ Warning – attendance low – You need to participate more");
      } else {
        $(this).css("background-color", "#a6f3a6");
        $(this).find("td:last").text("✅ Good attendance – Excellent participation");
      }

      if (absences < 6) present++;
      if (participations > 0) participated++;
    });

    $("#totalStudents").text(total);
    $("#presentStudents").text(present);
    $("#participatedStudents").text(participated);
    $("#reportSection").show();

   
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

  
  $("#highlightBtn").click(function() {
    $("#attendanceTable tbody tr").each(function() {
      let absences = parseInt($(this).find("td:nth-last-child(3)").text());
      if (absences < 3) $(this).animate({ backgroundColor: "#9cfd9c" }, 800);
    });
  });
});
