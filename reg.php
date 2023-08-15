<?php
$student_id=$_POST['student_id'];
$fname=$_POST['fname'];
$lname=$_POST['lname'];
$dob=$_POST['dob'];
$email=$_POST['email'];
$phone_no=$_POST['phone_no'];
if(!empty($student_id) || !empty($fname) || !empty($lname) || !empty($dob) || !empty($email) || !empty($phone_no)){
    $host="localhost";
    $dbusername="root";
    $dbpassword="";
    $dbname="dbms";

$conn=new mysqli($host,$dbusername,$dbpassword,$dbname);
    if(mysqli_connect_error()){
        die('COnnect Error('.
            mysqli_connect_errno().')'
            . mysqli_connect_error());
    }
    else{
        $SELECT ="SELECT email From registration Where email=? Limit 1";
        $INSERT="INSERT Into registration(student_id,fname,lname,dob,email,phone_no) values(?,?,?,?,?,?)";

        $stmt= $conn->prepare($SELECT);
        $stmt->bind_param("s",$email);
        $stmt->execute();
        $stmt->bind_result($email);
        $stmt->store_result();
        $rnum = $stmt->num_rows;

        if ($rnum==0) {
            $stmt->close();
            $stmt = $conn->prepare($INSERT);
            $dob_formatted = date("Y-m-d", strtotime($dob));
            $stmt->bind_param("ssssss", $student_id,$fname,$lname,$dob_formatted,$email,$phone_no);
            $stmt->execute();
            echo "New record inserted sucessfully";
            header("Location:reg.html");
           } else {
            echo "Someone already register using this email";
           }
           $stmt->close();
           $conn->close();
          }
      } else {
       echo "All field are required";
       die();
      }
      ?>