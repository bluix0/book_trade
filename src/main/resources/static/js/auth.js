const userId =
    localStorage.getItem("userId");

if(!userId){

    alert("请先登录");

    location.href="login.html";
}