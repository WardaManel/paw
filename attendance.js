$(document).ready(function() {
  $("table tbody tr").hover(
    function() { $(this).css("background-color", "#fef397"); },
    function() { $(this).css("background-color", ""); }
  );

  $("table tbody").on("click", "tr", function() {
    let name = $(this).find("td:nth-child(2)").text();
    let absences = $(this).find("td:nth-child(5)").text();
    alert("👤 " + name + " has " + absences + " absences.");
  });
});
$("#highlightBtn").click(function() {
  $("table tbody tr").each(function() {
    let absences = parseInt($(this).find("td:nth-child(5)").text());
    if (absences < 3) {
      $(this).animate({ backgroundColor: "#9cfd9c" }, 800);
    }
  });
});

$("#resetBtn").click(function() {
  $("table tbody tr").animate({ backgroundColor: "#fff" }, 500);
});
