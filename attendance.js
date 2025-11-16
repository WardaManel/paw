$(document).ready(function () {

 
  let students = JSON.parse(localStorage.getItem("students") || "[]");

  students.forEach(student => {
    let row = `
      <tr>
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

 
  $("table tbody").on("mouseenter", "tr", function () {
    $(this).css("background-color", "#fef397");
  }).on("mouseleave", "tr", function () {
    $(this).css("background-color", "");
  });

 
  $("table tbody").on("click", "tr", function () {
    let name = $(this).find("td:nth-child(1)").text() + " " +
               $(this).find("td:nth-child(2)").text();

    let abs = $(this).find(".absences").text() || "0";
    alert("👤 " + name + " has " + abs + " absences.");
  });

  
  $("#calculateBtn").click(function () {
    $("#attendanceTable tbody tr").each(function () {
      let checkboxes = $(this).find("input[type='checkbox']");
      let abs = 0, part = 0;

      checkboxes.each(function () {
        if ($(this).is(":checked")) part++;
        else abs++;
      });

      $(this).find(".absences").text(abs);
      $(this).find(".participations").text(part);

      if (abs >= 5) {
        $(this).addClass("red");
        $(this).find(".message").text("❌ Excluded – too many absences");
      } else if (abs >= 3) {
        $(this).addClass("yellow");
        $(this).find(".message").text("⚠️ Warning – attendance low");
      } else {
        $(this).addClass("green");
        $(this).find(".message").text("✅ Good attendance");
      }
    });
  });

  
  $("#showReportBtn").click(function () {
    let total = $("#attendanceTable tbody tr").length;
    let present = 0, participated = 0;

    $("#attendanceTable tbody tr").each(function () {
      let abs = parseInt($(this).find(".absences").text()) || 0;
      let part = parseInt($(this).find(".participations").text()) || 0;

      if (abs < 6) present++;
      if (part > 0) participated++;
    });

    $("#totalStudents").text(total);
    $("#presentStudents").text(present);
    $("#participatedStudents").text(participated);

    $("#reportSection").show();

    drawChart(total, present, participated);
  });


  let reportChart = null;
  function drawChart(total, present, participated) {
    if (reportChart !== null) reportChart.destroy();

    const ctx = document.getElementById("reportChart").getContext("2d");

    reportChart = new Chart(ctx, {
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
  }

 
  $("#highlightBtn").click(function () {
    $("#attendanceTable tbody tr").each(function () {
      let abs = parseInt($(this).find(".absences").text());
      if (abs < 3) {
        $(this).animate({ backgroundColor: "#9cfd9c" }, 800);
      }
    });
  });

  
  $("#resetBtn").click(function () {
    $("#attendanceTable tbody tr").removeClass("green yellow red");
    $("#attendanceTable tbody tr").css("background-color", "");
  });

  
  $("#searchName").on("keyup", function () {
    let value = $(this).val().toLowerCase();

    $("#attendanceTable tbody tr").filter(function () {
      let last = $(this).find("td:nth-child(1)").text().toLowerCase();
      let first = $(this).find("td:nth-child(2)").text().toLowerCase();

      $(this).toggle(
        last.includes(value) || first.includes(value)
      );
    });
  });

  
  $("#sortAbs").click(function () {
    let rows = $("#attendanceTable tbody tr").get();

    rows.sort(function (a, b) {
      let A = parseInt($(a).find(".absences").text()) || 0;
      let B = parseInt($(b).find(".absences").text()) || 0;
      return A - B;
    });

    $.each(rows, function (_, row) {
      $("#attendanceTable tbody").append(row);
    });

    $("#sortMessage").text("Currently sorted by absences (ascending)");
  });

  
  $("#sortPart").click(function () {
    let rows = $("#attendanceTable tbody tr").get();

    rows.sort(function (a, b) {
      let A = parseInt($(a).find(".participations").text()) || 0;
      let B = parseInt($(b).find(".participations").text()) || 0;
      return B - A;
    });

    $.each(rows, function (_, row) {
      $("#attendanceTable tbody").append(row);
    });

    $("#sortMessage").text("Currently sorted by participation (descending)");
  });

});
