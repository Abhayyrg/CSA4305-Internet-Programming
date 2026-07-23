function login()
{
    var user=document.getElementById("user").value;
    var pass=document.getElementById("pass").value;

    if(user=="admin" && pass=="1234")
    {
        alert("Login Successful");
    }
    else
    {
        alert("Invalid Username or Password");
    }
}

function searchBook()
{
    var book=document.getElementById("book").value.toLowerCase();

    if(book=="java")
    {
        document.getElementById("result").innerHTML="Java Book is Available";
    }

    else if(book=="html")
    {
        document.getElementById("result").innerHTML="HTML Book is Available";
    }

    else if(book=="python")
    {
        document.getElementById("result").innerHTML="Python Book is Issued";
    }

    else
    {
        document.getElementById("result").innerHTML="Book Not Found";
    }
}