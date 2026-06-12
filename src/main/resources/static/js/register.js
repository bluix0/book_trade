document.getElementById("registerForm").addEventListener("submit", async function(e){
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/user/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });

    const data = await res.json();
    if(data.code === 200){
        alert("注册成功，跳转登录");
        window.location.href = "login.html";
    } else {
        alert(data.msg);
    }
});