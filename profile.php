<?php
session_start();

if (!(isset($_SESSION['admin']) && $_SESSION['admin'] == "True") &&
    !(isset($_SESSION['staff']) && $_SESSION['staff'] == "True")) {
    echo "<script>window.location.replace('login.php')</script>";
}
?>
<?php
$pageTile = "Profile";
require_once "commons/head.php";
?>
    <!-- ======= Header ======= -->
<?php require_once "commons/header.php"; ?>

    <main id="main" class="main">

        <div class="pagetitle">
            <h1><?php echo $pageTile ?></h1>
        </div><!-- End Page Title -->

        <section class="section profile">
            <div class="row">

                <div class="col-xl-12">

                    <div class="card">
                        <div class="card-body pt-3">
                            <!-- Bordered Tabs -->
                            <ul class="nav nav-tabs nav-tabs-bordered">

                                <li class="nav-item">
                                    <button class="nav-link active" data-bs-toggle="tab"
                                            data-bs-target="#profile-overview">Overview
                                    </button>
                                </li>

                                <li class="nav-item">
                                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit
                                        Profile
                                    </button>
                                </li>

                                <li class="nav-item">
                                    <button class="nav-link" data-bs-toggle="tab"
                                            data-bs-target="#profile-change-password">Change Password
                                    </button>
                                </li>

                                <?php
                                if (isset($_SESSION['admin']) && $_SESSION['admin'] == 'True'):
                                    ?>

                                    <li class="nav-item">
                                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#add-new-staff">
                                            Add New Staff
                                        </button>
                                    </li>
                                <?php
                                endif;
                                ?>

                            </ul>
                            <div class="tab-content pt-2">

                                <div class="tab-pane fade show active profile-overview" id="profile-overview">
                                    <h5 class="card-title">Profile Details</h5>

                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label ">Full Name</div>
                                        <div class="col-lg-9 col-md-8"><?php echo $userName; ?></div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-3 col-md-4 label">Email</div>
                                        <div class="col-lg-9 col-md-8"><?php echo $userEmail; ?></div>
                                    </div>

                                </div>

                                <div class="tab-pane fade profile-edit pt-3" id="profile-edit">

                                    <!-- Profile Edit Form -->
                                    <form>

                                        <div class="row mb-3">
                                            <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full
                                                Name</label>
                                            <div class="col-md-8 col-lg-9">
                                                <input type="text" class="form-control" id="edit-name"
                                                       value="<?php echo $userName; ?>">
                                            </div>
                                        </div>

                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary"
                                                    onclick="return validateEditName(<?php echo $userId; ?>)"
                                                    id="btn-edit-user">Save Changes
                                            </button>
                                        </div>
                                    </form><!-- End Profile Edit Form -->

                                </div>

                                <div class="tab-pane fade pt-3" id="profile-change-password">
                                    <!-- Change Password Form -->

                                    <div class="row mb-3">
                                        <label for="currentPassword" class="col-md-4 col-lg-3 col-form-label">Current
                                            Password</label>
                                        <div class="col-md-8 col-lg-9">
                                            <input type="password" class="form-control" id="current-password">
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New
                                            Password</label>
                                        <div class="col-md-8 col-lg-9">
                                            <input type="password" class="form-control" id="new-password">
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <label for="renewPassword" class="col-md-4 col-lg-3 col-form-label">Confirm
                                            Password</label>
                                        <div class="col-md-8 col-lg-9">
                                            <input type="password" class="form-control" id="confirm-password">
                                        </div>
                                    </div>

                                    <div class="text-center">
                                        <button class="btn btn-primary" id="btn-edit-password"
                                                onclick="return validateEditPassword(<?php echo "'$userId'" . "," . "'$userPassword'"; ?>)">
                                            Change Password
                                        </button>
                                    </div>
                                    <!-- End Change Password Form -->

                                </div>

                                <div class="tab-pane fade profile-edit pt-3" id="add-new-staff">
                                    <h5 class="card-title">Add New Staff Details</h5>
                                    <!-- Profile Edit Form -->

                                        <div class="row mb-3">
                                            <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full
                                                Name</label>
                                            <div class="col-md-8 col-lg-9">
                                                <input type="text" class="form-control" id="new-staff-name">
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Email</label>
                                            <div class="col-md-8 col-lg-9">
                                                <input type="text" class="form-control" id="new-staff-email">
                                            </div>
                                        </div>

                                        <div class="text-center">
                                            <button type="submit" class="btn btn-primary"
                                                    onclick="return validateNewStaff()"
                                                    id="btn-add-new-staff">Add Staff
                                            </button>
                                        </div>

                                </div>

                            </div><!-- End Bordered Tabs -->

                        </div>
                    </div>

                </div>
            </div>
        </section>

    </main><!-- End #main -->

    <!-- ======= Footer ======= -->
<?php require_once "commons/footer.php"; ?>