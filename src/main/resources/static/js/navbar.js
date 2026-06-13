// 获取登录状态
const userId = localStorage.getItem("userId");
const username = localStorage.getItem("username");

// 动态生成右侧区域
let navRightHtml = '';
if (userId) {
    // 已登录：显示用户名 + 退出按钮
    navRightHtml = `
        <span class="user-info">👤 ${escapeHtml(username || "用户")}</span>
        <a href="javascript:void(0);" class="logout-btn" onclick="logout()">退出</a>
    `;
} else {
    // 未登录：显示登录和注册链接
    navRightHtml = `
        <a href="login.html" class="login-link">登录</a>
        <a href="register.html" class="register-link">注册</a>
    `;
}

document.write(`
<div class="navbar">
    <div class="nav-left">
        <div class="logo">
            📚 二手书交易平台
        </div>
        <div class="nav-links">
            <a href="index.html">首页</a>
            <a href="sell.html">我要卖书</a>
            <a href="mybook.html">我的书籍</a>
            <a href="favorite.html">我的收藏</a>
        </div>
    </div>
    <div class="nav-right">
        ${navRightHtml}
    </div>
</div>
`);

// 全局退出函数
window.logout = function() {
    if (confirm("确定要退出登录吗？")) {
        // 清除所有本地存储数据
        localStorage.clear();
        // 提示退出成功
        alert("已退出登录");
        // 跳转到登录页
        window.location.href = "login.html";
    }
};