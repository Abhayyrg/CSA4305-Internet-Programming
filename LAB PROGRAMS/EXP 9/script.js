function login()
{
    var user=document.getElementById("user").value;

    var pass=document.getElementById("pass").value;

    if(user=="admin" && pass=="1234")
        alert("Login Successful");
    else
        alert("Invalid Login");
}

function bookRoom()
{
    alert("Room Booked Successfully!");
}