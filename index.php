<?php
session_start();

if( !(isset($_SESSION['admin']) && $_SESSION['admin'] == "True") &&
    !(isset($_SESSION['staff']) && $_SESSION['staff'] == "True")){
    echo "<script>window.location.replace('login.php')</script>";
}
?>
<?php
$pageTile = "Home Page";
require_once "commons/head.php";
$totalParkedCars = getTotalParkedCars($conn);
?>
  <!-- ======= Header ======= -->
<?php require_once "commons/header.php";?>

  <main id="main" class="main">

    <div class="pagetitle">
      <h1><?php echo $pageTile?></h1>
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

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <?php require_once "commons/footer.php";?>