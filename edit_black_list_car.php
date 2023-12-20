<?php
session_start();
if(!((isset($_SESSION['admin']) && $_SESSION['admin'] == "True") ||
    ((isset($_SESSION['user']) && $_SESSION['user'] == "True")))){
    echo "<script>window.location.replace('login.php')</script>";
}
if(!isset($_GET['id'])){
    header("Location: index.php");
}
?>
<?php
$pageTile = "Edit Black List Car";
require_once "commons/head.php";
$blackListCar = getSpecificBlackListCar($conn, $_GET['id']);
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
              <?php
              if(sizeof($blackListCar) > 0):
              ?>
              <form>

                  <div class="row mb-3">
                      <label for="Total Capacity" class="col-md-4 col-lg-3 col-form-label">Edit
                          Black List Car</label>
                      <div class="col-md-8 col-lg-9">
                          <input type="text" class="form-control" id="black-list-car"
                          value="<?php echo $blackListCar[0]['car_reg']?>">
                      </div>
                  </div>

                  <div class="text-center">
                      <button type="submit" class="btn btn-primary"
                              onclick="return validateEditBlackListCar(<?php echo $_GET['id']?>)"
                              id="btn-edit-black-list-car">Edit
                      </button>
                  </div>
              </form>

              <?php
                  else:
                  ?>
                  <h4>No data is available in DB</h4>

                  <?php endif;?>
          </div>
        </div><!-- End Left side columns -->

        <!-- Right side columns -->

      </div>
    </section>

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <?php require_once "commons/footer.php";?>