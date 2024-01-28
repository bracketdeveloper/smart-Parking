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
        const blackListReasonEl = document.getElementById('black-list-reason');

        var blackListCar = blackListCarEl.value;
        blackListCar = blackListCar.trim();

        var blackListReason = blackListReasonEl.value;
        blackListReason = blackListReason.trim();

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
        formData.append('black_list_reason', blackListReason);
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

function deleteEmergencyAlert(id){
Swal.fire({
    title: "Delete Emergency Alert",
    text: "Do you want to delete this emergency alert?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#30d630",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
        if (result.isConfirmed) {
                   var formData = new FormData();
                   formData.append("alert_id", id);
                  $.ajax({
                      url: "admin/ajax_process.php?action=delete_emergency_alert",
                      type: 'POST',
                      contentType: false,
                      processData: false,
                      data: formData,
                  }).done(function (data) {
                  
                      /* successful code is 1*/
                      if (data == "1") {
                          Swal.fire({
                              icon: 'success',
                              title: 'Success',
                              text: 'Emergency alert is removed',
                          }).then((result) => {
                              location.reload(true)
                          })
                      }
                      /* failed code is 2*/
                      if (data == "2") {
                          Swal.fire({
                              icon: 'error',
                              title: 'Error',
                              text: 'Error occur while deleting emergency alert',
                          })
                      }
                  });
        }
      });
}

