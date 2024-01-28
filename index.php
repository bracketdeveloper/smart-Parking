<?php
session_start();

if (!(isset($_SESSION['admin']) && $_SESSION['admin'] == "True") &&
    !(isset($_SESSION['staff']) && $_SESSION['staff'] == "True")) {
    echo "<script>window.location.replace('login.php')</script>";
}
?>
<?php
$pageTile = "Home Page";
require_once "commons/head.php";
$totalParkedCars = getTotalParkedCars($conn);
$blackListCars = getAllBlackListCars($conn);
$allEmergencyAlerts = getAllEmergencyAlerts($conn);
$staffMembers = getAllStaffMembers($conn);
?>
    <!-- ======= Header ======= -->
<?php require_once "commons/header.php"; ?>

    <main id="main" class="main">

        <div class="pagetitle">
            <h1><?php echo $pageTile ?></h1>
        </div><!-- End Page Title -->

        <section class="section dashboard">
            <div class="row">

                <!-- Left side columns -->
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-xxl-4 col-md-6">
                            <div class="card info-card sales-card">

                                <div class="card-body">
                                    <h5 class="card-title">Total Parked Cars</h5>

                                    <div class="d-flex align-items-center">
                                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i class="bi bi-car-front-fill"></i>
                                        </div>
                                        <div class="ps-3">
                                            <h6><?php echo sizeof($totalParkedCars); ?></h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-xxl-4 col-md-6">
                            <div class="card info-card sales-card">

                                <div class="card-body">
                                    <h5 class="card-title">Empty Spaces</h5>

                                    <div class="d-flex align-items-center">
                                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                            <i class="bi bi-car-front"></i>
                                        </div>
                                        <div class="ps-3">
                                            <h6><?php echo $_SESSION['parking_capacity'] - sizeof($totalParkedCars) ?></h6>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div><!-- End Left side columns -->

            </div>
        </section>

        <section class="section dashboard">
            <div class="row">
                <div class="col-lg-6">

                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Black List Cars</h4>

                            <!-- Table with stripped rows -->
                            <table class="table datatable">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Car Reg</th>
                                    <th scope="col">Reason</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                $i = 0;
                                foreach ($blackListCars as $blackListCar):
                                    $i++;
                                    ?>
                                    <tr>
                                        <th scope="row"><?php echo $i ?></th>
                                        <td><?php echo $blackListCar['car_reg'] ?></td>
                                        <td><?php echo $blackListCar['reason'] ?></td>
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
                <div class="col-lg-6">

                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Emergency Alerts</h4>

                            <!-- Table with stripped rows -->
                            <table class="table datatable">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Car Reg</th>
                                    <th scope="col">Reason of Alert</th>
                                    <th scope="col">Parking Time</th>
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
                                        $reason = "Black List";
                                    }
                                    $date = date('d-m-Y H:i:s', strtotime($emergencyAlert['date_time']));
                                    $i++;
                                    ?>
                                    <tr>
                                        <th scope="row"><?php echo $i?></th>
                                        <td><?php echo $emergencyAlert['car_reg']?></td>
                                        <td><?php echo $reason?></td>
                                        <td><?php echo $date?></td>
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

        <section class="section dashboard">
            <div class="row">
                <div class="col-lg-6">

                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Parked Cars</h4>

                            <!-- Table with stripped rows -->
                            <table class="table datatable">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Car Reg</th>
                                    <th scope="col">Parking Time</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                $i = 0;
                                foreach ($totalParkedCars as $parkedCar):
                                    $date = date('d-m-Y H:i:s', strtotime($parkedCar['date_time']));
                                    $i++;
                                    ?>
                                    <tr>
                                        <th scope="row"><?php echo $i?></th>
                                        <td><?php echo $parkedCar['car_reg']?></td>
                                        <td><?php echo $date?></td>
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
                <div class="col-lg-6">

                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Staff Members</h4>

                            <!-- Table with stripped rows -->
                            <table class="table datatable">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php
                                $i = 0;
                                foreach ($staffMembers as $staffMember):
                                    $i++;
                                    ?>
                                    <tr>
                                        <th scope="row"><?php echo $i?></th>
                                        <td><?php echo $staffMember['staff_name']?></td>
                                        <td><?php echo $staffMember['staff_email']?></td>

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
<?php require_once "commons/footer.php"; ?>