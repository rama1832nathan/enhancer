<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $student_id = $_POST['student_id'];

    // Add your database connection code here
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "dbms";

    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    if (mysqli_connect_error()) {
        die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    } else {
        $SELECT = "SELECT email, student_id FROM registration WHERE email=? AND student_id=? LIMIT 1";

        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("ss", $email, $student_id);
        $stmt->execute();
        $stmt->bind_result($result_email, $result_student_id);
        $stmt->store_result();

        if ($stmt->num_rows == 1) {
            // Login successful, redirect to landing page
            header("Location: home.html");
            exit();
        } else {
            // Login failed, redirect back to the login form
            header("Location: login.html");
            exit();
        }

        $stmt->close();
        $conn->close();
    }
}
?>
