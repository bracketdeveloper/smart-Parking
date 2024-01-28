<?php

require_once "db_connection.php";
require_once "custom_functions.php";
session_start();
if (isset($_GET['action']) && $_GET['action'] == 'login') {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $type = mysqli_real_escape_string($conn, $_POST['type']);
    if ($type == "admin") {
        $loginQuery = "SELECT * FROM `admin` WHERE `admin_email` = '$email' 
                   AND BINARY `admin_password` = '$password'";
        $loginQueryResult = mysqli_query($conn, $loginQuery);
        if (mysqli_num_rows($loginQueryResult) > 0) {
            $row = mysqli_fetch_array($loginQueryResult, MYSQLI_ASSOC);
            $_SESSION['admin'] = 'True';
            $_SESSION["admin_password"] = $row['admin_password'];
            $_SESSION["admin_email"] = $row['admin_email'];
            $_SESSION["admin_name"] = $row['admin_name'];
            $_SESSION["admin_id"] = $row['admin_id'];
            $_SESSION["parking_capacity"] = $row['parking_capacity'];
            $_SESSION["user_type"] = "admin";
            /* login successful code is 1*/
            echo "1";
        } else {
            /* login failed code is 2*/
            echo "2";
        }
    }
    if ($type == "staff") {
        $loginQuery = "SELECT * FROM `staff` WHERE `staff_email` = '$email' 
                   AND BINARY `staff_password` = '$password'";
        $loginQueryResult = mysqli_query($conn, $loginQuery);
        if (mysqli_num_rows($loginQueryResult) > 0) {
            $row = mysqli_fetch_array($loginQueryResult, MYSQLI_ASSOC);
            $_SESSION['staff'] = 'True';
            $_SESSION["staff_password"] = $row['staff_password'];
            $_SESSION["staff_email"] = $row['staff_email'];
            $_SESSION["staff_name"] = $row['staff_name'];
            $_SESSION["staff_id"] = $row['staff_id'];
            $_SESSION["parking_capacity"] = $row['parking_capacity'];
            $_SESSION["user_type"] = "staff";
            /* login successful code is 1*/
            echo "1";
        } else {
            /* login failed code is 2*/
            echo "2";
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'check_new_entry') {

    $leftCapacity = $_SESSION['parking_capacity'] - sizeof(getTotalParkedCars($conn));


    $fileLocation = '../in.csv';
    $data = []; // Create an empty array to store the CSV data

    if (($handle = fopen($fileLocation, 'r')) !== false) {
        while (($row = fgetcsv($handle, 0, ',')) !== false) {
            // $row is an array containing the CSV fields
            $data[] = $row; // Add the row to the data array
        }
        fclose($handle); // Close the CSV file
    }
    $uniqueData = [];

    // Loop through the original array
    foreach ($data as $row) {
        // Serialize each row to create a unique string representation
        $rowStr = serialize($row);

        // Use the serialized row as the key in the associative array
        // This will automatically remove duplicates
        $uniqueData[$rowStr] = $row;
    }

    $totalDataInFile = sizeof($uniqueData) - 1;
    $sql = "SELECT COUNT(*) as total_rows FROM in_data";
    $result = $conn->query($sql);

    if ($result) {
        $row = $result->fetch_assoc();
        $totalDataInDB = $row['total_rows'];
    } else {
        echo "Error: " . $conn->error;
    }
    $timeStamp = [];
    $carReg = [];

    if ($totalDataInFile > $totalDataInDB) {
        if ($leftCapacity == 0) {
            $rows = file($fileLocation);

            // Check if the file is empty
            if (count($rows) !== 0) {
                // Remove the last record (last line)
                array_pop($rows);

                // Write the updated data back to the CSV file
                file_put_contents($fileLocation, implode('', $rows));
            }
            echo "5";
        } else {


            for ($j = 1; $j < sizeof($data); $j++) {
                if (strlen($data[$j][0]) < 11) {
                    continue;
                }
                $timeStamp[] = substr($data[$j][0], 0, 19);
                $carReg[] = $data[$j][1];
            }

            for ($k = $totalDataInDB; $k < sizeof($timeStamp); $k++) {
                if(checkBlackListCar($conn, $carReg[$k]) == 0){
                    insertCarDetailsBlackListAlertInDB($conn, $carReg[$k], $timeStamp[$k]);
                    $result = array(
                        "result_code" => "8", //Open The Barrier
                        "car_reg" => $carReg[$k]
                    );
                    $result = json_encode($result);
                    // Set the response content type
                    header('Content-Type: application/json');
                    echo($result);
                }else{
                    if (checkCarExistance($conn, $carReg[$k]) == 1) :
                        insertCarDetailsInDB($conn, $carReg[$k], $timeStamp[$k]);
                        $result = array(
                            "result_code" => "1", //Open The Barrier
                            "car_reg" => $carReg[$k]
                        );
                        $result = json_encode($result);
                        // Set the response content type
                        header('Content-Type: application/json');
                        echo($result);
                    else :
                        insertCarDetailsWithAlreadyParkedAlertInDB($conn, $carReg[$k], $timeStamp[$k]);
                        $result = array(
                            "result_code" => "7", //Open The Barrier
                            "car_reg" => $carReg[$k]
                        );
                        $result = json_encode($result);
                        // Set the response content type
                        header('Content-Type: application/json');
                        echo($result);
                    endif;
                }

            }
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'check_new_exit') {

    $csvFile = '../out.csv'; // Replace with the path to your CSV file

    $data = []; // Create an empty array to store the CSV data

    if (($handle = fopen($csvFile, 'r')) !== false) {
        while (($row = fgetcsv($handle, 0, ',')) !== false) {
            // $row is an array containing the CSV fields
            $data[] = $row; // Add the row to the data array
        }
        fclose($handle); // Close the CSV file
    }
    $uniqueData = [];

    // Loop through the original array
    foreach ($data as $row) {
        // Serialize each row to create a unique string representation
        $rowStr = serialize($row);

        // Use the serialized row as the key in the associative array
        // This will automatically remove duplicates
        $uniqueData[$rowStr] = $row;
    }

    $totalDataInFile = sizeof($uniqueData) - 1;

    $sql = "SELECT COUNT(*) as total_rows FROM `out_data` WHERE `status` = 'paid'";

    $result = $conn->query($sql);

    if ($result) {
        $row = $result->fetch_assoc();
        $totalDataInDB = $row['total_rows'];
    } else {
        echo "Error: " . $conn->error;
    }
    $timeStamp = [];
    $carReg = [];

    if ($totalDataInFile > $totalDataInDB) {
        for ($j = 1; $j < sizeof($data); $j++) {
            if (strlen($data[$j][0]) < 11) {
                continue;
            }
            $timeStamp[] = substr($data[$j][0], 0, 19);
            $carReg[] = $data[$j][1];
        }

        for ($k = $totalDataInDB; $k < sizeof($timeStamp); $k++) {
            $sql = "SELECT * FROM `out_data` WHERE `car_reg` = '{$carReg[$k]}' AND `status` = 'unpaid'";

            $result = $conn->query($sql);

            if (!$result->num_rows > 0) {
                $sql = "SELECT * FROM `in_data` WHERE `car_reg` = '{$carReg[$k]}' AND `status` = 'parked'";
                $sqlResult = mysqli_query($conn, $sql);
                $data = array();
                if (mysqli_num_rows($sqlResult) > 0) {
                    while ($row = $sqlResult->fetch_assoc()) {
                        $data[] = $row;
                    }
                }
                if($data[0]['alert_status'] == 1){
                    $result = array(
                        "result_code" => "9",
                        "parking_fare" => 0,
                        "car_reg" => $carReg[$k]
                    );
                    $result = json_encode($result);

                    // Set the response content type
                    header('Content-Type: application/json');

                    echo ($result);
                    return;
                }

                if($data[0]['alert_status'] == 2){
                    $result = array(
                        "result_code" => "10",
                        "parking_fare" => 0,
                        "car_reg" => $carReg[$k]
                    );
                    $result = json_encode($result);

                    // Set the response content type
                    header('Content-Type: application/json');

                    echo ($result);
                    return;
                }
                $sqlInsert = "INSERT INTO `out_data` (`car_reg`, `date_time`) VALUES 
                ('{$carReg[$k]}', '{$timeStamp[$k]}')";
                $conn->query($sqlInsert);
            }

            calculateParkingFare($conn, $carReg[$k]);
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'complete_transaction') {
    $carReg = mysqli_real_escape_string($conn, $_POST['car_reg']);
    $parkingFare = mysqli_real_escape_string($conn, $_POST['parking_fare']);

    $sqlUpdate = "UPDATE `in_data` SET `status`='Not Parked' and `alert_status` = '0'
                    WHERE `car_reg` = '{$carReg}' and `status` = 'parked'";
    $conn->query($sqlUpdate);

    $sqlUpdate = "UPDATE `out_data` SET `status`='paid' 
                    WHERE `car_reg` = '{$carReg}' and `status` = 'unpaid'";

    $conn->query($sqlUpdate);

    $result = array(
        "result_code" => "4",
    );
    $result = json_encode($result);

    // Set the response content type
    header('Content-Type: application/json');

    insertFareInDB($conn, $carReg, $parkingFare);
    echo($result);
}

if (isset($_GET['action']) && $_GET['action'] == 'calculate_fare') {

    /* $csvFile = '../out.csv'; // Replace with the path to your CSV file

    $data = []; // Create an empty array to store the CSV data

    if (($handle = fopen($csvFile, 'r')) !== false) {
        while (($row = fgetcsv($handle, 0, ',')) !== false) {
            // $row is an array containing the CSV fields
            $data[] = $row; // Add the row to the data array
        }
        fclose($handle); // Close the CSV file
    }
    $uniqueData = [];

    // Loop through the original array
    foreach ($data as $row) {
        // Serialize each row to create a unique string representation
        $rowStr = serialize($row);

        // Use the serialized row as the key in the associative array
        // This will automatically remove duplicates
        $uniqueData[$rowStr] = $row;
    }

    $totalDataInFile = sizeof($uniqueData) - 1;

    $sql = "SELECT COUNT(*) as total_rows FROM out_data"; // Replace 'your_table' with the table you want to count rows from

    $result = $conn->query($sql);

    if ($result) {
        $row = $result->fetch_assoc();
        $totalDataInDB = $row['total_rows'];
    } else {
        echo "Error: " . $conn->error;
    }
    $timeStamp = [];
    $carReg = [];

    if (true) {

        for ($j = 1; $j < sizeof($data); $j++) {
            if (strlen($data[$j][0]) < 11) {
                continue;
            }
            $timeStamp[] = substr($data[$j][0], 0, 19);
            $carReg[] = $data[$j][1];
        }
        for ($k = 0; $k < sizeof($timeStamp); $k++) {
            // AND `status` = 'parked'
            $inDetailsQuery = "SELECT * FROM `in_data` WHERE `car_reg` = '$carReg[$k]' ";
            $outDetailsQuery = "SELECT * FROM `out_data` WHERE `car_reg` = '$carReg[$k]'";
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
            echo "\n Car Reg: $carReg[$k]\n";
            echo "In time: $inTime\n";
            echo "Out time: $outTime\n";

            $inTime = strtotime($inTime);
            $outTime = strtotime($outTime);
            $totalTime = $outTime - $inTime;
            $totalTime = ceil($totalTime / 3600);

            echo "Total time: $totalTime\n";

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
            echo "Total fare: $parkingFare PKR\n";
        }
    } else {
        echo "Waiting for new data";
    } */
}

if (isset($_GET['action']) && $_GET['action'] == "edit_name") {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $userId = mysqli_real_escape_string($conn, $_POST['user_id']);

    if ($_SESSION['user_type'] == 'admin') {
        $nameUpdateQuery = "UPDATE `admin` SET `admin_name` = '$name' WHERE 
                            `admin_id` = '$userId'";
        $isNameEdit = $conn->query($nameUpdateQuery) === TRUE;

        if ($isNameEdit) {
            /* update successful code is 1*/
            $_SESSION['admin_name'] = $name;
            echo "1";
        } else {
            /* update successful code is 2*/
            echo "2";
        }
    }

    if ($_SESSION['user_type'] == 'staff') {
        $nameUpdateQuery = "UPDATE `staff` SET `staff_name` = '$name' WHERE 
                            `staff_id` = '$userId'";
        $isNameEdit = $conn->query($nameUpdateQuery) === TRUE;

        if ($isNameEdit) {
            /* update successful code is 1*/
            $_SESSION['staff_name'] = $name;
            echo "1";
        } else {
            /* update successful code is 2*/
            echo "2";
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == "edit_parking_capacity") {
    $parkingCapacity = mysqli_real_escape_string($conn, $_POST['parking_capacity']);

    $parkingCapacityUpdateQuery = "UPDATE `admin` SET `parking_capacity` = '$parkingCapacity'";
    $isParkingCapacityEdit = $conn->query($parkingCapacityUpdateQuery) === TRUE;
    $parkingCapacityUpdateQuery = "UPDATE `staff` SET `parking_capacity` = '$parkingCapacity'";
    $isParkingCapacityEdit = $conn->query($parkingCapacityUpdateQuery) === TRUE;

    if ($isParkingCapacityEdit) {
        /* update successful code is 1*/
        $_SESSION['parking_capacity'] = $parkingCapacity;
        echo "1";
    } else {
        /* update successful code is 2*/
        echo "2";
    }
}

if (isset($_GET['action']) && $_GET['action'] == "get_chart_data") {
    $allChartDataQuery = "SELECT DATE_FORMAT(DATE(`time`), '%d-%m-%Y') AS transaction_date, 
       SUM(`parking_fare`) AS total_fare FROM `transactions` GROUP BY DATE(`time`);";
    $allChartDataQueryResult = mysqli_query($conn, $allChartDataQuery);
    $data = array();
    if (mysqli_num_rows($allChartDataQueryResult) > 0) {
        while ($row = $allChartDataQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    $data = json_encode($data);
    header('Content-Type: application/json');
    echo($data);
}

if (isset($_GET['action']) && $_GET['action'] == "get_chart_data_range") {
    $startDate = mysqli_real_escape_string($conn, $_POST['start_date']);
    $endDate = mysqli_real_escape_string($conn, $_POST['end_date']);
    $startDate = date("Y-m-d", strtotime($startDate));
    $endDate = date("Y-m-d", strtotime($endDate));
    $allChartDataQuery = "SELECT DATE_FORMAT(DATE(`time`), '%d-%m-%Y') AS transaction_date, 
       SUM(`parking_fare`) AS total_fare
FROM `transactions`
WHERE DATE(`time`) BETWEEN '$startDate' AND '$endDate'
GROUP BY DATE(`time`);";

    $allChartDataQueryResult = mysqli_query($conn, $allChartDataQuery);
    $data = array();
    if (mysqli_num_rows($allChartDataQueryResult) > 0) {
        while ($row = $allChartDataQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    $data = json_encode($data);
    header('Content-Type: application/json');
    echo($data);
}

if (isset($_GET['action']) && $_GET['action'] == "generate_date_range_report") {
    $startDate = mysqli_real_escape_string($conn, $_POST['start_date']);
    $endDate = mysqli_real_escape_string($conn, $_POST['end_date']);
    $startDate = date("Y-m-d", strtotime($startDate));
    $endDate = date("Y-m-d", strtotime($endDate));
    $allChartDataQuery = "SELECT *
FROM `transactions`
WHERE DATE(`time`) BETWEEN '$startDate' AND '$endDate';";

    $allChartDataQueryResult = mysqli_query($conn, $allChartDataQuery);
    $data = array();
    if (mysqli_num_rows($allChartDataQueryResult) > 0) {
        while ($row = $allChartDataQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    if(sizeof($data) == 0){
        echo "1";
        return;
    }
    $data = json_encode($data);
    header('Content-Type: application/json');
    echo($data);

}

if (isset($_GET['action']) && $_GET['action'] == "generate_specific_date_report") {
    $reportDate = mysqli_real_escape_string($conn, $_POST['report_date']);
    $reportDate = date("Y-m-d", strtotime($reportDate));
    $allChartDataQuery = "SELECT *
FROM `transactions`
WHERE DATE(`time`) LIKE '$reportDate';";
    $allChartDataQueryResult = mysqli_query($conn, $allChartDataQuery);
    $data = array();
    if (mysqli_num_rows($allChartDataQueryResult) > 0) {
        while ($row = $allChartDataQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    if(sizeof($data) == 0){
        echo "1";
        return;
    }
    $data = json_encode($data);
    header('Content-Type: application/json');
    echo($data);

}

if (isset($_GET['action']) && $_GET['action'] == "generate_specific_car_report") {
    $carReg = mysqli_real_escape_string($conn, $_POST['car_reg']);

    $allChartDataQuery = "SELECT *
FROM `transactions`
WHERE `car_reg` = '$carReg';";
    $allChartDataQueryResult = mysqli_query($conn, $allChartDataQuery);
    $data = array();
    if (mysqli_num_rows($allChartDataQueryResult) > 0) {
        while ($row = $allChartDataQueryResult->fetch_assoc()) {
            $data[] = $row;
        }
    }
    if(sizeof($data) == 0){
        echo "1";
        return;
    }
    $data = json_encode($data);
    header('Content-Type: application/json');
    echo($data);

}

if (isset($_GET['action']) && $_GET['action'] == "add_black_list_car") {
    $blackListCar = mysqli_real_escape_string($conn, $_POST['black_list_car']);
    $blackListReason = mysqli_real_escape_string($conn, $_POST['black_list_reason']);

    $checkExistingBlackListCar = "SELECT * FROM `black_list_cars` WHERE `car_reg` = '$blackListCar'";
    $checkExistingBlackListCarResult = mysqli_query($conn, $checkExistingBlackListCar);
    if (mysqli_num_rows($checkExistingBlackListCarResult) > 0) {
        echo "6";
    } else {
        $blackListCarInsertQuery = "INSERT INTO `black_list_cars` (`car_reg`, `reason`) VALUES ('$blackListCar', '$blackListReason')";

        if ($conn->query($blackListCarInsertQuery) === TRUE) {
            /* successful code is 1*/
            echo "1";
        } else {
            /* successful code is 2*/
            echo "2";
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == "edit_black_list_car") {
    $carId = mysqli_real_escape_string($conn, $_POST['car_id']);
    $blackListCar = mysqli_real_escape_string($conn, $_POST['black_list_car']);

    $checkExistingBlackListCar = "SELECT * FROM `black_list_cars` WHERE `car_reg` = '$blackListCar'";
    $checkExistingBlackListCarResult = mysqli_query($conn, $checkExistingBlackListCar);
    if (mysqli_num_rows($checkExistingBlackListCarResult) > 0) {
        echo "6";
    } else {
        $carRegUpdateQuery = "UPDATE `black_list_cars` SET `car_reg` = '$blackListCar' WHERE 
                            `id` = $carId";

        if ($conn->query($carRegUpdateQuery) === TRUE) {
            /* update successful code is 1*/
            echo "1";
        } else {
            /* update successful code is 2*/
            echo "2";
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == "delete_black_list_car") {
    $carId = mysqli_real_escape_string($conn, $_POST['car_id']);

    $blackListCarDeleteQuery = "DELETE FROM `black_list_cars` WHERE `id` = $carId";
    if ($conn->query($blackListCarDeleteQuery) === TRUE) {
        /* successful code is 1*/
        echo "1";
    } else {
        /* successful code is 2*/
        echo "2";
    }
}

if (isset($_GET['action']) && $_GET['action'] == "delete_emergency_alert") {
    $alertId = mysqli_real_escape_string($conn, $_POST['alert_id']);

    $emergencyAlertDeleteQuery = "UPDATE `in_data` SET `status`='Not Parked',`alert_status`='0'WHERE `id` = $alertId";
    if ($conn->query($emergencyAlertDeleteQuery) === TRUE) {
        /* successful code is 1*/
        echo "1";
    } else {
        /* successful code is 2*/
        echo "2";
    }
}

if (isset($_GET['action']) && $_GET['action'] == "delete_staff_member") {
    $staffId = mysqli_real_escape_string($conn, $_POST['staff_id']);

    $stafffDeleteQuery = "DELETE FROM `staff` WHERE `staff_id` = $staffId";
    if ($conn->query($stafffDeleteQuery) === TRUE) {
        /* successful code is 1*/
        echo "1";
    } else {
        /* successful code is 2*/
        echo "2";
    }
}

if (isset($_GET['action']) && $_GET['action'] == "edit_password") {
    $newPassword = mysqli_real_escape_string($conn, $_POST['new_password']);
    $userId = mysqli_real_escape_string($conn, $_POST['user_id']);

    if ($_SESSION['user_type'] == 'admin') {
        $passwordUpdateQuery = "UPDATE `admin` SET `admin_password` = '$newPassword' WHERE 
                            `admin_id` = $userId";
        if ($conn->query($passwordUpdateQuery) === TRUE) {
            /* update successful code is 1*/
            $_SESSION['admin_password'] = $newPassword;
            echo "1";
        } else {
            /* update successful code is 2*/
            echo "2";
        }
    }

    if ($_SESSION['user_type'] == 'staff') {
        $passwordUpdateQuery = "UPDATE `staff` SET `staff_password` = '$newPassword' WHERE 
                            `staff_id` = $userId";
        if ($conn->query($passwordUpdateQuery) === TRUE) {
            /* update successful code is 1*/
            $_SESSION['staff_password'] = $newPassword;
            echo "1";
        } else {
            /* update successful code is 2*/
            echo "2";
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == "add_new_staff") {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $password = '';
    $chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for ($i = 0; $i < 6; $i++) {
        $index = rand(0, strlen($chars) - 1);
        $password .= $chars[$index];
    }

    $checkExistingEmail = "SELECT * FROM `staff` WHERE `staff_email` = '$email'";
    $checkExistingEmailResult = mysqli_query($conn, $checkExistingEmail);
    if (mysqli_num_rows($checkExistingEmailResult) > 0) {
        echo "3";
    } else {
        $newStaffInsertQuery = "INSERT INTO `staff`( `staff_name`, `staff_email`, `staff_password`) 
                                VALUES ('$name', '$email', '$password')";

        if ($conn->query($newStaffInsertQuery) === TRUE) {
            sendEmail($email, $name, $password);
            /* successful code is 1*/
            echo "1";
        } else {
            /* successful code is 2*/
            echo "2";
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == 'recover_password') {
    $recoverEmail = mysqli_real_escape_string($conn, $_POST['recover_email']);
    $recoverType = mysqli_real_escape_string($conn, $_POST['recover_type']);

    if ($recoverType == 'admin') {
        $checkEmailQuery = "SELECT * FROM `admin` WHERE `admin_email` = '$recoverEmail'";
        $checkEmailQueryResult = mysqli_query($conn, $checkEmailQuery);
        if (mysqli_num_rows($checkEmailQueryResult) > 0) {
            $row = mysqli_fetch_array($checkEmailQueryResult, MYSQLI_ASSOC);
            $password = $row['admin_password'];
            $name = $row['admin_name'];
            /* login successful code is 1*/
            echo "1";
        } else {
            /* login failed code is 2*/
            echo "2";
        }
    }

    if ($recoverType == 'staff') {
        $checkEmailQuery = "SELECT * FROM `staff` WHERE `staff_email` = '$recoverEmail'";
        $checkEmailQueryResult = mysqli_query($conn, $checkEmailQuery);
        if (mysqli_num_rows($checkEmailQueryResult) > 0) {
            $row = mysqli_fetch_array($checkEmailQueryResult, MYSQLI_ASSOC);
            $password = $row['staff_password'];
            $name = $row['staff_name'];
            /* login successful code is 1*/
            echo "1";
        } else {
            /* login failed code is 2*/
            echo "2";
        }
    }
}

if (isset($_GET['action']) && $_GET['action'] == "edit_data") {
    $dataID = mysqli_real_escape_string($conn, $_POST['data_id']);
    $height = mysqli_real_escape_string($conn, $_POST['height']);
    $weight = mysqli_real_escape_string($conn, $_POST['weight']);
    $sprint10Meter = mysqli_real_escape_string($conn, $_POST['sprint_10_meter']);
    $sprint20Meter = mysqli_real_escape_string($conn, $_POST['sprint_20_meter']);
    $sprint50Meter = mysqli_real_escape_string($conn, $_POST['sprint_50_meter']);
    $dribbleCourse = mysqli_real_escape_string($conn, $_POST['dribble_course']);
    $dribbleCourseMain = mysqli_real_escape_string($conn, $_POST['dribble_course_main']);
    $dribbleCourseOff = mysqli_real_escape_string($conn, $_POST['dribble_course_off']);
    $longBallPrecision = mysqli_real_escape_string($conn, $_POST['long_ball_precision']);
    $flexibility = mysqli_real_escape_string($conn, $_POST['flexibility']);
    $jumpStanding = mysqli_real_escape_string($conn, $_POST['jump_standing']);
    $jumpRunning = mysqli_real_escape_string($conn, $_POST['jump_running']);
    $strength = mysqli_real_escape_string($conn, $_POST['strength']);
    $endurance = mysqli_real_escape_string($conn, $_POST['endurance']);
    $technique = mysqli_real_escape_string($conn, $_POST['technique']);
    $determination = mysqli_real_escape_string($conn, $_POST['determination']);
    $tacticalSense = mysqli_real_escape_string($conn, $_POST['tactical_sense']);
    $agility = mysqli_real_escape_string($conn, $_POST['agility']);
    $reflexHand = mysqli_real_escape_string($conn, $_POST['reflex_hand']);
    $reflexLeg = mysqli_real_escape_string($conn, $_POST['reflex_leg']);

    $newPlayerDataUpdateQuery = "UPDATE `players_data` SET `player_height`='$height',`player_weight`='$weight',
                             `player_sprint_10`='$sprint10Meter',`player_sprint_20`='$sprint20Meter',
                             `player_sprint_50`='$sprint50Meter',`player_dribble_course`='$dribbleCourse',
                             `player_dribble_course_main`='$dribbleCourseMain',
                             `player_dribble_course_off`='$dribbleCourseOff',
                             `player_long_ball_precision`='$longBallPrecision',
                             `player_flexibility`='$flexibility',`player_jump_standing`='$jumpStanding',
                             `player_jump_running`='$jumpRunning',`player_strength`='$strength',
                             `player_endurance`='$endurance',`player_technique`='$technique',
                             `player_determination`='$determination',`player_tactical_sense`='$tacticalSense',
                             `player_agility`='$agility',`player_reflex_hand`='$reflexHand',
                             `player_reflex_leg`='$reflexLeg' WHERE `player_data_id` = '$dataID' ";

    if ($conn->query($newPlayerDataUpdateQuery) === TRUE) {
        /* successful code is 1*/
        echo "1";
    } else {
        /* successful code is 2*/
        echo "2";
    }
}

function getUserId()
{
    $token = "";
    $codeUpperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $maxUpper = strlen($codeUpperAlphabet);
    $codeNumbers = "0123456789";
    $maxNumber = strlen($codeNumbers);
    for ($i = 0; $i < 3; $i++) {
        $token .= $codeUpperAlphabet[rand(0, 25)];
    }

    for ($i = 0; $i < 3; $i++) {
        $token .= $codeNumbers[rand(0, 9)];
    }
    for ($i = 0; $i < 2; $i++) {
        $token .= $codeUpperAlphabet[rand(0, 25)];
    }
    for ($i = 0; $i < 2; $i++) {
        $token .= $codeNumbers[rand(0, 9)];
    }

    return $token;
}
