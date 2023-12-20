/*Sign In Form Script*/
function validateLoginInForm() {
    $('body').off('click', '#btn-login');
    $('body').on('click', '#btn-login', function (e) {
        e.preventDefault();
        const emailEl = document.getElementById('email');
        const passwordEl = document.getElementById('password');
        const typeEl = document.getElementsByName('type');

        var email = emailEl.value;
        email = email.trim()

        var password = passwordEl.value;
        password = password.trim()

        let type;
        for (let i = 0; i < typeEl.length; i++) {
            if (typeEl[i].checked) {
                type = typeEl[i].value;
                break;
            }
        }

        if (email == "" && password == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter your email and password',
            }).then((result) => {

            })
            return false;
        }
        if (email == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter your email',
            }).then((result) => {

            })
            return false;
        }

        if (password == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter your password',
            }).then((result) => {
            })
            return false;
        }

        if (!validateEmailAddress(email)) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Email should be valid',
            }).then((result) => {
            })
            return false;
        }
        var formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('type', type);
        $.ajax({
            url: "admin/ajax_process.php?action=login",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
            /* login successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome To',
                    text: 'Smart Parking Pro',
                }).then((result) => {
                    window.location.replace('index.php')
                })

            }
            /* login failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Error',
                    text: 'Email or password is invalid',
                })
            }
        });


    });
}

/* Edit Name Form Script*/
function validateEditName(userId) {
    $('body').off('click', '#btn-edit-user');
    $('body').on('click', '#btn-edit-user', function (e) {
        e.preventDefault();

        const nameEl = document.getElementById('edit-name');

        var name = nameEl.value;
        name = name.trim()

        if (name == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter your name',
            }).then((result) => {
            })
            return false;
        }
        var formData = new FormData();
        formData.append('name', name);
        formData.append('user_id', userId);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_name",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
            console.log(data)
            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Name has been updated',
                }).then((result) => {
                    window.location.replace('profile.php');
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Name Error',
                    text: 'Error occur while updating name',
                })
            }
        });
    });
}

/* Edit Parking Capacity Form Script*/
function validateEditParkingCapacity() {
    $('body').off('click', '#btn-edit-parking-capacity');
    $('body').on('click', '#btn-edit-parking-capacity', function (e) {
        e.preventDefault();

        const parkingCapacityEl = document.getElementById('edit-parking-capacity');

        var parkingCapacity = parkingCapacityEl.value;
        parkingCapacity = parkingCapacity.trim()

        if (parkingCapacity == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter parking capacity',
            }).then((result) => {
            })
            return false;
        }
        var formData = new FormData();
        formData.append('parking_capacity', parkingCapacity);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_parking_capacity",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
            console.log(data)
            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Parking capacity has been updated',
                }).then((result) => {
                    window.location.replace('profile.php');
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error occur while updating parking capacity',
                })
            }
        });
    });
}

/* Add Black List Car Form Script*/
function validateAddBlackListCar() {
    $('body').off('click', '#btn-add-black-list-car');
    $('body').on('click', '#btn-add-black-list-car', function (e) {
        e.preventDefault();

        const blackListCarEl = document.getElementById('black-list-car');

        var blackListCar = blackListCarEl.value;
        blackListCar = blackListCar.trim()

        if (blackListCar == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter black list car reg',
            }).then((result) => {
            })
            return false;
        }
        var formData = new FormData();
        formData.append('black_list_car', blackListCar);
        $.ajax({
            url: "admin/ajax_process.php?action=add_black_list_car",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Black list car is added',
                }).then((result) => {
                    window.location.replace('profile.php');
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error occur while adding black list car',
                })
            }
            if (data == "6") {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Invalid',
                                text: 'Black list car is already added',
                            })
                        }
        });
    });
}

function validateEditBlackListCar(id) {
    $('body').off('click', '#btn-edit-black-list-car');
    $('body').on('click', '#btn-edit-black-list-car', function (e) {
        e.preventDefault();
        const blackListCarEl = document.getElementById('black-list-car');

        var blackListCar = blackListCarEl.value;
        blackListCar = blackListCar.trim()

        if (blackListCar == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter black list car reg',
            }).then((result) => {
            })
            return false;
        }
        var formData = new FormData();
        formData.append('car_id', id);
        formData.append('black_list_car', blackListCar);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_black_list_car",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
        console.log(data);
            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Black list car is added',
                }).then((result) => {
                    window.location.replace('black_list_cars.php');
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error occur while adding black list car',
                })
            }
            if (data == "6") {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Invalid',
                                text: 'Black list car is already added',
                            })
                        }
        });
    });
}

function deleteCar(id){
Swal.fire({
    title: "Delete Black List Car",
    text: "Do you want to delete this black list car",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#30d630",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
        if (result.isConfirmed) {
                   var formData = new FormData();
                   formData.append("car_id", id);
                  $.ajax({
                      url: "admin/ajax_process.php?action=delete_black_list_car",
                      type: 'POST',
                      contentType: false,
                      processData: false,
                      data: formData,
                  }).done(function (data) {
                  console.log(data);
                      /* successful code is 1*/
                      if (data == "1") {
                          Swal.fire({
                              icon: 'success',
                              title: 'Success',
                              text: 'Car is removed from black list',
                          }).then((result) => {
                              location.reload(true)
                          })
                      }
                      /* failed code is 2*/
                      if (data == "2") {
                          Swal.fire({
                              icon: 'error',
                              title: 'Error',
                              text: 'Error occur while deleting black list car',
                          })
                      }
                  });
        }
      });
}

/* Edit Password Form Script*/
function validateEditPassword(userId, originalPassword) {
    $('body').off('click', '#btn-edit-password');
    $('body').on('click', '#btn-edit-password', function (e) {
        e.preventDefault();

        const currentPasswordEl = document.getElementById('current-password');
        const newPasswordEl = document.getElementById('new-password');
        const confirmPasswordEl = document.getElementById('confirm-password');

        var currentPassword = currentPasswordEl.value;
        currentPassword = currentPassword.trim()

        var newPassword = newPasswordEl.value;
        newPassword = newPassword.trim()

        var confirmPassword = confirmPasswordEl.value;
        confirmPassword = confirmPassword.trim()

        if (currentPassword == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter your current password',
            }).then((result) => {
            })
            return false;
        }

        if (newPassword == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter your new password',
            }).then((result) => {
            })
            return false;
        }

        if (confirmPassword == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter your confirm password',
            }).then((result) => {
            })
            return false;
        }

        if (newPassword.length < 6) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Password should be at least 6 digits',
            }).then((result) => {
            })
            return false;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Your confirm password does not match.',
            }).then((result) => {
            })
            return false;
        }

        if (originalPassword !== currentPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Current password does not match',
            }).then((result) => {
            })
            return false;
        }

        var formData = new FormData();
        formData.append('new_password', newPassword);
        formData.append('user_id', userId);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_password",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Password has been updated',
                }).then((result) => {
                    window.location.replace('profile.php')
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Error',
                    text: 'Error occur while updating password',
                })
            }
        });
    });
}

