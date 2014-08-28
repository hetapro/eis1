/**
 * Created by Heta on 27-08-2014.
 */
/**
 * Created by Heta on 26-08-2014.
 */
$(document).ready(function(){
$(".update").click(function (event) {
        event.preventDefault();
        if ($(".department").val().length == 0) {
            $("#error").html("*Empty department field is not allowed.");
            $("#error").css("color","red");
            // event.preventDefault();
            return false;
        }
        else
        {
            var pk=$(this).attr("id");
            url="/emp/department/"+pk+"/";
            var department=$("#id_department").val();

            $.ajax({
                     url: url,
                     type: "PUT",
                     data: { "department_name": ""+department+"" },
                     dataType: "json",
                     success: function () {
                           window.location.href="/emp/list1/"
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
            type:"GET",
            success: function(){

                window.location.href="/emp/list1/"
            },
            error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }
        });
        });
});


