<?php
session_start();
if (!((isset($_SESSION['admin']) && $_SESSION['admin'] == "True") ||
    ((isset($_SESSION['user']) && $_SESSION['user'] == "True")))) {
    echo "<script>window.location.replace('login.php')</script>";
}
if ((isset($_GET['get_data']) && $_GET['get_data'] === 'Get Data')){
    $startDate = $_GET['start_date'];
    $endDate = $_GET['end_date'];
    $formatedStartDate = date("d-m-Y", strtotime($startDate));
    $formatedEndDate = date("d-m-Y", strtotime($endDate));
}
?>
<?php
$pageTile = "Charts";
require_once "commons/head.php";
?>
    <!-- ======= Header ======= -->
<?php require_once "commons/header.php"; ?>

    <main id="main" class="main">

        <div class="pagetitle">
            <h1><?php echo $pageTile ?></h1>
        </div><!-- End Page Title -->
        <?php
        if (!(isset($_GET['get_data']) && $_GET['get_data'] === 'Get Data')):
            ?>
            <section class="section dashboard">
                <div class="row">
                    <!-- Left side columns -->
                    <div class="col-lg-8">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Line Chart</h5>
                                        <form action="" method="get" onsubmit="return validateDates()">
                                            <div class="row">
                                                <div class="col-md-4 mb-3">
                                                    <label for="startDate">Start Date:</label>
                                                    <input type="date" class="form-control datepicker" id="startDate" required
                                                           placeholder="Select start date" name="start_date">
                                                </div>
                                                <div class="col-md-4 mb-3">
                                                    <label for="endDate">End Date:</label>
                                                    <input type="date" class="form-control datepicker" id="endDate" required
                                                           placeholder="Select end date" name="end_date">
                                                </div>
                                                <div class="col-md-4 mb-3">
                                                    <label for="endDate">&nbsp;</label>
                                                    <input type="submit" class="form-control btn btn-success"
                                                           id="endDate" value="Get Data" name="get_data">
                                                </div>
                                            </div>
                                        </form>

                                        <!-- Line Chart -->
                                        <canvas id="lineChart" style="max-height: 400px;"></canvas>

                                        <!-- End Line CHart -->

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- End Left side columns -->

                    <!-- Right side columns -->

                </div>
            </section>
        <?php endif; ?>

        <?php
        if ((isset($_GET['get_data']) && $_GET['get_data'] === 'Get Data')):
            ?>
            <section class="section dashboard">
                <div class="row">

                    <!-- Left side columns -->
                    <div class="col-lg-8">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">Line Chart <?php echo "(From $formatedStartDate To $formatedEndDate)"?></h5>
                                        <form action="" method="get" onsubmit="return validateDates()">
                                            <div class="row">
                                                <div class="col-md-4 mb-3">
                                                    <label for="startDate">Start Date:</label>
                                                    <input type="date" class="form-control datepicker" id="startDate" required
                                                           placeholder="Select start date" name="start_date" value="<?php echo $startDate?>">
                                                </div>
                                                <div class="col-md-4 mb-3">
                                                    <label for="endDate">End Date:</label>
                                                    <input type="date" class="form-control datepicker" id="endDate" required
                                                           placeholder="Select end date" name="end_date" value="<?php echo $endDate?>">
                                                </div>
                                                <div class="col-md-4 mb-3">
                                                    <label for="endDate">&nbsp;</label>
                                                    <input type="submit" class="form-control btn btn-success"
                                                           id="endDate" value="Get Data" name="get_data">
                                                </div>
                                            </div>
                                        </form>

                                        <!-- Line Chart -->
                                        <canvas id="lineChartRange" style="max-height: 400px;"></canvas>

                                        <!-- End Line CHart -->

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- End Left side columns -->

                    <!-- Right side columns -->

                </div>
            </section>
        <?php endif; ?>
    </main><!-- End #main -->

    <!-- ======= Footer ======= -->
<?php require_once "commons/footer.php"; ?>
<script>
    document.addEventListener("DOMContentLoaded", () => {
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;

    var dateArray = new Array();
    var fareArray = new Array();
    var valuesArray;
    var valuesDate;
    var formData = new FormData();
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    $.ajax({
    url: "admin/ajax_process.php?action=get_chart_data_range",
    type: 'POST',
    contentType: false,
    processData: false,
    data: formData
    }).done(function (data) {

    for(let i = 0; i < data.length; i++){
    dateArray.push(data[i].transaction_date);
    fareArray.push(data[i].total_fare);
    }
    valuesArray = Object.values(fareArray);
    valuesDate = Object.values(dateArray);
    new Chart(document.querySelector('#lineChartRange'), {
    type: 'line',
    data: {
    labels: dateArray,
    datasets: [{
    label: 'Line Chart',
    data: fareArray,
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
    }]
    },
    options: {
    scales: {
    y: {
    beginAtZero: true
    }
    }
    }
    });
    });
    });

    document.addEventListener("DOMContentLoaded", () => {
var dateArray = new Array();
var fareArray = new Array();
var valuesArray;
var valuesDate;
$.ajax({
            url: "admin/ajax_process.php?action=get_chart_data",
            type: 'POST',
            contentType: false,
            processData: false,
        }).done(function (data) {

            for(let i = 0; i < data.length; i++){
                dateArray.push(data[i].transaction_date);
                fareArray.push(data[i].total_fare);
                }
            valuesArray = Object.values(fareArray);
            valuesDate = Object.values(dateArray);


      new Chart(document.querySelector('#lineChart'), {
        type: 'line',
        data: {
          labels: dateArray,
          datasets: [{
            label: 'Line Chart',
            data: fareArray,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
 });
 });
</script>