/* Add New Staff Form Script*/
function validateNewStaff() {

    $('body').off('click', '#btn-add-new-staff');
    $('body').on('click', '#btn-add-new-staff', function (e) {
        e.preventDefault();
        const emailEl = document.getElementById('new-staff-email');
        const nameEl = document.getElementById('new-staff-name');

        var email = emailEl.value;
        email = email.trim()

        var name = nameEl.value;
        name = name.trim()

        if (email == "" && name == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter new staff name and email',
            }).then((result) => {

            })
            return false;
        }

        if (name == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter new satff name',
            }).then((result) => {
            })
            return false;
        }

        if (email == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter new staff email',
            }).then((result) => {

            })
            return false;
        }

        if (!validateEmailAddress(email)) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Email should be valid',
            }).then((result) => {
            })
            return false;
        }
        var formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
        $.ajax({
            url: "admin/ajax_process.php?action=add_new_staff",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
            console.log(data)
            /* login successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'New Staff is added',
                }).then((result) => {
                    window.location.replace('profile.php')
                })

            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Some error occurs',
                })
            }
            /* already exist player code is 3*/
            if (data == "3") {
                Swal.fire({
                    icon: 'warning',
                    title: 'warning',
                    text: 'Staff with email: ' + email + ' already exists',
                })
            }
        });


    });
}

