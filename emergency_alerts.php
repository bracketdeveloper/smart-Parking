<?php
session_start();
if(!(isset($_SESSION['admin']) && $_SESSION['admin'] == "True")){
    echo "<script>window.location.replace('index.php')</script>";
}
?>
<?php
$pageTile = "Emergency Alerts";
require_once "commons/head.php";
$allEmergencyAlerts = getAllEmergencyAlerts($conn);
?>
    <!-- ======= Header ======= -->
<?php require_once "commons/header.php";?>

    <main id="main" class="main">

        <div class="pagetitle">
            <h1><?php echo $pageTile?></h1>
        </div><!-- End Page Title -->

        <section class="section dashboard">
            <div class="row">
                <div class="col-lg-12">

                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"></h5>

                            <!-- Table with stripped rows -->
                            <table class="table datatable">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Car Reg</th>
                                    <th scope="col">Reason of Alert</th>
                                    <th scope="col">Parking Time</th>
                                    <th scope="col">Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                $i = 0;
                                foreach ($allEmergencyAlerts as $emergencyAlert):
                                    $reason = "N/A";
                                    if($emergencyAlert['alert_status'] == '1'){
                                        $reason = "Already Parked";
                                    }
                                    if($emergencyAlert['alert_status'] == '2'){
                                        $blackListDetails = getSpecificBlackListCarByReg($conn, $emergencyAlert['car_reg']);

                                        $reason = "Black List ({$blackListDetails[0]['reason']})";
                                    }
                                    $date = date('d-m-Y H:i:s', strtotime($emergencyAlert['date_time']));
                                    $i++;
                                    ?>
                                    <tr>
                                        <th scope="row"><?php echo $i?></th>
                                        <td><?php echo $emergencyAlert['car_reg']?></td>
                                        <td><?php echo $reason?></td>
                                        <td><?php echo $date?></td>
                                        <td><button class="btn btn-danger" onclick="return deleteEmergencyAlert(<?php echo $emergencyAlert['id'];?>)"><i class="bi bi-trash"></i></button></td>
                                    </tr>
                                <?php
                                endforeach;
                                ?>
                                </tbody>
                            </table>
                            <!-- End Table with stripped rows -->

                        </div>
                    </div>

                </div>
            </div>
        </section>

    </main><!-- End #main -->

    <!-- ======= Footer ======= -->
<?php require_once "commons/footer.php";?>