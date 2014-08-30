/**
 * Created by Heta on 29-08-2014.
 */
$(document).ready(function() {
    $(window).load(function (event) {
        var dept_name;
        event.preventDefault();
        url = "/emp/employee/"
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",

            success: function (data) {

                if (data.length == 0) {
                    $("#emp_list1").append("<tr id=\"nodata2\">" + "<td class='alert-info' colspan='10'><center>" + "<b>No Data Found</b>" + "</center></td>" + "</tr>");
                }
                else {

                 $.each(data, function (key, value) {

                                $.ajax({
                                url:"/emp/department/" + value.department + "/",
                                type: "GET",

                                dataType: "json",
                                success: function(data){
                                            dept_name=data.department_name;

                                    $("#emp_list1").append("<tr id=" + value.employee_id + ">" +
                                    "<td>" + value.ename + "</td>" +
                                    "<td>" + value.age + "</td>" +
                                    "<td>" + value.emailid+ "</td>" +
                                    "<td>" + value.mobno + "</td>" +
                                    "<td>" + value.designation + "</td>" +
                                    "<td>" + dept_name + "</td>" +
                                    "<td>" + "<a class=\"view\" id=" + value.employee_id + " name=" + value.ename + " href=\"javascript:void(0)\">View Details</a>" + "</td>" +
                                    "<td>" + "<input type=\"button\" class=\"edit btn\" id=" + value.employee_id + " name=" + value.ename + " value=\"Edit\">" + "</td>" +
                                    "<td>" + "<input type=\"button\" class=\"delete btn\" id=" + value.employee_id + " name=" + value.ename + " value=\"Delete\">" + "</td>" +
                                    "</tr>");


                                },
                                error:function (xhr, status, errorThrown) {
                                      console.log("Sorry, there was a problem!"); }
                                });

                 });
                }


            },
            error: function (xhr, status, errorThrown) {
                console.log("Sorry, there was a problem!");
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
            }

        });


    });
    $("#employeelist").on("click",".delete",function (event) {

        event.preventDefault();
        var pk=$(this).attr("id");

        var name=$(this).attr("name");

        var delValue=confirm("Do you really want to delete "+ name + " named employee?");
        if(delValue==true) {
            url = "/emp/employee/"+pk+"/";

            $.ajax({
                url: url,
                type: "DELETE",
                dataType: "json",
                success: function () {
                    $("#employeelist tr#"+pk).remove();
                    $.ajax({
                     url: "/emp/employee/",
                     type: "GET",
                     dataType: "json",
                     success: function (data) {
                         if(data.length==0) {
                             $("#emp_list1").append( "<tr id=\"nodata2\">"+ "<td class='alert-info' colspan='5'><center>"+ "<b>No Data Found</b>" +"</center></td>"+"</tr>");

                         } },
                     error: function (xhr, status, errorThrown) {  console.log("Error: " + errorThrown); }  });
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

                window.location.href="/emp/"
            },
            error: function (xhr, status, errorThrown) {
                       console.log("Sorry, there was a problem!");
                       console.log("Error: " + errorThrown);
                       console.log("Status: " + status);
                     }
        });
        });
    $("#employeelist").on("click",".edit",function (event) {
        event.preventDefault();
        var pk = $(this).attr("id");

        url = "/emp/employee/"+pk+"/";

            $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $("#employeelist").hide();
                    $("#editemployee").show();
                    $("#ename1").val(data.ename);
                    $("#age1").val(data.age);
                    $("#email1").val(data.emailid);
                    $("#mob1").val(data.mobno);
                    $("#designation1").val(data.designation);
                    var dept=data.department;
                    $.ajax({
                             url: "/emp/department/",
                              type: "GET",
                             dataType: "json",
                            success: function (data) {
                                $.each(data,function(key,value){
                                    if(value.department_id==dept) {
                                        var newOption = $('<option value="'+value.department_name+' id="'+value.department_id+' selected">'+value.department_name+'</option>');
                                        $('#dropdepartment').append(newOption);

                                    }
                                    else{
                                     var newOption = $('<option value="'+value.department_name+' id="'+value.department_id+' selected">'+value.department_name+'</option>');
                                        $('#dropdepartment').append(newOption);
                                    }
                                });
                    },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            });
                },
                error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }

            });
        $("#listdepartment").hide();
        $("#updatedepartment").show();
        $("#id_department1").val(name);
        $(".update").attr("id", "" + pk + "");
    });
    $("#back1").click(function (event) {
            event.preventDefault();
            $('#editemployee').hide();
            $('#employeelist').show();
    });
    $("#back2").click(function (event) {
            event.preventDefault();
            $('#viewemployee').hide();
            $('#employeelist').show();

        });
    $('#employeelist').on("click",'.view' ,function(event){
        event.preventDefault();
        var pk=$(this).attr("id");
         url = "/emp/employee/"+pk+"/";
        var dept_name;
         $.ajax({
                url: url,
                type: "GET",
                dataType: "json",
                success: function (data) {

                    $.ajax({
                                url:"/emp/department/" + data.department + "/",
                                type: "GET",
                                dataType: "json",
                                success: function(data1){
                                            $("#employeelist").hide();
                                            $("#viewemployee").show();
                                            $("#viewemp").html("Details of "+data.ename+" employee");
                                            $("#ename2").text(data.ename);
                                            $("#age2").text(data.age);
                                            $("#email2").text(data.emailid);
                                            $("#mob2").text(data.mobno);
                                            $("#designation2").text(data.designation);
                                            $("#department2").text(data1.department_name);
                                } });



                },
                 error: function (xhr, status, errorThrown) {
                    console.log("Sorry, there was a problem!");
                    console.log("Error: " + errorThrown);
                    console.log("Status: " + status);
                }
         });
    });
    $("#newemployee").click(function (event) {
            event.preventDefault();
            $('#employeelist').hide();
            $.ajax({
                             url: "/emp/department/",
                              type: "GET",
                             dataType: "json",
                            success: function (data) {
                                if(data.length==0){ $("#newerror").show();}
                                else{
                                    $("#newemp").show(); $("#new1").html("");$("#new2").html("");$("#new3").html("");$("#new4").html("");
                                    $("#new5").html(""); $("#ename_new").val(""); $("#age_new").val(""); $("#email_new").val("");
                                    $("#mob_new").val("");$("#designation_new").val("");
                                $.each(data, function (key, value) {

                                        var newOption = $('<option value="' + value.department_name + '" id=' + value.department_id + ' name="' + value.department_name + '">' + value.department_name + '</option>');
                                        $('#dropdepartment1').append(newOption);
                                }); }
                            },
                            error: function (xhr, status, errorThrown) {
                                        console.log("Sorry, there was a problem!");
                                        console.log("Error: " + errorThrown);
                                        console.log("Status: " + status);
                                }
             });
     });
    $("#back3").click(function (event) {
            event.preventDefault();
            $('#newemp').hide();
            $('#employeelist').show();

        });
    $("#add").click(function (event) {
        alert("Hello")
            event.preventDefault();
            var name=document.getElementById("ename_new");
            var age=document.getElementById("age_new");
            var email=document.getElementById("email_new");
            var mob=document.getElementById("mob_new");
            var designation=document.getElementById("designation_new");
            var id=$("#dropdepartment1").find('option:selected').attr("id");
            var department=$("#dropdepartment1").find('option:selected').attr("name");
             var flag1,flag2,flag3,flag4,flag5; var letters = /^[A-Za-z- ]+$/;
            if(name.value.length==0)
            {
                $("#new1").html("*Empty Name field is not allowed"); $("#new1").css("color","red"); flag1=false;
            }
            else if(!(name.value.match(letters)))
            {
                $("#new1").html("*Please input alphabet characters only."); $("#new1").css("color","red"); flag1=false;
            } else { $("new1").html(""); flag1=true;}
            if(age.value.length==0)
            {
                $("#new2").html("*Empty Age field is not allowed"); $("#new2").css("color","red"); flag2=false;
            }
            else if(isNaN(age.value))
            {
                $("#new2").html("*Please input digits only."); $("#new2").css("color","red"); flag2=false;
            } else { $("new2").html(""); flag2=true;}
              if(mob.value.length==0)
            {
                $("#new4").html("*Empty mobile no field is not allowed"); $("#new4").css("color","red"); flag3=false;
            }   else { $("new4").html(""); flag3=true;}
             if(designation.value.length==0)
            {
                $("#new5").html("*Empty designation field is not allowed"); $("#new5").css("color","red"); flag4=false;
            }
            else if(!(designation.value.match(letters)))
            {
                $("#new5").html("*Please input alphabet characters only."); $("#new5").css("color","red"); flag4=false;
            } else { $("new5").html(""); flag4=true;}
            var letters1=/^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/;
             if(email.value.length==0)
            {
                $("#new3").html("*Empty email id field is not allowed"); $("#new3").css("color","red"); flag5=false;
            }
            else if(!(email.value.match(letters1)))
            {
                $("#new3").html("*Please input correct email id."); $("#new3").css("color","red"); flag5=false;
            }

            else { $("new3").html(""); flag5=true; }
            if(flag1 && flag2 && flag3 && flag4 && flag5)
            {
               $.ajax({
                                url: "/emp/employee/",
                                type: "POST",
                                data: { "ename": "" + name + "","age":  age ,"emailid": "" + email + "","mobno": mob,"designation": "" + designation + "" ,"department": id },
                                dataType: "json",
                                success: function (data) {
                                    alert("Hello1");
                                    $('#newemp').hide();
                                    $('#employeelist').show();
                                    $('table tr#nodata2').hide();
                                    $("#employeelist #emp_list1").append( "<tr  id="+data.employee_id+">"+
                                 "<td id=\"1\">"+ data.ename +"</td>"+
                                        "<td>"+data.age+"</td>"+  "<td>"+data.emailid+"</td>"+  "<td>"+data.mobno+"</td>"+  "<td>"+data.designation+"</td>"+  "<td>"+department+"</td>"+
                                 "<td>"+ "<a class=\"view\" id="+data.employee_id+" name="+data.employee_name+" href=\"#\">View Details</a>" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"edit btn\" id="+data.employee_id+" name="+data.employee_name+" value=\"Edit\">" +"</td>"+
                                 "<td>"+ "<input type=\"button\" class=\"delete btn\" id="+data.employee_id+" name="+data.employee_name+" value=\"Delete\">" +"</td>"+
                                 "</tr>");

                                },
                                error: function (xhr, status, errorThrown) {

                                    console.log("Sorry, there was a problem!");
                                    console.log("Error: " + errorThrown);
                                    console.log("Status: " + status);
                                }
                         });
            }
        });
});