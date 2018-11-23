$(function(){
    var url = window.location.href;
    if(url.endsWith("StudentRegist.html")){
        console.log("StudentRegist");
     CwHelper1.Logout();
     //location.replace(location)
     //window.location.assign("StudentRegist.html");
        
    }if(url.endsWith("StudentLogin.html")){
        console.log("StudentLogin");
      CwHelper1.Logout();
     // window.location.assign("StudentLogin.html");  
     //location.replace("StudentLogin.html")
     }
    });