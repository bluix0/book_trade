let isSubmitting = false;

document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    if (isSubmitting) return;
    isSubmitting = true;
    
    const registerBtn = document.getElementById("registerBtn");
    const originalText = registerBtn.innerText;
    registerBtn.innerText = "注册中...";
    registerBtn.disabled = true;
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    
    if (!username || !password) {
        alert("请填写用户名和密码");
        registerBtn.innerText = originalText;
        registerBtn.disabled = false;
        isSubmitting = false;
        return;
    }
    
    if (password.length < 6) {
        alert("密码长度不能少于6位");
        registerBtn.innerText = originalText;
        registerBtn.disabled = false;
        isSubmitting = false;
        return;
    }
    
    try {
        const res = await fetch("/user/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        });
        
        const data = await res.json();
        if (data.code === 200) {
            alert("注册成功，跳转登录");
            window.location.href = "login.html";
        } else {
            alert(data.msg || "注册失败");
            registerBtn.innerText = originalText;
            registerBtn.disabled = false;
            isSubmitting = false;
        }
    } catch (err) {
        console.error(err);
        alert("网络错误，请稍后重试");
        registerBtn.innerText = originalText;
        registerBtn.disabled = false;
        isSubmitting = false;
    }
});