document.write(`
<div class="navbar">

    <a href="index.html">首页</a>

    <a href="sell.html">我要卖书</a>

    <a href="mybook.html">我的书籍</a>

    <a href="favorite.html">我的收藏</a>

    <a href="login.html">登录</a>

    <a href="#" onclick="logout()">退出</a>

    <span class="username">
        当前用户：
        ${localStorage.getItem("username") || "未登录"}
    </span>

</div>
`);

function logout(){

    localStorage.clear();

    alert("退出成功");

    location.href="login.html";
}