/* Request Password Form Script*/
function validateRecoverPassword() {
    $('body').off('click', '#btn-recover-password');
    $('body').on('click', '#btn-recover-password', function (e) {
        e.preventDefault();

        const recoverEmailEl = document.getElementById('recover-email');
        const recoverTypeEl = document.getElementsByName('recover-type');


        var email = recoverEmailEl.value;
        email = email.trim()

        let type;
        for (let i = 0; i < recoverTypeEl.length; i++) {
            if (recoverTypeEl[i].checked) {
                type = recoverTypeEl[i].value;
                break;
            }
        }

        if (email == "") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Enter your email',
            }).then((result) => {
            })
            return false;
        }
        if (!validateEmailAddress(email)) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Email should be valid.',
            }).then((result) => {
            })
            return false;
        }

        var formData = new FormData();
        formData.append('recover_email', email);
        formData.append('recover_type', type);
        $.ajax({
            url: "admin/ajax_process.php?action=recover_password",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
            console.log(data)
            /* login successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Email has been sent to you with your password.',
                }).then((result) => {
                    window.location.replace('login.php')
                })

            }
            /* login failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Email Error',
                    text: 'Email is not present in our system',
                })
            }
        });
    });
}

/* Edit Username Form Script*/
function validateEditUsername() {
    $('body').off('click', '#btn-edit-username');
    $('body').on('click', '#btn-edit-username', function (e) {
        e.preventDefault();

        const usernameEl = document.getElementById('username');
        const usernameRequiredSpanEl = document.getElementById('username-required-span');


        var username = usernameEl.value;
        username = username.trim()

        if (username == "") {
            usernameEl.focus();
            usernameRequiredSpanEl.removeAttribute("hidden");
            return false;
        }

        var formData = new FormData();
        formData.append('username', username);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_username",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
            /* login successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Username has been updated',
                }).then((result) => {
                    window.location.replace('profile.php')
                })
            }
            /* login failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Username Error',
                    text: 'Error occur while updating username',
                })
            }
        });
    });
}


/* Edit Email Form Script*/
function validateEditEmail() {
    $('body').off('click', '#btn-edit-email');
    $('body').on('click', '#btn-edit-email', function (e) {
        e.preventDefault();

        const emailEl = document.getElementById('email');
        const emailRequiredSpanEl = document.getElementById('email-required-span');
        const emailInvalidSpanEl = document.getElementById("email-invalid-span")

        var email = emailEl.value;
        email = email.trim()

        if (email == "") {
            emailEl.focus();
            emailRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (!validateEmailAddress(email)) {
            emailEl.focus();
            emailInvalidSpanEl.removeAttribute("hidden");
            return false;
        }

        var formData = new FormData();
        formData.append('email', email);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_email",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Email has been updated',
                }).then((result) => {
                    window.location.replace('profile.php')
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Email Error',
                    text: 'Error occur while updating email',
                })
            }
        });
    });
}

/* Email validation function */
function validateEmailAddress(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/*New Player Form Script*/
function validateNewPlayerForm() {
    $('body').off('click', '#btn-add-new-player');
    $('body').on('click', '#btn-add-new-player', function (e) {
        e.preventDefault();
        /*Variable declaration*/
        const fifaIDEl = document.getElementById('fifa-id');
        const nameEl = document.getElementById('name');
        const imageEl = document.getElementById('image');
        const clubEl = document.getElementById('club');
        const fatherNameEl = document.getElementById('father-name');
        const motherNameEl = document.getElementById('mother-name');
        const primaryNationalityEl = document.getElementById('primary-nationality');
        const secondaryNationalityEl = document.getElementById('secondary-nationality');
        const tertiaryNationalityEl = document.getElementById('tertiary-nationality');
        const dateOfBirthEl = document.getElementById('date-of-birth');

        const fifaIDRequiredSpanEl = document.getElementById('fifa-id-required-span');
        const nameRequiredSpanEl = document.getElementById('name-required-span');
        const imageRequiredSpanEl = document.getElementById('image-required-span');
        const clubRequiredSpanEl = document.getElementById('club-required-span');
        const fatherNameRequiredSpanEl = document.getElementById('father-name-required-span');
        const motherNameRequiredSpanEl = document.getElementById('mother-name-required-span');
        const primaryNationalityRequiredSpanEl = document.getElementById('primary-nationality-required-span');
        const dateOfBirthRequiredSpanEl = document.getElementById('date-of-birth-required-span');

        var fifaID = fifaIDEl.value;
        fifaID = fifaID.trim()
        var name = nameEl.value;
        name = name.trim()
        var image = imageEl.value;

        var club = clubEl.value;
        club = club.trim()
        var fatherName = fatherNameEl.value;
        fatherName = fatherName.trim()
        var motherName = motherNameEl.value;
        motherName = motherName.trim()
        var primaryNationality = primaryNationalityEl.value;
        primaryNationality = primaryNationality.trim()
        var secondaryNationality = secondaryNationalityEl.value;
        secondaryNationality = secondaryNationality.trim()
        var tertiaryNationality = tertiaryNationalityEl.value;
        tertiaryNationality = tertiaryNationality.trim()
        var dateOfBirth = dateOfBirthEl.value;
        dateOfBirth = dateOfBirth.trim()

        /*all empty fields conditions*/
        if (fifaID == "") {
            fifaIDEl.focus();
            fifaIDRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (name == "") {
            nameEl.focus();
            nameRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (image == "") {
            imageEl.focus();
            imageRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        var image = imageEl.files[0];
        if (club == "") {
            clubEl.focus();
            clubRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (fatherName == "") {
            fatherNameEl.focus();
            fatherNameRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (motherName == "") {
            motherNameEl.focus();
            motherNameRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (primaryNationality == "") {
            primaryNationalityEl.focus();
            primaryNationalityRequiredSpanEl.removeAttribute("hidden");
            return false;
        }

        /*if(fifaID == "" && name == "" && image == "" && club == "" && fatherName == "" && motherName == ""
            && primaryNationality == "" && dateOfBirth == ""){
            fifaIDEl.focus();
            fifaIDRequiredSpanEl.removeAttribute("hidden");
            nameRequiredSpanEl.removeAttribute("hidden");
            imageRequiredSpanEl.removeAttribute("hidden");
            clubRequiredSpanEl.removeAttribute("hidden");
            fatherNameRequiredSpanEl.removeAttribute("hidden");
            motherNameRequiredSpanEl.removeAttribute("hidden");
            primaryNationalityRequiredSpanEl.removeAttribute("hidden");
            dateOfBirthRequiredSpanEl.removeAttribute("hidden");
            return false;
        }

        if(name == "" && image == "" && club == "" && fatherName == "" && motherName == ""
            && primaryNationality == "" && dateOfBirth == ""){
            nameEl.focus();
            nameRequiredSpanEl.removeAttribute("hidden");
            imageRequiredSpanEl.removeAttribute("hidden");
            clubRequiredSpanEl.removeAttribute("hidden");
            fatherNameRequiredSpanEl.removeAttribute("hidden");
            motherNameRequiredSpanEl.removeAttribute("hidden");
            primaryNationalityRequiredSpanEl.removeAttribute("hidden");
            dateOfBirthRequiredSpanEl.removeAttribute("hidden");
            return false;
        }

        if(image == "" && club == "" && fatherName == "" && motherName == ""
            && primaryNationality == "" && dateOfBirth == ""){
            imageEl.focus();
            imageRequiredSpanEl.removeAttribute("hidden");
            clubRequiredSpanEl.removeAttribute("hidden");
            fatherNameRequiredSpanEl.removeAttribute("hidden");
            motherNameRequiredSpanEl.removeAttribute("hidden");
            primaryNationalityRequiredSpanEl.removeAttribute("hidden");
            dateOfBirthRequiredSpanEl.removeAttribute("hidden");
            return false;
        }

        if(club == "" && fatherName == "" && motherName == ""
            && primaryNationality == "" && dateOfBirth == ""){
            clubEl.focus();
            clubRequiredSpanEl.removeAttribute("hidden");
            fatherNameRequiredSpanEl.removeAttribute("hidden");
            motherNameRequiredSpanEl.removeAttribute("hidden");
            primaryNationalityRequiredSpanEl.removeAttribute("hidden");
            dateOfBirthRequiredSpanEl.removeAttribute("hidden");
            return false;
        }

        if(fatherName == "" && motherName == "" && primaryNationality == "" && dateOfBirth == ""){
            fatherName.focus();
            fatherNameRequiredSpanEl.removeAttribute("hidden");
            motherNameRequiredSpanEl.removeAttribute("hidden");
            primaryNationalityRequiredSpanEl.removeAttribute("hidden");
            dateOfBirthRequiredSpanEl.removeAttribute("hidden");
            return false;
        }

        if(motherName == "" && primaryNationality == "" && dateOfBirth == ""){
            motherNameEl.focus();
            motherNameRequiredSpanEl.removeAttribute("hidden");
            primaryNationalityRequiredSpanEl.removeAttribute("hidden");
            dateOfBirthRequiredSpanEl.removeAttribute("hidden");
            return false;
        }

        if(primaryNationality == "" && dateOfBirth == ""){
            primaryNationalityEl.focus();
            primaryNationalityRequiredSpanEl.removeAttribute("hidden");
            dateOfBirthRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
*/
        if (dateOfBirth == "") {
            dateOfBirthEl.focus();
            dateOfBirthRequiredSpanEl.removeAttribute("hidden");
            return false;
        }

        var formData = new FormData();
        formData.append('fifa_id', fifaID);
        formData.append('name', name);
        formData.append('image', image);
        formData.append('club', club);
        formData.append('father_name', fatherName);
        formData.append('mother_name', motherName);
        formData.append('primary_nationality', primaryNationality);
        formData.append('secondary_nationality', secondaryNationality);
        formData.append('tertiary_nationality', tertiaryNationality);
        formData.append('date_of_birth', dateOfBirth);
        $.ajax({
            url: "admin/ajax_process.php?action=add_new_player",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {

            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'New player is added',
                }).then((result) => {
                    window.location.replace('players.php')
                })

            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Some error occurs',
                })
            }
            /* already exist player code is 3*/
            if (data == "3") {
                Swal.fire({
                    icon: 'warning',
                    title: 'warning',
                    text: 'Player with fifa Id: ' + fifaID + ' already exists',
                })
            }
        });

    });
}

/* Edit Image Form Script*/
function validateEditImage(playerID) {
    $('body').off('click', '#btn-edit-image');
    $('body').on('click', '#btn-edit-image', function (e) {
        e.preventDefault();

        const imageEl = document.getElementById('image');
        const imageRequiredSpanEl = document.getElementById('image-required-span');
        var image = imageEl.value;
        if (image == "") {
            imageEl.focus();
            imageRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        var image = imageEl.files[0];

        var formData = new FormData();
        formData.append('image', image);
        formData.append('player_id', playerID);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_image",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Image has been updated',
                }).then((result) => {
                    window.location.replace('player_details.php?player_id=' + playerID);
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Image Error',
                    text: 'Error occur while updating Image',
                })
            }
        });
    });
}

