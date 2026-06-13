// 检查登录状态，未登录则跳转
(function() {
    const userId = localStorage.getItem("userId");
    const currentPage = window.location.pathname.split('/').pop();
    
    // 登录和注册页面不需要验证
    if (currentPage === 'login.html' || currentPage === 'register.html') {
        return;
    }
    
    if (!userId) {
        alert("请先登录");
        location.href = "login.html";
    }
})();