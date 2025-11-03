$(document).ready(function() {
  // Hover effect
  $("table tbody tr").hover(
    function() { $(this).css("background-color", "#fef397"); },
    function() { $(this).css("background-color", ""); }
  );

  // When clicking a row → show absences in alert
  $("table tbody").on("click", "tr", function() {
    let name = $(this).find("td:nth-child(1)").text() + " " + $(this).find("td:nth-child(2)").text();
    let absences = $(this).find("td:nth-last-child(3)").text();
    alert("👤 " + name + " has " + absences + " absences.");
  });

  // ✅ Count absences & participations
  $("#showReport").click(function() {
    $("table tbody tr").each(function() {
      let checkboxes = $(this).find("input[type='checkbox']");
      let absences = 0;
      let participations = 0;

      checkboxes.each(function() {
        if ($(this).is(":checked")) participations++;
        else absences++;
      });

      $(this).find("td:nth-last-child(3)").text(absences);
      $(this).find("td:nth-last-child(2)").text(participations);

      // Message logic
      let message = "";
      if (absences >= 5) {
        $(this).css("background-color", "#ff6b6b");
        message = "❌ Excluded – too many absences – You need to participate more";
      } else if (absences >= 3) {
        $(this).css("background-color", "#fff475");
        message = "⚠️ Warning – attendance low – You need to participate more";
      } else {
        $(this).css("background-color", "#a6f3a6");
        message = "✅ Good attendance – Excellent participation";
      }

      $(this).find("td:last").text(message);
    });
  });

  // Highlight excellent students
  $("#highlightBtn").click(function() {
    $("table tbody tr").each(function() {
      let absences = parseInt($(this).find("td:nth-last-child(3)").text());
      if (absences < 3) {
        $(this).animate({ backgroundColor: "#9cfd9c" }, 800);
      }
    });
  });

  // Reset table colors
  $("#resetBtn").click(function() {
    $("table tbody tr").animate({ backgroundColor: "#fff" }, 500);
    $("table tbody tr td:last").text("");
  });
});