function deleteStaff(id){
Swal.fire({
    title: "Delete Staff Member",
    text: "Do you want to delete this staff member?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#30d630",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
        if (result.isConfirmed) {
                   var formData = new FormData();
                   formData.append("staff_id", id);
                  $.ajax({
                      url: "admin/ajax_process.php?action=delete_staff_member",
                      type: 'POST',
                      contentType: false,
                      processData: false,
                      data: formData,
                  }).done(function (data) {

                      /* successful code is 1*/
                      if (data == "1") {
                          Swal.fire({
                              icon: 'success',
                              title: 'Success',
                              text: 'Staff member is removed',
                          }).then((result) => {
                              location.reload(true)
                          })
                      }
                      /* failed code is 2*/
                      if (data == "2") {
                          Swal.fire({
                              icon: 'error',
                              title: 'Error',
                              text: 'Error occur while deleting staff member',
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

function showReportBetweenDateSection(){
 document.getElementById('section-specific-date').classList.add('hidden-section');
 document.getElementById('section-specific-car').classList.add('hidden-section');
 document.getElementById('section-date-range').classList.remove('hidden-section');
}

function showReportSpecificDateSection(){
 document.getElementById('section-date-range').classList.add('hidden-section');
 document.getElementById('section-specific-car').classList.add('hidden-section');
document.getElementById('section-specific-date').classList.remove('hidden-section');
}

function showReportSpecificCarSection(){
document.getElementById('section-specific-date').classList.add('hidden-section');
 document.getElementById('section-date-range').classList.add('hidden-section');
 document.getElementById('section-specific-car').classList.remove('hidden-section');
}

function generateReportDateRange(){
$('body').off('click', '#btn-generate-range-date-report');
    $('body').on('click', '#btn-generate-range-date-report', function (e) {
        e.preventDefault();
        var startDate = new Date(document.getElementById('startDate').value);
            var endDate = new Date(document.getElementById('endDate').value);

        if (startDate > endDate) {
              Swal.fire({
                                  icon: 'warning',
                                  title: 'Warning',
                                  text: 'Start date cannot be after end date.',
                              })
                              return false;

            }
        var startDate = document.getElementById('startDate').value;
        var endDate = document.getElementById('endDate').value;
        if(startDate == ""){
            Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'Select the start date',
                }).then((result) => {
                    return false;
                })
         }
         if(endDate == ""){
                     Swal.fire({
                             icon: 'warning',
                             title: 'Warning',
                             text: 'Select the end date',
                         }).then((result) => {
                             return false
                         })
                  }
        var formData = new FormData();
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        $.ajax({
                    url: "admin/ajax_process.php?action=generate_date_range_report",
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    data: formData,
                }).done(function (data) {
                    /* login successful code is 1*/
                    if (data == "1") {
                        Swal.fire({
                            icon: 'info',
                            title: 'Info',
                            text: 'Nothing to report for this time period',
                        }).then((result) => {
                            return false
                        })
                    }else{
                    var newTab = window.open();
                    var tableHead = '<table> <thead> <tr> <th>Sr</th> <th>Car Reg</th> <th>Fare (PKR)</th> <th>Date and Time</th> </tr> </thead> <tbody>';

                    // Access the opened tab and set its content
                    newTab.document.open();

                    newTab.document.write('<!DOCTYPE html> <html> <head> <title>Report</title></head> <style> table { width: 100%; border-collapse: collapse; margin-top: 20px; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; } </style> </head>');
                    newTab.document.write('<h1>Report between '+startDate +' and '+endDate+'</h1>');
                    newTab.document.write(tableHead);
                    // Display the data in the new tab
                    for(let i=0; i<data.length; i++){
                        newTab.document.write('<tr><td>'+(i+1)+'</td><td>'+data[i].car_reg+'</td><td>'+data[i].parking_fare+'</td><td>'+data[i].time+'</td></tr>');
                    }
                    var tableBottom = '</tbody></table>';
                    newTab.document.write(tableBottom);

                    newTab.document.write('</body></html>');
                    newTab.document.close();
                    }

                });
    });
}

function generateReportSpecificDate(){
$('body').off('click', '#btn-generate-specific-date-report');
    $('body').on('click', '#btn-generate-specific-date-report', function (e) {
        e.preventDefault();
        var reportDate = document.getElementById('report-date').value;


        if(reportDate == ""){
            Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'Select the date',
                }).then((result) => {
                    return false;
                })
                return false
         }
        var formData = new FormData();
        formData.append("report_date", reportDate);
        $.ajax({
                url: "admin/ajax_process.php?action=generate_specific_date_report",
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                }).done(function (data) {
                    /* login successful code is 1*/
                    if (data == "1") {
                        Swal.fire({
                            icon: 'info',
                            title: 'Info',
                            text: 'Nothing to report for this date',
                        }).then((result) => {
                            return false
                        })
                    }else{
                    var newTab = window.open();
                    var tableHead = '<table> <thead> <tr> <th>Sr</th> <th>Car Reg</th> <th>Fare (PKR)</th> <th>Date and Time</th> </tr> </thead> <tbody>';

                    // Access the opened tab and set its content
                    newTab.document.open();

                    newTab.document.write('<!DOCTYPE html> <html> <head> <title>Report</title></head> <style> table { width: 100%; border-collapse: collapse; margin-top: 20px; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; } </style> </head>');
                    newTab.document.write('<h1>Report of '+reportDate+'</h1>');
                    newTab.document.write(tableHead);
                    // Display the data in the new tab
                    for(let i=0; i<data.length; i++){
                        newTab.document.write('<tr><td>'+(i+1)+'</td><td>'+data[i].car_reg+'</td><td>'+data[i].parking_fare+'</td><td>'+data[i].time+'</td></tr>');
                    }
                    var tableBottom = '</tbody></table>';
                    newTab.document.write(tableBottom);

                    newTab.document.write('</body></html>');
                    newTab.document.close();
                    }

                });
    });
}

function generateReportSpecificCar(){
$('body').off('click', '#btn-generate-specific-car-report');
    $('body').on('click', '#btn-generate-specific-car-report', function (e) {
        e.preventDefault();
        var carReg = document.getElementById('car-reg').value;


        if(carReg == ""){
            Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'Enter car reg',
                }).then((result) => {
                    return false;
                })
                return false
         }
        var formData = new FormData();
        formData.append("car_reg", carReg);
        $.ajax({
                url: "admin/ajax_process.php?action=generate_specific_car_report",
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                }).done(function (data) {

                    /* login successful code is 1*/
                    if (data == "1") {
                        Swal.fire({
                            icon: 'info',
                            title: 'Info',
                            text: 'Nothing to report for this car reg',
                        }).then((result) => {
                            return false
                        })
                    }else{
                    var newTab = window.open();
                    var tableHead = '<table> <thead> <tr> <th>Sr</th> <th>Car Reg</th> <th>Fare (PKR)</th> <th>Date and Time</th> </tr> </thead> <tbody>';

                    // Access the opened tab and set its content
                    newTab.document.open();

                    newTab.document.write('<!DOCTYPE html> <html> <head> <title>Report</title></head> <style> table { width: 100%; border-collapse: collapse; margin-top: 20px; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; } </style> </head>');
                    newTab.document.write('<h1>Report of '+carReg+'</h1>');
                    newTab.document.write(tableHead);
                    // Display the data in the new tab
                    for(let i=0; i<data.length; i++){
                        newTab.document.write('<tr><td>'+(i+1)+'</td><td>'+data[i].car_reg+'</td><td>'+data[i].parking_fare+'</td><td>'+data[i].time+'</td></tr>');
                    }
                    var tableBottom = '</tbody></table>';
                    newTab.document.write(tableBottom);

                    newTab.document.write('</body></html>');
                    newTab.document.close();
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

function validateDates() {
    var startDate = new Date(document.getElementById('startDate').value);
    var endDate = new Date(document.getElementById('endDate').value);

    if (startDate > endDate) {
      Swal.fire({
                          icon: 'warning',
                          title: 'Warning',
                          text: 'Start date cannot be after end date.',
                      })
                      return false;

    }
  }