/* Edit FIFA ID Form Script*/
function validateEditFIFAID(playerId) {
    $('body').off('click', '#btn-edit-fifa-id');
    $('body').on('click', '#btn-edit-fifa-id', function (e) {
        e.preventDefault();

        const fifaIDEl = document.getElementById('fifa-id');
        const fifaIDRequiredSpanEl = document.getElementById('fifa-id-required-span');
        var fifaID = fifaIDEl.value;
        fifaID = fifaID.trim()

        if (fifaID == "") {
            fifaIDEl.focus();
            fifaIDRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        var formData = new FormData();
        formData.append('fifa_id', fifaID);
        formData.append('player_id', playerId);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_fifa_id",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
            console.log(data)
            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'FIFA ID has been updated',
                }).then((result) => {
                    window.location.replace('player_details.php?player_id=' + playerId);
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'FIFA ID Error',
                    text: 'Error occur while updating FIFA ID',
                })
            }
            /* already exist player code is 3*/
            if (data == "3") {
                Swal.fire({
                    icon: 'warning',
                    title: 'warning',
                    text: 'fifa Id: ' + formData.get('fifa_id') + ' already assigned to other player',
                })
            }
        });
    });
}

/* Edit Name Form Script*/

/* Edit Club Form Script*/
function validateEditClub(playerId) {
    $('body').off('click', '#btn-edit-club');
    $('body').on('click', '#btn-edit-club', function (e) {
        e.preventDefault();

        const clubEl = document.getElementById('club');
        const clubRequiredSpanEl = document.getElementById('club-required-span');
        var club = clubEl.value;
        club = club.trim()

        if (club == "") {
            clubEl.focus();
            clubRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        var formData = new FormData();
        formData.append('club', club);
        formData.append('player_id', playerId);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_club",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {

            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Club has been updated',
                }).then((result) => {
                    window.location.replace('player_details.php?player_id=' + playerId);
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Club Error',
                    text: 'Error occur while updating club',
                })
            }
        });
    });
}

/* Edit Father Name Form Script*/
function validateEditFatherName(playerId) {
    $('body').off('click', '#btn-edit-father-name');
    $('body').on('click', '#btn-edit-father-name', function (e) {
        e.preventDefault();

        const fatherNameEl = document.getElementById('father-name');
        const fatherNameRequiredSpanEl = document.getElementById('father-name-required-span');
        var fatherName = fatherNameEl.value;
        fatherName = fatherName.trim()

        if (fatherName == "") {
            fatherNameEl.focus();
            fatherNameRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        var formData = new FormData();
        formData.append('father_name', fatherName);
        formData.append('player_id', playerId);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_father_name",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {

            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Father name has been updated',
                }).then((result) => {
                    window.location.replace('player_details.php?player_id=' + playerId);
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Father Name Error',
                    text: 'Error occur while updating father name',
                })
            }
        });
    });
}

/* Edit Mother Name Form Script*/
function validateEditMotherName(playerId) {
    $('body').off('click', '#btn-edit-mother-name');
    $('body').on('click', '#btn-edit-mother-name', function (e) {
        e.preventDefault();

        const motherNameEl = document.getElementById('mother-name');
        const motherNameRequiredSpanEl = document.getElementById('mother-name-required-span');
        var motherName = motherNameEl.value;
        motherName = motherName.trim()

        if (motherName == "") {
            motherNameEl.focus();
            motherNameRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        var formData = new FormData();
        formData.append('mother_name', motherName);
        formData.append('player_id', playerId);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_mother_name",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {

            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Mother name has been updated',
                }).then((result) => {
                    window.location.replace('player_details.php?player_id=' + playerId);
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Mother Name Error',
                    text: 'Error occur while updating mother name',
                })
            }
        });
    });
}

/* Edit Date of Birth Form Script*/
function validateEditDateOfBirth(playerId) {
    $('body').off('click', '#btn-edit-date-of-birth');
    $('body').on('click', '#btn-edit-date-of-birth', function (e) {
        e.preventDefault();

        const dateOfBirthEl = document.getElementById('date-of-birth');
        const dateOfBirthRequiredSpanEl = document.getElementById('date-of-birth-required-span');
        var dateOfBirth = dateOfBirthEl.value;
        dateOfBirth = dateOfBirth.trim()

        if (dateOfBirth == "") {
            dateOfBirthEl.focus();
            dateOfBirthRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        var formData = new FormData();
        formData.append('date_of_birth', dateOfBirth);
        formData.append('player_id', playerId);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_date_of_birth",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {

            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Date of Birth has been updated',
                }).then((result) => {
                    window.location.replace('player_details.php?player_id=' + playerId);
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Date of Birth Error',
                    text: 'Error occur while updating date of birth',
                })
            }
        });
    });
}

/* Edit Primary Nationality Form Script*/
function validateEditPrimaryNationality(playerId) {
    $('body').off('click', '#btn-edit-primary-nationality');
    $('body').on('click', '#btn-edit-primary-nationality', function (e) {
        e.preventDefault();

        const primaryNationalityEl = document.getElementById('primary-nationality');
        const primaryNationalityRequiredSpanEl = document.getElementById('primary-nationality-required-span');
        var primaryNationality = primaryNationalityEl.value;
        primaryNationality = primaryNationality.trim()

        if (primaryNationality == "") {
            primaryNationalityEl.focus();
            primaryNationalityRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        var formData = new FormData();
        formData.append('primary_nationality', primaryNationality);
        formData.append('player_id', playerId);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_primary_nationality",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {

            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Primary nationality has been updated',
                }).then((result) => {
                    window.location.replace('player_details.php?player_id=' + playerId);
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Primary Nationality Error',
                    text: 'Error occur while updating date of birth',
                })
            }
        });
    });
}

/* Edit Secondary Nationality Form Script*/
function validateEditSecondaryNationality(playerId) {
    $('body').off('click', '#btn-edit-secondary-nationality');
    $('body').on('click', '#btn-edit-secondary-nationality', function (e) {
        e.preventDefault();

        const secondaryNationalityEl = document.getElementById('secondary-nationality');
        const secondaryNationalityRequiredSpanEl = document.getElementById('secondary-nationality-required-span');
        var secondaryNationality = secondaryNationalityEl.value;
        secondaryNationality = secondaryNationality.trim()

        if (secondaryNationality == "") {
            secondaryNationalityEl.focus();
            secondaryNationalityRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        var formData = new FormData();
        formData.append('secondary_nationality', secondaryNationality);
        formData.append('player_id', playerId);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_secondary_nationality",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {

            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Secondary nationality has been updated',
                }).then((result) => {
                    window.location.replace('player_details.php?player_id=' + playerId);
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Secondary Nationality Error',
                    text: 'Error occur while updating date of birth',
                })
            }
        });
    });
}

