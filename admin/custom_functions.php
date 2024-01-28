<?php
/* password and username email function */
function emailUsernameAndPassword($username, $password, $toEmail)
{
    $subject = "Your Request for VUK Admin Credentials";
    $body = "
    Respected Sir!
    We received a request for your admin credentials so the details are below 
    Username: $username
    Password: $password";

    $headers = "Reply-To: VUK DEVELOPMENT SYSTEM <contact@bracketdeveloper.com>\r\n";
    $headers .= "Return-Path: VUK DEVELOPMENT SYSTEM <contact@bracketdeveloper.com>\r\n";
    $headers .= "From: VUK DEVELOPMENT SYSTEM <contact@bracketdeveloper.com>\r\n";
    $headers .= "Organization: VUK DEVELOPMENT SYSTEM\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
    $headers .= "X-Priority: 3\r\n";
    $headers .= "X-Mailer: PHP" . phpversion() . "\r\n";

    $result = mail($toEmail, $subject, $body, $headers);
}

/* get all staff members function*/
function getAllStaffMembers($conn)
{
    $allStaffMembersQuery = "SELECT * FROM `staff`";
    $allStaffMembersQueryResult = mysqli_query($conn, $allStaffMembersQuery);
    $data = array();
    if (mysqli_num_rows($allStaffMembersQueryResult) > 0) {
        while ($row = $allStaffMembersQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}

/* get all black lsit cars function*/
function getAllBlackListCars($conn)
{
    $allBlackListCarsQuery = "SELECT * FROM `black_list_cars`";
    $allBlackListCarsQueryResult = mysqli_query($conn, $allBlackListCarsQuery);
    $data = array();
    if (mysqli_num_rows($allBlackListCarsQueryResult) > 0) {
        while ($row = $allBlackListCarsQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}

function getSpecificBlackListCarByReg($conn, $carReg)
{
    $allBlackListCarsQuery = "SELECT * FROM `black_list_cars` WHERE `car_reg` = '$carReg'";
    $allBlackListCarsQueryResult = mysqli_query($conn, $allBlackListCarsQuery);
    $data = array();
    if (mysqli_num_rows($allBlackListCarsQueryResult) > 0) {
        while ($row = $allBlackListCarsQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}


function getAllEmergencyAlerts($conn)
{
    $allEmergencyAlertsQuery = "SELECT * FROM `in_data` WHERE `alert_status` != '0'";
    $allEmergencyAlertsQueryResult = mysqli_query($conn, $allEmergencyAlertsQuery);
    $data = array();
    if (mysqli_num_rows($allEmergencyAlertsQueryResult) > 0) {
        while ($row = $allEmergencyAlertsQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}

function getSpecificBlackListCar($conn, $id)
{
    $allBlackListCarsQuery = "SELECT * FROM `black_list_cars` WHERE `id` = $id";
    $allBlackListCarsQueryResult = mysqli_query($conn, $allBlackListCarsQuery);
    $data = array();
    if (mysqli_num_rows($allBlackListCarsQueryResult) > 0) {
        while ($row = $allBlackListCarsQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}

function getSpecificStaffMember($conn, $id)
{
    $allStaffMembersQuery = "SELECT * FROM `staff` WHERE `staff_id` = $id";
    $allStaffMembersQueryResult = mysqli_query($conn, $allStaffMembersQuery);
    $data = array();
    if (mysqli_num_rows($allStaffMembersQueryResult) > 0) {
        while ($row = $allStaffMembersQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}

/* get admin details by id*/
function getAdminDetailsByID($conn, $adminID)
{
    $adminDetailsQuery = "SELECT * FROM `admin` WHERE `admin_id` = '$adminID'";
    $adminDetailsQueryResult = mysqli_query($conn, $adminDetailsQuery);
    $data = array();
    if (mysqli_num_rows($adminDetailsQueryResult) > 0) {
        $row = mysqli_fetch_array($adminDetailsQueryResult, MYSQLI_ASSOC);
        $data[] = $row;
    }
    return $data;
}

/* Calulate fare of the vehicle */
function calculateParkingFare($conn, $carReg)
{
    $inDetailsQuery = "SELECT * FROM `in_data` WHERE `car_reg` = '$carReg' AND `status` = 'Parked'";
    $outDetailsQuery = "SELECT * FROM `out_data` WHERE `car_reg` = '$carReg' AND `status` = 'unpaid'";
    $inDetailsQueryResult = mysqli_query($conn, $inDetailsQuery);
    $outDetailsQueryResult = mysqli_query($conn, $outDetailsQuery);
    $inTime = null;
    $outTime = null;
    if (mysqli_num_rows($inDetailsQueryResult) > 0) {
        $row = mysqli_fetch_array($inDetailsQueryResult, MYSQLI_ASSOC);
        $inTime = $row['date_time'];
    }
    if (mysqli_num_rows($outDetailsQueryResult) > 0) {
        $row = mysqli_fetch_array($outDetailsQueryResult, MYSQLI_ASSOC);
        $outTime = $row['date_time'];
    }

    $inTime = strtotime($inTime);
    $outTime = strtotime($outTime);
    $totalTime = $outTime - $inTime;
    $totalTime = ceil($totalTime / 3600);

    $fixedRate = 30; // Change this to your desired fixed rate for the first 5 hours

    // Define the rate for each additional hour
    $hourlyRate = 5; // Change this to your desired hourly rate
    // Calculate the parking fee
    if ($totalTime <= 5) {
        $parkingFare = $fixedRate;
    } else {
        // For the first 5 hours, charge the fixed rate
        $parkingFare = $fixedRate;

        // For each additional hour, charge the hourly rate
        $additionalHours = $totalTime - 5;
        $parkingFare += $additionalHours * $hourlyRate;
    }
    $result = array(
        "result_code" => "3",
        "parking_fare" => $parkingFare,
        "car_reg" => $carReg
    );
    $result = json_encode($result);

    // Set the response content type
    header('Content-Type: application/json');

    echo ($result);
}

function insertCarDetailsInDB($conn, $carReg, $time)
{
    $sql = "INSERT INTO `in_data`(`car_reg`, `date_time`) VALUES 
    ('{$carReg}', '{$time}')";
    $conn->query($sql) === TRUE;
}

function insertCarDetailsWithAlreadyParkedAlertInDB($conn, $carReg, $time)
{
    $sql = "INSERT INTO `in_data`(`car_reg`, `date_time`, `alert_status`) VALUES 
    ('{$carReg}', '{$time}', '1')";
    $conn->query($sql) === TRUE;
}

function insertCarDetailsBlackListAlertInDB($conn, $carReg, $time)
{
    $sql = "INSERT INTO `in_data`(`car_reg`, `date_time`, `alert_status`) VALUES 
    ('{$carReg}', '{$time}', '2')";
    $conn->query($sql) === TRUE;
}

function insertFareInDB($conn, $carReg, $parkingFare)
{
    $sqlInsert = "INSERT INTO `transactions`(`car_reg`, `parking_fare`) VALUES 
            ('{$carReg}', '{$parkingFare}')";

    if ($conn->query($sqlInsert) === TRUE) {
    } else {
        echo "Error: " . $sqlInsert . "<br>" . $conn->error;
    }
}

function checkCarExistance($conn, $carReg)
{
    $sql = "SELECT * FROM `in_data` WHERE `car_reg` = '$carReg' AND `status` = 'parked'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        return 0;
    } else {
        return 1;
    }
}

function checkBlackListCar($conn, $carReg)
{
    $sql = "SELECT * FROM `black_list_cars` WHERE `car_reg` = '$carReg'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        return 0;
    } else {
        return 1;
    }
}

function sendEmail($staffEmail, $staffName, $staffPassword)
{
    $toPatient = "$staffEmail";
    $subject = "Welcome to our team!";
    $body = "
    Dear $staffName! 
    
    We are pleased to welcome you to our team at Smart Parking Pro! We're excited to have you on board and we look forward to working with you.

    As a new staff member, you'll need to log in to our system to access your account. Your login credentials are as follows:
    
    Email: $staffEmail
    Password: $staffPassword
    
    We recommend to change your password as soon as you feel comfortable.
    
    Please keep your login information secure and do not share it with anyone. If you have any issues logging in or have any questions, please don't hesitate to contact us.
    
    Again, welcome to the team and we look forward to working with you!
    
    Best regards,
    
    Smart Parking Pro
    
    ";

    $headers = "Reply-To: SmartParkingPro <smartparkingpro@gmail.com>\r\n";
    $headers .= "Return-Path: SmartParkingPro <smartparkingpro@gmail.com>\r\n";
    $headers .= "From: SmartParkingPro <smartparkingpro@gmail.com>\r\n";
    $headers .= "Organization: SmartParkingPro\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
    $headers .= "X-Priority: 3\r\n";
    $headers .= "X-Mailer: PHP" . phpversion() . "\r\n";

    mail($staffEmail, $subject, $body, $headers);
}

function getTotalParkedCars($conn){
    $allStaffMembersQuery = "SELECT * FROM `in_data` WHERE `status` = 'parked'";
    $allStaffMembersQueryResult = mysqli_query($conn, $allStaffMembersQuery);
    $data = array();
    if (mysqli_num_rows($allStaffMembersQueryResult) > 0) {
        while ($row = $allStaffMembersQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}

function getTotalAlertStatusCars($conn){
    $allStaffMembersQuery = "SELECT * FROM `in_data` WHERE `alert_status` != '0'";
    $allStaffMembersQueryResult = mysqli_query($conn, $allStaffMembersQuery);
    $data = array();
    if (mysqli_num_rows($allStaffMembersQueryResult) > 0) {
        while ($row = $allStaffMembersQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return $data;
}
function sendPasswordAsEmail($email, $password, $name)
{
    $subject = "Smart Parking Pro Password Recover.";
    $body = "
    Dear $name! 
    
    We have received a request to reset the password for your account with Smart Parking Pro. 
    
    Following is your password:
    
    Password: $password
    
  
    Please keep your login information secure and do not share it with anyone. 
    If you have any issues logging in or have any questions, please don't hesitate to contact us.
    
    Best regards,
    
    Smart Parking Pro
    
    ";

    $headers = "Reply-To: SmartParkingPro <smartparkingpro@gmail.com>\r\n";
    $headers .= "Return-Path: SmartParkingPro <smartparkingpro@gmail.com>\r\n";
    $headers .= "From: SmartParkingPro <smartparkingpro@gmail.com>\r\n";
    $headers .= "Organization: SmartParkingPro\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
    $headers .= "X-Priority: 3\r\n";
    $headers .= "X-Mailer: PHP" . phpversion() . "\r\n";

    mail($email, $subject, $body, $headers);
}

