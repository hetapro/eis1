/**
 * Created by Heta on 26-08-2014.
 */
$(document).ready(function () {
        $("#add").click(function (event) {
            event.preventDefault();
            if ($(".department").val().length == 0) {
                $("#error").html("*Empty department field is not allowed.");
                $("#error").css("color", "red");
                // event.preventDefault();
                return false;
            }
            else {
                url = "/emp/department/";

                var department = $("#id_department").val();

                $.ajax({
                    url: url,
                    type: "GET",
                    //data: { "department_name": "" + department + "" },
                    //dataType: "json",
                    success: function (data) {
                        var flag = false;

                        $.each(data, function (key, value) {
                            if (department == value.department_name) {

                                flag = true;
                            }
                        });

                        if (flag==true) {
                            $("#error").html("*This department already exists. Please try again.");
                            $("#error").css("color", "red");

                        }
                        else {
                            $.ajax({
                                url: url,
                                type: "POST",
                                data: { "department_name": "" + department + "" },
                                dataType: "json",
                                success: function () {
                                    window.location.href = "/emp/list1/"
                                },
                                error: function (xhr, status, errorThrown) {
                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                }
                            });
                        }
                    },
                    error: function (xhr, status, errorThrown) {
                        console.log("Sorry, there was a problem!");
                        console.log("Error: " + errorThrown);
                        console.log("Status: " + status);
                    }

                });


            }
        });
        $("#back").click(function (event) {
            event.preventDefault();
            $.ajax({
                type: "GET",
                success: function () {

                    window.location.href = "/emp/list1/"
                },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }
            });
        });
    });


