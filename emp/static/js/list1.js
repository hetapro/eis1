/**
 * Created by Heta on 27-08-2014.
 */
$(document).ready(function(){
$(window).load(function(event){
    event.preventDefault();
    url="/emp/department/"
         $.ajax({
                     url: url,
                     type: "GET",
                     dataType: "json",
                     success: function (data) {

                         var counter=0; var c1;

                         if(data.length==0) {
                             $("#department_list").append( "<tr>"+ "<td class='alert-info' colspan='5'>"+ "<b>No Data Found</b>" +"</td>"+"</tr>");

                         }
                         else
                         {

                         $.each(data,function(key,value){
                               c1=++counter;
                             //var obj = $.parseJSON( value );
                             $("#department_list").append( "<tr>"+ "<td>"+ c1 +"</td>"+
                                 "<td id="+value.department_id+">"+ value.department_name +"</td>"+
                                 "<td>"+ "<a class=\"view\" id="+value.department_id+" name="+value.department_name+" href=\"#\">View Details</a>" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"edit btn\" id="+value.department_id+" name="+value.department_name+" value=\"Edit\">" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"delete btn\" id="+value.department_id+" name="+value.department_name+" value=\"Delete\">" +"</td>"+
                                 "</tr>");
                         });
                         }


                     },
                     error: function(xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }

            });



     });
    $('#department_list').on("click",'.view' ,function(event){
        event.preventDefault();

      var pk=$(this).attr("id");

       $.ajax({
            type:"GET",
            success: function(){

                window.location.href="/emp/viewdetail/"+pk+"/"
            },
            error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }
        });
    });
    $("#department_list").on("click",".edit",function (event) {
        event.preventDefault();
        var pk=$(this).attr("id");
        var name=$(this).attr("name");
        $.ajax({
            type:"GET",

            success: function(){
                    var department=prompt("Please Enter Department name",name);

        if (department.length == 0) {
                alert("Empty department field is not allowed!! Please try again")

        }
        else {
            $.ajax({
                url: url,
                type: "GET",
                success: function (data) {
                    var flag = false;

                    $.each(data, function (key, value) {
                        if (department == value.department_name) {

                            flag = true;
                        }
                    });

                    if (flag == true) {
                        $("#error").html("*This department already exists. Please try again.");
                        $("#error").css("color", "red");

                    }
                    else {
                        $.ajax({
                            url: "/emp/department/" + pk + "/",
                            type: "PUT",
                            data: { "department_name": "" + department + "" },
                            dataType: "json",
                            success: function () {
                                $("#" + pk + "").text(department);
                                $("input[id=" + pk + "]").attr("name", "" + department + "")
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
        } },
         error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }
        });
        });
    $("#department_list").on("click",".delete",function (event) {

        event.preventDefault();
        var pk=$(this).attr("id");
        var name=$(this).attr("name");

        var delValue=confirm("Do you really want to delete  "+ name + " department?");
        if(delValue==true) {
            url = "/emp/department/"+pk+"/";

            $.ajax({
                url: url,
                type: "DELETE",
                //data: { "department_name": "" + department + "" },
                dataType: "json",
                success: function () {
                    //$(this).closest("tr").remove();
                    //alert("hi")
                    window.location.href = "/emp/list1/"
                },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            });
        }
        });
    $("#new").click(function (event) {
        event.preventDefault();
        $.ajax({
            type:"GET",
            success: function(){

                window.location.href="/emp/new1/"
            },
            error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }
        });
        });
    $("#back").click(function (event) {
        event.preventDefault();
        $.ajax({
            type:"GET",
            success: function(){

                window.location.href="/emp/"
            },
            error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }
        });
        });
});


