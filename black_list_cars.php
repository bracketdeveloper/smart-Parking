<?php
session_start();
if(!(isset($_SESSION['admin']) && $_SESSION['admin'] == "True")){
    echo "<script>window.location.replace('index.php')</script>";
}
?>
<?php
$pageTile = "Black List Cars";
require_once "commons/head.php";
$blackListCars = getAllBlackListCars($conn);
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
                                <th scope="col">Reason</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php
                            $i = 0;
                            foreach ($blackListCars as $blackListCar):
                                $i++;
                                ?>
                                <tr>
                                    <th scope="row"><?php echo $i?></th>
                                    <td><?php echo $blackListCar['car_reg']?></td>
                                    <td><?php echo $blackListCar['reason']?></td>
                                    <td><a href="edit_black_list_car.php?id=<?php echo $blackListCar['id'];?>" class="btn btn-success"><i class="bi bi-pen"></i></a></td>
                                    <td><button class="btn btn-danger" onclick="return deleteCar(<?php echo $blackListCar['id'];?>)"><i class="bi bi-trash"></i></button></td>
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