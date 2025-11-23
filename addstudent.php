<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id = $_POST['studentId'];
    $last = $_POST['lastName'];
    $first = $_POST['firstName'];
    $email = $_POST['email'];

    
    $file = fopen("students.txt", "a");
    fwrite($file, "$id, $last, $first, $email\n");
    fclose($file);

    echo "<h2>Student added successfully!</h2>";
    echo "<a href='addstudent.html'>Go Back</a>";
} 
else {
    echo "Invalid request!";
}
?>
