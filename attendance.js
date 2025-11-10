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
    let absences = $(this).find(".absences").text();
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

      $(this).find(".absences").text(absences);
      $(this).find(".participations").text(participations);

     
      if (absences >= 5) {
        $(this).css("background-color", "#ff6b6b");
        $(this).find(".message").text("❌ Excluded – too many absences – You need to participate more");
      } else if (absences >= 3) {
        $(this).css("background-color", "#fff475");
        $(this).find(".message").text("⚠️ Warning – attendance low – You need to participate more");
      } else {
        $(this).css("background-color", "#a6f3a6");
        $(this).find(".message").text("✅ Good attendance – Excellent participation");
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
      let absences = parseInt($(this).find(".absences").text());
      if (absences < 3) $(this).animate({ backgroundColor: "#9cfd9c" }, 800);
    });
  });

 
  $("#resetBtn").click(function() {
    $("#attendanceTable tbody tr").css("background-color", "");
  });

  
 
  $("#searchName").on("keyup", function () {
    const searchValue = $(this).val().toLowerCase();
    $("#attendanceTable tbody tr").filter(function () {
      const last = $(this).find("td:nth-child(1)").text().toLowerCase();
      const first = $(this).find("td:nth-child(2)").text().toLowerCase();
      $(this).toggle(last.includes(searchValue) || first.includes(searchValue));
    });
  });

 
  $("#sortAbs").click(function () {
    const rows = $("#attendanceTable tbody tr").get();
    rows.sort((a, b) => {
      const A = parseInt($(a).find(".absences").text()) || 0;
      const B = parseInt($(b).find(".absences").text()) || 0;
      return A - B;
    });
    $.each(rows, function (_, row) {
      $("#attendanceTable tbody").append(row);
    });
    $("#sortMessage").text("Currently sorted by absences (ascending)");
  });

 
  $("#sortPart").click(function () {
    const rows = $("#attendanceTable tbody tr").get();
    rows.sort((a, b) => {
      const A = parseInt($(a).find(".participations").text()) || 0;
      const B = parseInt($(b).find(".participations").text()) || 0;
      return B - A;
    });
    $.each(rows, function (_, row) {
      $("#attendanceTable tbody").append(row);
    });
    $("#sortMessage").text("Currently sorted by participation (descending)");
  });

});
