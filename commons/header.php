<?php
if (isset($_GET['action']) && $_GET['action'] == "logout") {
    session_destroy();
    echo "<script>window.location.replace('profile.php');</script>";
}
$userName = "";
if (isset($_SESSION['admin'])) {
    $userId = $_SESSION['admin_id'];
    $userName = $_SESSION['admin_name'];
    $userEmail = $_SESSION['admin_email'];
    $userPassword = $_SESSION['admin_password'];
    $totalCapacity = $_SESSION['parking_capacity'];
}if (isset($_SESSION['staff'])) {
    $userId = $_SESSION['staff_id'];
    $userName = $_SESSION['staff_name'];
    $userEmail = $_SESSION['staff_email'];
    $userPassword = $_SESSION['staff_password'];
    $totalCapacity = $_SESSION['parking_capacity'];
}
$alertStatusCars = getTotalAlertStatusCars($conn);
?>
<!-- ======= Header ======= -->
<header id="header" class="header fixed-top d-flex align-items-center">

    <div class="d-flex align-items-center justify-content-between">
        <a href="index.php" class="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="">
            <span class="d-none d-lg-block">Smart System</span>
        </a>
        <i class="bi bi-list toggle-sidebar-btn"></i>
    </div><!-- End Logo -->

    <div class="search-bar">
        <form class="search-form d-flex align-items-center" method="POST" action="#">
            <input type="text" name="query" placeholder="Search" title="Enter search keyword">
            <button type="submit" title="Search"><i class="bi bi-search"></i></button>
        </form>
    </div><!-- End Search Bar -->

    <nav class="header-nav ms-auto">
        <ul class="d-flex align-items-center">

            <li class="nav-item d-block d-lg-none">
                <a class="nav-link nav-icon search-bar-toggle " href="#">
                    <i class="bi bi-search"></i>
                </a>
            </li><!-- End Search Icon-->

            <li class="nav-item dropdown pe-3">

                <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <span class="d-none d-md-block dropdown-toggle ps-2"><?php echo $userName ?></span>
                </a><!-- End Profile Iamge Icon -->

                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li class="dropdown-header">
                        <h6><?php echo $userName ?></h6>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="profile.php">
                            <i class="bi bi-person"></i>
                            <span>My Profile</span>
                        </a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <li>
                        <a href="#"
                           class="dropdown-item d-flex align-items-center" onclick="return confirmLogout()">
                            <i class="bi bi-box-arrow-right"></i>
                            <span>Sign Out</span>
                        </a>
                    </li>

                </ul><!-- End Profile Dropdown Items -->
            </li><!-- End Profile Nav -->

        </ul>
    </nav><!-- End Icons Navigation -->

</header><!-- End Header -->

<!-- ======= Sidebar ======= -->
<aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

        <li class="nav-item">
            <a class="nav-link " href="index.php">
                <i class="bi bi-grid"></i>
                <span>Dashboard</span>
            </a>
        </li><!-- End Dashboard Nav -->

        <?php
        if (isset($_SESSION['admin']) && $_SESSION['admin'] == 'True'):
        ?>
        <li class="nav-item">
            <a class="nav-link collapsed" href="staff_members.php">
                <i class="bi bi-people"></i>
                <span>Staff Members</span>
            </a>
        </li><!-- End Profile Page Nav -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="black_list_cars.php">
                    <i class="bi bi-car-front"></i>
                    <span>Black List Cars</span>
                </a>
            </li>
        <?php
  endif;
?>
        <li class="nav-item">
            <a class="nav-link collapsed" href="emergency_alerts.php">
                <i class="bi bi-eye-fill"></i>
                <span>Emergency Alerts <span id="alert-number"><?php
                        if(sizeof($alertStatusCars) != 0) {
                            echo (sizeof($alertStatusCars));
                        }?></span></span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="charts.php">
                <i class="bi bi-bar-chart-line"></i>
                <span>Charts</span>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="reports.php">
                <i class="bi bi-envelope-paper"></i>
                <span>Reports</span>
            </a>
        </li>
    </ul>

</aside><!-- End Sidebar-->
