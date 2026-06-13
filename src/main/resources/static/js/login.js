let isSubmitting = false;

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    if (isSubmitting) return;
    isSubmitting = true;
    
    const loginBtn = document.getElementById("loginBtn");
    const originalText = loginBtn.innerText;
    loginBtn.innerText = "登录中...";
    loginBtn.disabled = true;
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    
    if (!username || !password) {
        alert("请填写用户名和密码");
        loginBtn.innerText = originalText;
        loginBtn.disabled = false;
        isSubmitting = false;
        return;
    }
    
    try {
        const res = await fetch("/user/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        });
        
        const data = await res.json();
        if (data.code === 200) {
            alert("登录成功");
            localStorage.setItem("userId", data.data.id);
            localStorage.setItem("username", data.data.username);
            window.location.href = "index.html";
        } else {
            alert(data.msg || "登录失败");
            loginBtn.innerText = originalText;
            loginBtn.disabled = false;
            isSubmitting = false;
        }
    } catch (err) {
        console.error(err);
        alert("网络错误，请稍后重试");
        loginBtn.innerText = originalText;
        loginBtn.disabled = false;
        isSubmitting = false;
    }
});