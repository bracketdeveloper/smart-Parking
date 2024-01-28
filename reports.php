<?php
session_start();

?>
<?php
$pageTile = "Reports";
require_once "commons/head.php";
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
                                    <h5 class="card-title">Report Between Dates</h5>
                                    <button class="btn btn-success" onclick="showReportBetweenDateSection()">Click Here</button>

                                </div>

                            </div>
                        </div>
                        <div class="col-xxl-4 col-md-6">
                            <div class="card info-card sales-card">

                                <div class="card-body">
                                    <h5 class="card-title">Report of Specific Date</h5>
                                    <button class="btn btn-success" onclick="showReportSpecificDateSection()">Click Here</button>
                                </div>

                            </div>
                        </div>

                        <div class="col-xxl-4 col-md-6">
                            <div class="card info-card sales-card">

                                <div class="card-body">
                                    <h5 class="card-title">Report of specific Car &nbsp;</h5>
                                    <button class="btn btn-success" onclick="showReportSpecificCarSection()">Click Here</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div><!-- End Left side columns -->

                <!-- Right side columns -->

            </div>
        </section>

        <section class="section dashboard" id="section-date-range">
            <div class="row">
                <!-- Left side columns -->
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Report between two date</h5>
                                    <form action="" method="get" onsubmit="return validateDates()">
                                        <div class="row">
                                            <div class="col-md-4 mb-3">
                                                <label for="startDate">Start Date:</label>
                                                <input type="date" class="form-control datepicker" id="startDate"
                                                       required
                                                       placeholder="Select start date"/>
                                            </div>
                                            <div class="col-md-4 mb-3">
                                                <label for="endDate">End Date:</label>
                                                <input type="date" class="form-control datepicker" id="endDate" required
                                                       placeholder="Select end date"/>
                                            </div>
                                            <div class="col-md-4 mb-3">
                                                <label for="endDate">&nbsp;</label>
                                                <input type="submit" class="form-control btn btn-success"
                                                       id="btn-generate-range-date-report" value="Generate Report" onclick="return generateReportDateRange()">
                                            </div>
                                        </div>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- End Left side columns -->

                <!-- Right side columns -->

            </div>
        </section>

        <section class="section dashboard hidden-section" id="section-specific-date" >
            <div class="row">
                <!-- Left side columns -->
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Report of specific date</h5>
                                    <form action="" method="get" onsubmit="return validateDates()">
                                        <div class="row">
                                            <div class="col-md-4 mb-3">
                                                <label for="startDate">Select Date:</label>
                                                <input type="date" class="form-control" id="report-date"
                                                       required>
                                            </div>
                                            <div class="col-md-4 mb-3">
                                                <label for="endDate">&nbsp;</label>
                                                <input type="submit" class="form-control btn btn-success"
                                                       id="btn-generate-specific-date-report" value="Generate Report" onclick="return generateReportSpecificDate()">
                                            </div>
                                        </div>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- End Left side columns -->

                <!-- Right side columns -->

            </div>
        </section>

        <section class="section dashboard hidden-section" id="section-specific-car">
            <div class="row">
                <!-- Left side columns -->
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Report of specific car</h5>
                                    <form action="" method="get" onsubmit="return validateDates()">
                                        <div class="row">
                                            <div class="col-md-4 mb-3">
                                                <label for="startDate">Enter Car Reg: </label>
                                                <input type="text" class="form-control" id="car-reg"
                                                       required
                                                       placeholder="Enter Car Reg">
                                            </div>
                                            <div class="col-md-4 mb-3">
                                                <label for="endDate">&nbsp;</label>
                                                <input type="submit" class="form-control btn btn-success"
                                                       id="btn-generate-specific-car-report" value="Generate Report" onclick="return generateReportSpecificCar()">
                                            </div>
                                        </div>
                                    </form>


                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- End Left side columns -->

                <!-- Right side columns -->

            </div>
        </section>

    </main><!-- End #main -->

    <!-- ======= Footer ======= -->
<?php require_once "commons/footer.php"; ?>