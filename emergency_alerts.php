<?php
session_start();
if(!((isset($_SESSION['admin']) && $_SESSION['admin'] == "True") ||
    ((isset($_SESSION['user']) && $_SESSION['user'] == "True")))){
    echo "<script>window.location.replace('login.php')</script>";
}
?>
<?php
$pageTile = "Empty Page";
require_once "commons/head.php";
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

          </div>
        </div><!-- End Left side columns -->

        <!-- Right side columns -->

      </div>
    </section>

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <?php require_once "commons/footer.php";?>