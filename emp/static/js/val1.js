/**
 * Created by Heta on 13-08-2014.
 */
function valueChek()
{
    //alert("Hello")
    var ename=document.getElementById('id_ena');
    var age=document.getElementById('id_age');
    var mob=document.getElementById('id_mob');
     var email=document.getElementById('id_email');
    var designation=document.getElementById('id_designation');
     var department=document.getElementById('id_department');
   // alert("Hello1");
    //alert(mob);
    var letters = /^[A-Za-z- ]+$/;


    if(!(ename.value.match(letters)))
    {
      alert('Please input alphabet characters only in name field');
     // document.getElementById('id_ena1').display="block";
      //document.getElementById('id_ena1').value="Please input alphabet characters only";
      ename.value="";
        ename.focus();
      return false;

    }

    else if(isNaN(age.value))
    {
        alert("Please enter digits only!! Characters are not allowed in age field");
        age.value="";
        age.focus();
        return false;
    }
    else if(isNaN(mob.value))
    {
        alert("Please enter digits only in mobile number field");
        mob.value="";
        mob.focus();
        return false;
    }
    else if(!(mob.value.length == 10))
    {
        alert("Please enter only 10 digits of your mobile no");
        mob.value="";
        mob.focus();
        return false;
    }
    else if(!(designation.value.match(letters)))
    {
      alert('Please input alphabet characters only in designation');
      designation.value="";
       designation.focus();
      return false;

    }
    return true;
}