document.getElementById("loginForm").addEventListener("submit", async function(e){
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/user/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });

    const data = await res.json();
    if(data.code === 200){
        alert("登录成功");
        localStorage.setItem("userId", data.data.id);
        localStorage.setItem("username", data.data.username);
        window.location.href = "index.html";
    } else {
        alert(data.msg);
    }
});