/* Edit Tertiary Nationality Form Script*/
function validateEditTertiaryNationality(playerId) {
    $('body').off('click', '#btn-edit-tertiary-nationality');
    $('body').on('click', '#btn-edit-tertiary-nationality', function (e) {
        e.preventDefault();

        const tertiaryNationalityEl = document.getElementById('tertiary-nationality');
        const tertiaryNationalityRequiredSpanEl = document.getElementById('tertiary-nationality-required-span');
        var tertiaryNationality = tertiaryNationalityEl.value;
        tertiaryNationality = tertiaryNationality.trim()

        if (tertiaryNationality == "") {
            tertiaryNationalityEl.focus();
            tertiaryNationalityRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        var formData = new FormData();
        formData.append('tertiary_nationality', tertiaryNationality);
        formData.append('player_id', playerId);
        $.ajax({
            url: "admin/ajax_process.php?action=edit_tertiary_nationality",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {

            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Tertiary nationality has been updated',
                }).then((result) => {
                    window.location.replace('player_details.php?player_id=' + playerId);
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Tertiary Nationality Error',
                    text: 'Error occur while updating date of birth',
                })
            }
        });
    });
}

/*New Player Form Script*/
function validateNewDataForm(playerId) {
    $('body').off('click', '#btn-add-new-data');
    $('body').on('click', '#btn-add-new-data', function (e) {
        e.preventDefault();

        /*Variable declaration*/
        const heightEl = document.getElementById('height');
        const weightEl = document.getElementById('weight');
        const sprint10MeterEl = document.getElementById('sprint-10-meter');
        const sprint20MeterEl = document.getElementById('sprint-20-meter');
        const sprint50MeterEl = document.getElementById('sprint-50-meter');
        const dribbleCourseEl = document.getElementById('dribble-course');
        const dribbleCourseMainEl = document.getElementById('dribble-course-main');
        const dribbleCourseOffEl = document.getElementById('dribble-course-off');
        const longBallPrecisionEl = document.getElementById('long-ball-precision');
        const flexibilityEl = document.getElementById('flexibility');
        const jumpStandingEl = document.getElementById('jump-standing');
        const jumpRunningEl = document.getElementById('jump-running');
        const strengthEl = document.getElementById('strength');
        const enduranceEl = document.getElementById('endurance');
        const techniqueEl = document.getElementById('technique');
        const determinationEl = document.getElementById('determination');
        const tacticalSenseEl = document.getElementById('tactical-sense');
        const agilityEl = document.getElementById('agility');
        const reflexHandEl = document.getElementById('reflex-hand');
        const reflexLegEl = document.getElementById('reflex-leg');

        const heightRequiredSpanEl = document.getElementById('height-required-span');
        const weightRequiredSpanEl = document.getElementById('weight-required-span');
        const sprint10MeterRequiredSpanEl = document.getElementById('sprint-10-meter-required-span');
        const sprint20MeterRequiredSpanEl = document.getElementById('sprint-20-meter-required-span');
        const sprint50MeterRequiredSpanEl = document.getElementById('sprint-50-meter-required-span');
        const dribbleCourseRequiredSpanEl = document.getElementById('dribble-course-required-span');
        const dribbleCourseMainRequiredSpanEl = document.getElementById('dribble-course-main-required-span');
        const dribbleCourseOffRequiredSpanEl = document.getElementById('dribble-course-off-required-span');
        const longBallPrecisionRequiredSpanEl = document.getElementById('long-ball-precision-required-span');
        const longBallPrecisionInvalidSpanEl = document.getElementById('long-ball-precision-invalid-span');
        const flexibilityRequiredSpanEl = document.getElementById('flexibility-required-span');
        const jumpStandingRequiredSpanEl = document.getElementById('jump-standing-required-span');
        const jumpRunningRequiredSpanEl = document.getElementById('jump-running-required-span');
        const strengthRequiredSpanEl = document.getElementById('strength-required-span');
        const enduranceRequiredSpanEl = document.getElementById('endurance-required-span');
        const enduranceInvalidSpanEl = document.getElementById('endurance-invalid-span');
        const techniqueRequiredSpanEl = document.getElementById('technique-required-span');
        const techniqueInvalidSpanEl = document.getElementById('technique-invalid-span');
        const determinationRequiredSpanEl = document.getElementById('determination-required-span');
        const determinationInvalidSpanEl = document.getElementById('determination-invalid-span');
        const tacticalSenseRequiredSpanEl = document.getElementById('tactical-sense-required-span');
        const tacticalSenseInvalidSpanEl = document.getElementById('tactical-sense-invalid-span');
        const agilityRequiredSpanEl = document.getElementById('agility-required-span');
        const reflexHandRequiredSpanEl = document.getElementById('reflex-hand-required-span');
        const reflexLegRequiredSpanEl = document.getElementById('reflex-leg-required-span');


        var height = heightEl.value;
        height = height.trim()
        var weight = weightEl.value;
        weight = weight.trim()
        var sprint10Meter = sprint10MeterEl.value;
        sprint10Meter = sprint10Meter.trim()
        var sprint20Meter = sprint20MeterEl.value;
        sprint20Meter = sprint20Meter.trim()
        var sprint50Meter = sprint50MeterEl.value;
        sprint50Meter = sprint50Meter.trim()
        var dribbleCourse = dribbleCourseEl.value;
        dribbleCourse = dribbleCourse.trim()
        var dribbleCourseMain = dribbleCourseMainEl.value;
        dribbleCourseMain = dribbleCourseMain.trim()
        var dribbleCourseOff = dribbleCourseOffEl.value;
        dribbleCourseOff = dribbleCourseOff.trim()
        var longBallPrecision = longBallPrecisionEl.value;
        longBallPrecision = longBallPrecision.trim()
        var flexibility = flexibilityEl.value;
        flexibility = flexibility.trim()
        var jumpStanding = jumpStandingEl.value;
        jumpStanding = jumpStanding.trim()
        var jumpRunning = jumpRunningEl.value;
        jumpRunning = jumpRunning.trim()
        var strength = strengthEl.value;
        strength = strength.trim()
        var endurance = enduranceEl.value;
        endurance = endurance.trim()
        var technique = techniqueEl.value;
        technique = technique.trim()
        var determination = determinationEl.value;
        determination = determination.trim()
        var tacticalSense = tacticalSenseEl.value;
        tacticalSense = tacticalSense.trim()
        var agility = agilityEl.value;
        agility = agility.trim()
        var reflexHand = reflexHandEl.value;
        reflexHand = reflexHand.trim()
        var reflexLeg = reflexLegEl.value;
        reflexLeg = reflexLeg.trim()

        /*all empty fields conditions*/
        if (height == "") {
            heightEl.focus();
            heightRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (weight == "") {
            weightEl.focus();
            weightRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (sprint10Meter == "") {
            sprint10MeterEl.focus();
            sprint10MeterRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (sprint20Meter == "") {
            sprint20MeterEl.focus();
            sprint20MeterRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (sprint50Meter == "") {
            sprint50MeterEl.focus();
            sprint50MeterRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (dribbleCourse == "") {
            dribbleCourseEl.focus();
            dribbleCourseRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (dribbleCourseMain == "") {
            dribbleCourseMainEl.focus();
            dribbleCourseMainRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (dribbleCourseOff == "") {
            dribbleCourseOffEl.focus();
            dribbleCourseOffRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (longBallPrecision == "") {
            longBallPrecisionEl.focus();
            longBallPrecisionRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (longBallPrecision < 0 || longBallPrecision > 100) {
            longBallPrecisionEl.focus();
            longBallPrecisionInvalidSpanEl.removeAttribute("hidden");
            return false;
        }
        if (flexibility == "") {
            flexibilityEl.focus();
            flexibilityRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (jumpStanding == "") {
            jumpStandingEl.focus();
            jumpStandingRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (jumpRunning == "") {
            jumpRunningEl.focus();
            jumpRunningRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (strength == "") {
            strengthEl.focus();
            strengthRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (endurance == "") {
            enduranceEl.focus();
            enduranceRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (endurance < 0 || endurance > 100) {
            enduranceEl.focus();
            enduranceInvalidSpanEl.removeAttribute("hidden");
            return false;
        }
        if (technique == "") {
            techniqueEl.focus();
            techniqueRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (technique < 0 || technique > 100) {
            techniqueEl.focus();
            techniqueInvalidSpanEl.removeAttribute("hidden");
            return false;
        }
        if (determination === "") {
            determinationEl.focus();
            determinationRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (determination < 0 || determination > 100) {
            determinationEl.focus();
            determinationInvalidSpanEl.removeAttribute("hidden");
            return false;
        }
        if (tacticalSense == "") {
            tacticalSenseEl.focus();
            tacticalSenseRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (tacticalSense < 0 || tacticalSense > 100) {
            tacticalSenseEl.focus();
            tacticalSenseInvalidSpanEl.removeAttribute("hidden");
            return false;
        }
        if (agility == "") {
            agilityEl.focus();
            agilityRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (reflexHand == "") {
            reflexHandEl.focus();
            reflexHandRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (reflexLeg == "") {
            reflexLegEl.focus();
            reflexLegRequiredSpanEl.removeAttribute("hidden");
            return false;
        }

        var formData = new FormData();
        formData.append('player_id', playerId);
        formData.append('height', height);
        formData.append('weight', weight);
        formData.append('sprint_10_meter', sprint10Meter);
        formData.append('sprint_20_meter', sprint20Meter);
        formData.append('sprint_50_meter', sprint50Meter);
        formData.append('dribble_course', dribbleCourse);
        formData.append('dribble_course_main', dribbleCourseMain);
        formData.append('dribble_course_off', dribbleCourseOff);
        formData.append('long_ball_precision', longBallPrecision);
        formData.append('flexibility', flexibility);
        formData.append('jump_standing', jumpStanding);
        formData.append('jump_running', jumpRunning);
        formData.append('strength', strength);
        formData.append('endurance', endurance);
        formData.append('technique', technique);
        formData.append('determination', determination);
        formData.append('tactical_sense', tacticalSense);
        formData.append('agility', agility);
        formData.append('reflex_hand', reflexHand);
        formData.append('reflex_leg', reflexLeg);

        $.ajax({
            url: "admin/ajax_process.php?action=add_new_data",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {
            console.log(data)
            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'New data is added',
                }).then((result) => {
                    window.location.replace('player_details.php?player_id=' + playerId)
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Some error occurs',
                })
            }
            /* height error code is 3*/
            if (data == "3") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Height cannot be less then previous entry',
                }).then((result) => {
                    heightEl.focus();
                })
            }
        });

    });
}

/*New Player Form Script*/
function validateEditDataForm(dataId) {
    $('body').off('click', '#btn-edit-data');
    $('body').on('click', '#btn-edit-data', function (e) {
        e.preventDefault();

        /*Variable declaration*/
        const heightEl = document.getElementById('height');
        const weightEl = document.getElementById('weight');
        const sprint10MeterEl = document.getElementById('sprint-10-meter');
        const sprint20MeterEl = document.getElementById('sprint-20-meter');
        const sprint50MeterEl = document.getElementById('sprint-50-meter');
        const dribbleCourseEl = document.getElementById('dribble-course');
        const dribbleCourseMainEl = document.getElementById('dribble-course-main');
        const dribbleCourseOffEl = document.getElementById('dribble-course-off');
        const longBallPrecisionEl = document.getElementById('long-ball-precision');
        const flexibilityEl = document.getElementById('flexibility');
        const jumpStandingEl = document.getElementById('jump-standing');
        const jumpRunningEl = document.getElementById('jump-running');
        const strengthEl = document.getElementById('strength');
        const enduranceEl = document.getElementById('endurance');
        const techniqueEl = document.getElementById('technique');
        const determinationEl = document.getElementById('determination');
        const tacticalSenseEl = document.getElementById('tactical-sense');
        const agilityEl = document.getElementById('agility');
        const reflexHandEl = document.getElementById('reflex-hand');
        const reflexLegEl = document.getElementById('reflex-leg');

        const heightRequiredSpanEl = document.getElementById('height-required-span');
        const weightRequiredSpanEl = document.getElementById('weight-required-span');
        const sprint10MeterRequiredSpanEl = document.getElementById('sprint-10-meter-required-span');
        const sprint20MeterRequiredSpanEl = document.getElementById('sprint-20-meter-required-span');
        const sprint50MeterRequiredSpanEl = document.getElementById('sprint-50-meter-required-span');
        const dribbleCourseRequiredSpanEl = document.getElementById('dribble-course-required-span');
        const dribbleCourseMainRequiredSpanEl = document.getElementById('dribble-course-main-required-span');
        const dribbleCourseOffRequiredSpanEl = document.getElementById('dribble-course-off-required-span');
        const longBallPrecisionRequiredSpanEl = document.getElementById('long-ball-precision-required-span');
        const longBallPrecisionInvalidSpanEl = document.getElementById('long-ball-precision-invalid-span');
        const flexibilityRequiredSpanEl = document.getElementById('flexibility-required-span');
        const jumpStandingRequiredSpanEl = document.getElementById('jump-standing-required-span');
        const jumpRunningRequiredSpanEl = document.getElementById('jump-running-required-span');
        const strengthRequiredSpanEl = document.getElementById('strength-required-span');
        const enduranceRequiredSpanEl = document.getElementById('endurance-required-span');
        const enduranceInvalidSpanEl = document.getElementById('endurance-invalid-span');
        const techniqueRequiredSpanEl = document.getElementById('technique-required-span');
        const techniqueInvalidSpanEl = document.getElementById('technique-invalid-span');
        const determinationRequiredSpanEl = document.getElementById('determination-required-span');
        const determinationInvalidSpanEl = document.getElementById('determination-invalid-span');
        const tacticalSenseRequiredSpanEl = document.getElementById('tactical-sense-required-span');
        const tacticalSenseInvalidSpanEl = document.getElementById('tactical-sense-invalid-span');
        const agilityRequiredSpanEl = document.getElementById('agility-required-span');
        const reflexHandRequiredSpanEl = document.getElementById('reflex-hand-required-span');
        const reflexLegRequiredSpanEl = document.getElementById('reflex-leg-required-span');


        var height = heightEl.value;
        height = height.trim()
        var weight = weightEl.value;
        weight = weight.trim()
        var sprint10Meter = sprint10MeterEl.value;
        sprint10Meter = sprint10Meter.trim()
        var sprint20Meter = sprint20MeterEl.value;
        sprint20Meter = sprint20Meter.trim()
        var sprint50Meter = sprint50MeterEl.value;
        sprint50Meter = sprint50Meter.trim()
        var dribbleCourse = dribbleCourseEl.value;
        dribbleCourse = dribbleCourse.trim()
        var dribbleCourseMain = dribbleCourseMainEl.value;
        dribbleCourseMain = dribbleCourseMain.trim()
        var dribbleCourseOff = dribbleCourseOffEl.value;
        dribbleCourseOff = dribbleCourseOff.trim()
        var longBallPrecision = longBallPrecisionEl.value;
        longBallPrecision = longBallPrecision.trim()
        var flexibility = flexibilityEl.value;
        flexibility = flexibility.trim()
        var jumpStanding = jumpStandingEl.value;
        jumpStanding = jumpStanding.trim()
        var jumpRunning = jumpRunningEl.value;
        jumpRunning = jumpRunning.trim()
        var strength = strengthEl.value;
        strength = strength.trim()
        var endurance = enduranceEl.value;
        endurance = endurance.trim()
        var technique = techniqueEl.value;
        technique = technique.trim()
        var determination = determinationEl.value;
        determination = determination.trim()
        var tacticalSense = tacticalSenseEl.value;
        tacticalSense = tacticalSense.trim()
        var agility = agilityEl.value;
        agility = agility.trim()
        var reflexHand = reflexHandEl.value;
        reflexHand = reflexHand.trim()
        var reflexLeg = reflexLegEl.value;
        reflexLeg = reflexLeg.trim()

        /*all empty fields conditions*/
        if (height == "") {
            heightEl.focus();
            heightRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (weight == "") {
            weightEl.focus();
            weightRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (sprint10Meter == "") {
            sprint10MeterEl.focus();
            sprint10MeterRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (sprint20Meter == "") {
            sprint20MeterEl.focus();
            sprint20MeterRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (sprint50Meter == "") {
            sprint50MeterEl.focus();
            sprint50MeterRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (dribbleCourse == "") {
            dribbleCourseEl.focus();
            dribbleCourseRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (dribbleCourseMain == "") {
            dribbleCourseMainEl.focus();
            dribbleCourseMainRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (dribbleCourseOff == "") {
            dribbleCourseOffEl.focus();
            dribbleCourseOffRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (longBallPrecision == "") {
            longBallPrecisionEl.focus();
            longBallPrecisionRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (longBallPrecision < 0 || longBallPrecision > 100) {
            longBallPrecisionEl.focus();
            longBallPrecisionInvalidSpanEl.removeAttribute("hidden");
            return false;
        }
        if (flexibility == "") {
            flexibilityEl.focus();
            flexibilityRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (jumpStanding == "") {
            jumpStandingEl.focus();
            jumpStandingRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (jumpRunning == "") {
            jumpRunningEl.focus();
            jumpRunningRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (strength == "") {
            strengthEl.focus();
            strengthRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (endurance == "") {
            enduranceEl.focus();
            enduranceRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (endurance < 0 || endurance > 100) {
            enduranceEl.focus();
            enduranceInvalidSpanEl.removeAttribute("hidden");
            return false;
        }
        if (technique == "") {
            techniqueEl.focus();
            techniqueRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (technique < 0 || technique > 100) {
            techniqueEl.focus();
            techniqueInvalidSpanEl.removeAttribute("hidden");
            return false;
        }
        if (determination === "") {
            determinationEl.focus();
            determinationRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (determination < 0 || determination > 100) {
            determinationEl.focus();
            determinationInvalidSpanEl.removeAttribute("hidden");
            return false;
        }
        if (tacticalSense == "") {
            tacticalSenseEl.focus();
            tacticalSenseRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (tacticalSense < 0 || tacticalSense > 100) {
            tacticalSenseEl.focus();
            tacticalSenseInvalidSpanEl.removeAttribute("hidden");
            return false;
        }
        if (agility == "") {
            agilityEl.focus();
            agilityRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (reflexHand == "") {
            reflexHandEl.focus();
            reflexHandRequiredSpanEl.removeAttribute("hidden");
            return false;
        }
        if (reflexLeg == "") {
            reflexLegEl.focus();
            reflexLegRequiredSpanEl.removeAttribute("hidden");
            return false;
        }

        var formData = new FormData();
        formData.append('data_id', dataId);
        formData.append('height', height);
        formData.append('weight', weight);
        formData.append('sprint_10_meter', sprint10Meter);
        formData.append('sprint_20_meter', sprint20Meter);
        formData.append('sprint_50_meter', sprint50Meter);
        formData.append('dribble_course', dribbleCourse);
        formData.append('dribble_course_main', dribbleCourseMain);
        formData.append('dribble_course_off', dribbleCourseOff);
        formData.append('long_ball_precision', longBallPrecision);
        formData.append('flexibility', flexibility);
        formData.append('jump_standing', jumpStanding);
        formData.append('jump_running', jumpRunning);
        formData.append('strength', strength);
        formData.append('endurance', endurance);
        formData.append('technique', technique);
        formData.append('determination', determination);
        formData.append('tactical_sense', tacticalSense);
        formData.append('agility', agility);
        formData.append('reflex_hand', reflexHand);
        formData.append('reflex_leg', reflexLeg);

        $.ajax({
            url: "admin/ajax_process.php?action=edit_data",
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
        }).done(function (data) {

            /* successful code is 1*/
            if (data == "1") {
                Swal.fire({
                    icon: 'success',
                    title: 'Congrats',
                    text: 'Data is edited',
                }).then((result) => {
                    window.location.replace('edit_data.php?data_id=' + dataId)
                })
            }
            /* failed code is 2*/
            if (data == "2") {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Some error occurs',
                })
            }
        });

    });
}

/*Sinlge Player Graph Form Script*/
$('body').off('click', '#btn-player-graph');
$('body').on('click', '#btn-player-graph', function (e) {
    e.preventDefault();

    const playerEl = document.getElementById('player');
    const playerAttributeEl = document.getElementById('player-attribute');

    const playerRequiredSpanEl = document.getElementById("player-required-span")
    const playerAttributeRequiredSpanEl = document.getElementById("player-attribute-required-span")

    var player = playerEl.value;
    player = player.trim()

    var playerAttribute = playerAttributeEl.value;
    playerAttribute = playerAttribute.trim()

    if (player == "") {
        playerEl.focus();
        playerRequiredSpanEl.removeAttribute("hidden");
        return false;
    } else if (playerAttribute == "") {
        playerAttributeEl.focus();
        playerAttributeRequiredSpanEl.removeAttribute("hidden");
        return false;
    } else {
        window.open("player_data_graph.php?player_id=" + player + "&player_data=" + playerAttribute, '_blank').focus();
    }
});

/*Player Vs Player Comparison Form Script*/
$('body').off('click', '#btn-player-player-comparison');
$('body').on('click', '#btn-player-player-comparison', function (e) {
    e.preventDefault();

    const player1El = document.getElementById('player-1');
    const player2El = document.getElementById('player-2');
    const playerAttributeEl = document.getElementById('player-attribute');

    const player1RequiredSpanEl = document.getElementById("player-1-required-span")
    const player2RequiredSpanEl = document.getElementById("player-2-required-span")
    const playerAttributeRequiredSpanEl = document.getElementById("player-attribute-required-span")

    var player1 = player1El.value;
    player1 = player1.trim()

    var player2 = player2El.value;
    player2 = player2.trim()

    var playerAttribute = playerAttributeEl.value;
    playerAttribute = playerAttribute.trim()

    if (player1 == "") {
        player1El.focus();
        player1RequiredSpanEl.removeAttribute("hidden");
        return false;
    } else if (player2 == "") {
        player2El.focus();
        player2RequiredSpanEl.removeAttribute("hidden");
        return false;
    } else if (playerAttribute == "") {
        playerAttributeEl.focus();
        playerAttributeRequiredSpanEl.removeAttribute("hidden");
        return false;
    } else {
        window.open("player_vs_player_graph.php?player_1_id=" + player1 + "&player_2_id=" + player2 + "&player_attribute=" + playerAttribute, '_blank').focus();
    }
});

/*Club Vs Club Comparison Form Script*/
$('body').off('click', '#btn-club-club-comparison');
$('body').on('click', '#btn-club-club-comparison', function (e) {
    e.preventDefault();

    const club1El = document.getElementById('club-1');
    const club2El = document.getElementById('club-2');
    const ageYearEl = document.getElementById('age-year');
    const playerAttributeEl = document.getElementById('player-attribute');

    const club1RequiredSpanEl = document.getElementById("club-1-required-span")
    const club2RequiredSpanEl = document.getElementById("club-2-required-span")
    const ageYearRequiredSpanEl = document.getElementById("age-year-required-span")
    const playerAttributeRequiredSpanEl = document.getElementById("player-attribute-required-span")

    var club1 = club1El.value;
    club1 = club1.trim()

    var club2 = club2El.value;
    club2 = club2.trim()

    var ageYear = ageYearEl.value;
    ageYear = ageYear.trim()

    var playerAttribute = playerAttributeEl.value;
    playerAttribute = playerAttribute.trim()

    if (club1 == "") {
        club1El.focus();
        club1RequiredSpanEl.removeAttribute("hidden");
        return false;
    } else if (club2 == "") {
        club2El.focus();
        club2RequiredSpanEl.removeAttribute("hidden");
        return false;
    } else if (ageYear == "") {
        ageYearEl.focus();
        ageYearRequiredSpanEl.removeAttribute("hidden");
        return false;
    } else if (playerAttribute == "") {
        playerAttributeEl.focus();
        playerAttributeRequiredSpanEl.removeAttribute("hidden");
        return false;
    } else {
        window.open("club_vs_club_graph.php?club_1=" + club1 + "&club_2=" + club2 + "&age_year=" + ageYear + "&player_attribute=" + playerAttribute, '_blank').focus();
    }
});

/*Player Vs Club Comparison Form Script*/
$('body').off('click', '#btn-player-club-comparison');
$('body').on('click', '#btn-player-club-comparison', function (e) {
    e.preventDefault();

    const playerEl = document.getElementById('player');
    const clubEl = document.getElementById('club');
    const ageYearEl = document.getElementById('age-year');
    const playerAttributeEl = document.getElementById('player-attribute');

    const playerRequiredSpanEl = document.getElementById("player-required-span")
    const clubRequiredSpanEl = document.getElementById("club-required-span")
    const ageYearRequiredSpanEl = document.getElementById("age-year-required-span")
    const playerAttributeRequiredSpanEl = document.getElementById("player-attribute-required-span")

    var player = playerEl.value;
    player = player.trim()

    var club = clubEl.value;
    club = club.trim()

    var playerAttribute = playerAttributeEl.value;
    playerAttribute = playerAttribute.trim()

    if (player == "") {
        playerEl.focus();
        playerRequiredSpanEl.removeAttribute("hidden");
        return false;
    } else if (club == "") {
        clubEl.focus();
        clubRequiredSpanEl.removeAttribute("hidden");
        return false;
    } else if (playerAttribute == "") {
        playerAttributeEl.focus();
        playerAttributeRequiredSpanEl.removeAttribute("hidden");
        return false;
    } else {
        window.open("player_vs_club_graph.php?player_id=" + player + "&club=" + club + "&player_attribute=" + playerAttribute, '_blank').focus();
    }
});

/*Player Comparison Table Form Script*/
$('body').off('click', '#btn-comparison-table');
$('body').on('click', '#btn-comparison-table', function (e) {
    e.preventDefault();

    const playerAgeEl = document.getElementById('player-age');
    const playerAttributeEl = document.getElementById('player-attribute');

    const playerAgeRequiredSpanEl = document.getElementById("player-age-required-span")
    const playerAttributeRequiredSpanEl = document.getElementById("player-attribute-required-span")

    var playerAge = playerAgeEl.value;
    playerAge = playerAge.trim()


    var playerAttribute = playerAttributeEl.value;
    playerAttribute = playerAttribute.trim()

    if (playerAge == "") {
        playerAgeEl.focus();
        playerAgeRequiredSpanEl.removeAttribute("hidden");
        return false;
    } else if (playerAttribute == "") {
        playerAttributeEl.focus();
        playerAttributeRequiredSpanEl.removeAttribute("hidden");
        return false;
    } else {
        window.open("table_comparison_result.php?age_year=" + playerAge + "&player_attribute=" + playerAttribute, '_blank').focus();
    }
});


