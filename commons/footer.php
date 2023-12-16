<!-- ======= Footer ======= -->
<footer id="footer" class="footer">
    <div class="copyright">
        &copy; Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
    </div>
    <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
    </div>
</footer><!-- End Footer -->

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->
<script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/vendor/chart.js/chart.umd.js"></script>
<script src="assets/vendor/echarts/echarts.min.js"></script>
<script src="assets/vendor/quill/quill.min.js"></script>
<script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
<script src="assets/vendor/tinymce/tinymce.min.js"></script>
<script src="assets/vendor/php-email-form/validate.js"></script>
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/form_requests.js"></script>
<script src="assets/js/custom_script.js"></script>

<!-- Sweet Alert 2 JS-->
<script src="assets/js/sweet_alerts.js"></script>

<!-- Template Main JS File -->
<script src="assets/js/main.js"></script>
<script>
    //setInterval(checkNewEntry, 5000);
    
    checkNewEntry();
    checkNewExit();
    function checkForInData() {
        // Replace 'your_csv_file.csv' with the path to your CSV file
        var csvFilePath = 'in.csv';

        var lastModified = 0;

        function fetchData() {
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', csvFilePath, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var currentModified = Date.parse(xhr.getResponseHeader('Last-Modified'));
                        if (currentModified > lastModified) {
                            lastModified = currentModified;
                            checkNewEntry();
                        }
                    }
                }
            };
            xhr.send();
        }

        setInterval(fetchData, 5000); // Check for updates every 5 seconds (5000 milliseconds)
    }

    function checkForOutData() {
        // Replace 'your_csv_file.csv' with the path to your CSV file
        var csvFilePath = 'out.csv';

        var lastModified = 0;

        function fetchData() {
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', csvFilePath, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var currentModified = Date.parse(xhr.getResponseHeader('Last-Modified'));
                        if (currentModified > lastModified) {
                            lastModified = currentModified;
                            checkNewExit();
                        }
                    }
                }
            };
            xhr.send();
        }

        setInterval(fetchData, 5000); // Check for updates every 5 seconds (5000 milliseconds)
    }
    
    
    setTimeout(checkForInData, 10000);
    setTimeout(checkForOutData, 10000);
</script>

</body>

</html>