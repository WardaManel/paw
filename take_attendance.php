<?php
$date = date("Y-m-d");
$attendanceFile = "attendance_$date.json";
$studentsFile = "students.json";

// If submitted -> save attendance
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    if (file_exists($attendanceFile)) {
        die("❌ Attendance for today has already been taken.");
    }

    $attendance = [];

    foreach ($_POST["status"] as $student_id => $status) {
        $attendance[] = [
            "student_id" => $student_id,
            "status" => $status
        ];
    }

    file_put_contents($attendanceFile, json_encode($attendance, JSON_PRETTY_PRINT));

    echo "<h2>✅ Attendance saved for $date!</h2>";
    exit;
}

// Load students for display
if (!file_exists($studentsFile)) {
    die("❌ No students found!");
}

$students = json_decode(file_get_contents($studentsFile), true);

?>

<h1>Take Attendance – <?php echo $date; ?></h1>

<form method="POST">
<table border="1" cellpadding="8">
<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Group</th>
    <th>Status</th>
</tr>

<?php foreach ($students as $s): ?>
<tr>
    <td><?= $s["student_id"] ?></td>
    <td><?= $s["name"] ?></td>
    <td><?= $s["group"] ?></td>
    <td>
        <label><input type="radio" name="status[<?= $s["student_id"] ?>]" value="present" required> Present</label>
        <label><input type="radio" name="status[<?= $s["student_id"] ?>]" value="absent" required> Absent</label>
    </td>
</tr>
<?php endforeach; ?>

</table>
<br>
<input type="submit" value="Save Attendance">
</form>
