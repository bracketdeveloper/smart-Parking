<?php
session_start();
if(!(isset($_SESSION['admin']) && $_SESSION['admin'] == "True")){
    echo "<script>window.location.replace('index.php')</script>";
}
?>
<?php
$pageTile = "Staff Members";
require_once "commons/head.php";
$staffMembers = getAllStaffMembers($conn);
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
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
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
                                    <td><a href="edit_staff_member.php?id=<?php echo $staffMember['staff_id'];?>" class="btn btn-success"><i class="bi bi-pen"></i></a></td>
                                    <td><button class="btn btn-danger" onclick="return deleteStaff(<?php echo $staffMember['staff_id'];?>)"><i class="bi bi-trash"></i></button></td>
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