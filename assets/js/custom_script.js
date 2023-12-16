$("#username").keypress(function () {
  const usernameRequiredErrorEl = document.getElementById(
    "username-required-span"
  );

  if (!usernameRequiredErrorEl.hasAttribute("hidden")) {
    usernameRequiredErrorEl.setAttribute("hidden", "");
  }
});

$("#password").keypress(function () {
  const passwordRequiredErrorEl = document.getElementById(
    "password-required-span"
  );

  if (!passwordRequiredErrorEl.hasAttribute("hidden")) {
    passwordRequiredErrorEl.setAttribute("hidden", "");
  }
});

$("#email").keypress(function () {
  const emailRequiredErrorEl = document.getElementById("email-required-span");
  const emailInvalidErrorEl = document.getElementById("email-invalid-span");

  if (!emailRequiredErrorEl.hasAttribute("hidden")) {
    emailRequiredErrorEl.setAttribute("hidden", "");
  }
  if (!emailInvalidErrorEl.hasAttribute("hidden")) {
    emailInvalidErrorEl.setAttribute("hidden", "");
  }
});

function confirmLogout() {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#30d630",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "?action=logout";
    }
  });
  return false;
}

function showHidePassword() {
  var profilePasswordEl = document.getElementById("profile-password");
  var isHide = false;

  if (profilePasswordEl.type === "password") {
    profilePasswordEl.type = "text";
    isHide = false;
  } else {
    profilePasswordEl.type = "password";
    isHide = true;
  }

  const showHidePasswordIconEl = document.getElementById(
    "btn-show-hide-password"
  );
  if (isHide) {
    showHidePasswordIconEl.removeAttribute("class");
    showHidePasswordIconEl.setAttribute("class", "fa fa-eye-slash col-1");
  } else {
    showHidePasswordIconEl.removeAttribute("class");
    showHidePasswordIconEl.setAttribute("class", "fa fa-eye col-1");
  }
}

function removeErrorMsg(errorMessageSpanID) {
  const emailRequiredErrorEl = document.getElementById(errorMessageSpanID);

  if (!emailRequiredErrorEl.hasAttribute("hidden")) {
    emailRequiredErrorEl.setAttribute("hidden", "");
  }
}

$("#player-2").change(function () {
  removeErrorMsg("player-2-required-span");
  var player1Val = $("#player-1 option:selected").val();
  var player2Val = $("#player-2 option:selected").val();
  if (player1Val == player2Val) {
    Swal.fire({
      icon: "error",
      title: "Player Selection Error",
      text: "Kindly select different player to compare",
    });
    $("#player-2").prop("selectedIndex", 0);
  }
});

function checkNewEntry() {
  $.ajax({
    url: "admin/ajax_process.php?action=check_new_entry",
    type: "POST",
    contentType: false,
    processData: false,
  }).done(function (data) {
    if(data == 5){
    Swal.fire({
            icon: "warning",
            title: "No Capacity",
            text: 'Sorry but our parking capacity is full',
          })
    }
    resultCode = data.result_code;
    carReg = data.car_reg;

    /* login successful code is 1*/
    if (resultCode == 1) {
      Swal.fire({
        icon: "success",
        title: "Welcome",
        text: 'Open the barrier for "' + carReg + '"',
      }).then((result) => {
        location.reload(true)
        })
    }
    if (resultCode == 2) {
      Swal.fire({
        icon: "warning",
        title: "Invalid entry",
        text: 'Car with "' + carReg + '" is already is the parking lot',
      });
    }
  });
}

function checkNewExit() {
  $.ajax({
    url: "admin/ajax_process.php?action=check_new_exit",
    type: "POST",
    contentType: false,
    processData: false,
  }).done(function (data) {
    resultCode = data.result_code;
    parkingFare = data.parking_fare;
    carReg = data.car_reg;
    if (resultCode == 3) {
      Swal.fire({
        icon: "info",
        title: "Parking Fare for: " + carReg,
        text: "Your total parking fare is: " + parkingFare + ".",
        showCancelButton: true,
        confirmButtonColor: "#30d630",
        cancelButtonColor: "#d33",
        confirmButtonText: "&#10003;",
        cancelButtonText: "&#10007;",
      }).then((result) => {
        if (result.isConfirmed) {
          var formData = new FormData();
          formData.append("car_reg", carReg);
          formData.append("parking_fare", parkingFare);
          $.ajax({
            url: "admin/ajax_process.php?action=complete_transaction",
            type: "POST",
            contentType: false,
            processData: false,
            data: formData,
          }).done(function (data) {
            resultCode = data.result_code;
            if (resultCode == 4) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Thank you for using our service. Have a safe journey!\nOpen the barrier!",
              }).then((result) => {
                    location.reload(true)
                        });
            }
          });
        }
        if (!result.isConfirmed) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unauthoried Request!\nCannot open the barrier!",
              }).then((result) => {
                checkNewExit();
              })
        }
      });
    }
  });
}
